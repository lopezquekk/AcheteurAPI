import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Users } from './users.entity';

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

  @ManyToOne(() => Users, (users) => users.products)
  @JoinColumn([{ name: 'userId', referencedColumnName: 'userId' }])
  user: Users;
}
