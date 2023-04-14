import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Categories } from './categories.entity';
import { Places } from './places';
import { Products } from './products.entity';
import { Countries } from './countries.entity';
import { Exclude } from 'class-transformer';

@Index('Users_pkey', ['userId'], { unique: true })
@Entity('users', { schema: 'public' })
export class Users {
  @Column('uuid', {
    primary: true,
    name: 'userId',
    default: () => 'gen_random_uuid()',
  })
  userId: string;

  @Column('character varying', {
    name: 'first_name',
    nullable: true,
    length: 100,
  })
  firstName: string | null;

  @Column('character varying', {
    name: 'last_name',
    nullable: true,
    length: 100,
  })
  lastName: string | null;

  @Column('character varying', { name: 'email', nullable: true, length: 250 })
  email: string | null;

  @Exclude()
  @Column('character varying', { name: 'password', nullable: true, length: 60 })
  password: string | null;

  @Column('character varying', {
    name: 'username',
    nullable: true,
    length: 100,
  })
  username: string | null;

  @OneToMany(() => Categories, (categories) => categories.user)
  categories: Categories[];

  @OneToMany(() => Places, (places) => places.user)
  places: Places[];

  @OneToMany(() => Products, (products) => products.user)
  products: Products[];

  @ManyToOne(() => Countries, (countries) => countries.users)
  @JoinColumn([{ name: 'country_id', referencedColumnName: 'countryId' }])
  country: Countries;
}
