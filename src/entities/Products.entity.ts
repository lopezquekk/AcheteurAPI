import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './entities';

@Index('products_pkey', ['productId'], { unique: true })
@Entity('products', { schema: 'public' })
export class Products {
  @Column('uuid', {
    primary: true,
    name: 'productId',
    default: () => 'gen_random_uuid()',
  })
  productId: string;

  @Column('character varying', { name: 'name', length: 100 })
  name: string;

  @Column('character varying', {
    name: 'description',
    nullable: true,
    length: 200,
  })
  description: string | null;

  @Column('date', { name: 'purchase_date', nullable: true })
  purchaseDate: string | null;

  @Column('date', { name: 'due_date', nullable: true })
  dueDate: string | null;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.products)
  @JoinColumn([{ name: 'userId', referencedColumnName: 'userId' }])
  user: User;
}
