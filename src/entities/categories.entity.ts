import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { User } from './entities';

@Index('Categories_pkey', ['categoryId'], { unique: true })
@Entity('categories', { schema: 'public' })
export class Categories {
  @Column('uuid', {
    primary: true,
    name: 'categoryID',
    default: () => 'gen_random_uuid()',
  })
  categoryId: string;

  @Column('character varying', { name: 'name', nullable: true, length: 100 })
  name: string | null;

  @Column('character varying', { name: 'icon', nullable: true, length: 200 })
  icon: string | null;

  @ManyToOne(() => User, (user) => user.categories)
  @JoinColumn([{ name: 'userId', referencedColumnName: 'userId' }])
  user: User;
}
