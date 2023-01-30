// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DataTypes } from 'sequelize';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AutoIncrement, Column, Table, Model, PrimaryKey, AllowNull, Unique } from 'sequelize-typescript';

export enum ThemeColor {
  Light = 'light',
  Dark = 'dark',
}

export interface ThemeAttributes {
  theme: string;
  userId: number;
}

@Table({
  tableName: 'theme',
  timestamps: false,
})
class Theme extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataTypes.INTEGER)
  override id!: number;

  @AllowNull(false)
  @Column(DataTypes.STRING)
  theme!: string;

  @Unique
  @AllowNull(false)
  @Column(DataTypes.INTEGER)
  userId!: number;
}

export { Theme };
