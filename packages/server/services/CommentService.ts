/* eslint-disable class-methods-use-this */
/* eslint-disable max-len */
import { QueryTypes } from 'sequelize';
import Comment, { ICommentCreationAttributes } from '../models/Comment';
import { sequelize } from '../db';

export class CommentService {
  public create(data: ICommentCreationAttributes) {
    return Comment.create(data);
  }

  public async getByTopicId(topicId: number) {
    const q = `WITH RECURSIVE
    c_with_level AS (
      SELECT *, 0 as lvl, lpad(id::text, 4, '0') sort_key
      FROM comments p
      WHERE "parentId" is NULL
    
      UNION ALL
    
      SELECT child.*, parent.lvl + 1, concat(parent.sort_key, ':', lpad(child.id::text, 4, '0')) sort_key
      FROM comments child
      JOIN c_with_level parent ON child."parentId" = parent.id
    ),
    maxlvl AS (
      SELECT max(lvl) maxlvl FROM c_with_level
    ),
    c_tree AS (
        SELECT
            lvl, sort_key, id, "topicId", "parentId", body, "userId", "userName", "createdAt", jsonb '[]' comments
        FROM c_with_level, maxlvl
        WHERE lvl = maxlvl
    
        UNION
        (
            SELECT
                (branch_parent).lvl,
                (branch_parent).sort_key,
                (branch_parent).id,
                (branch_parent)."topicId",
                (branch_parent)."parentId",
                (branch_parent).body,
                (branch_parent)."userId",
                (branch_parent)."userName",
                (branch_parent)."createdAt",
                jsonb_agg(branch_child) as comments
            FROM (
                SELECT branch_parent, branch_child
                FROM c_with_level branch_parent
                JOIN c_tree branch_child ON branch_child."parentId" = branch_parent.id
            ) branch
            GROUP BY branch.branch_parent
    
            UNION
    
            SELECT
                c.lvl, c.sort_key, c.id, c."topicId", c."parentId", c.body, c."userId", c."userName", c."createdAt", jsonb '[]' comments
            FROM c_with_level c
            WHERE NOT EXISTS (SELECT 1 FROM c_with_level hypothetical_child WHERE hypothetical_child."parentId" = c.id)
            ORDER BY sort_key
        )
    )
    SELECT COALESCE(jsonb_agg(c_tree ORDER BY sort_key, "createdAt")::jsonb, '[]') comments
    FROM c_tree
    WHERE lvl = 0
    AND "topicId" = $topic_id;`;

    const [results] = await sequelize.query<Record<'comments', string>>(q, {
      bind: { topic_id: topicId },
      type: QueryTypes.SELECT,
    });
    return results.comments;
  }

  public find(topicId?: number) {
    if (topicId) {
      return Comment.findAll({
        where: {
          topicId,
        },
      });
    }

    return Comment.findAll();
  }
}

export const commentService = new CommentService();
