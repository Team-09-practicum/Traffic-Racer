/* eslint-disable camelcase */
import type { Request, Response } from 'express';
import { TelegramNotificationService } from '../services/TelegramNotificationService';

export class WebhookController {
  static async handlePullRequest(req: Request, res: Response) {
    const { action, pull_request } = req.body;

    if (action === 'opened') {
      await TelegramNotificationService.sendMessage(pull_request.html_url, pull_request.requested_reviewers);
      res.sendStatus(200);
    } else {
      res.sendStatus(202);
    }
  }
}
