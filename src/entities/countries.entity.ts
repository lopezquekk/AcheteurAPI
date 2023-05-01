import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import { Cities } from './cities.entity';
import { Users } from './users.entity';

@Index('Countries_pkey', ['countryId'], { unique: true })
@Entity('countries', { schema: 'public' })
export class Countries {
  @Column('uuid', {
    primary: true,
    name: 'country_id',
    default: () => 'gen_random_uuid()',
  })
  countryId: string;

  @Column('text', { name: 'name', nullable: true })
  name: string | null;

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

  @OneToMany(() => Cities, (cities) => cities.country)
  cities: Cities[];

  @OneToMany(() => Users, (users) => users.country)
  users: Users[];
}
