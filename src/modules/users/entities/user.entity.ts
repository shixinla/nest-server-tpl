import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum USER_STATUS {
  ACITVE,
  INACTIVE,
}

@Entity()
export class User {
  // 用户自增ID
  @PrimaryGeneratedColumn('uuid')
  user_id: string;
  /** 小程序用户openid */
  @Column({ length: 32, unique: true })
  open_id: string;
  @Column({ length: 32, unique: true })
  union_id: string;
  @CreateDateColumn()
  create_at: Date;
  @UpdateDateColumn()
  update_at: Date;
  @Column({
    type: 'simple-enum',
    enum: USER_STATUS,
    default: USER_STATUS.ACITVE,
  })
  status: number;
}
