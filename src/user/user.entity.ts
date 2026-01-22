import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ unique: true })
  email: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt?: Date = new Date();
}
