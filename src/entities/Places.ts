import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Users } from './users.entity';

@Index('Places_pkey', ['placeId'], { unique: true })
@Entity('places', { schema: 'public' })
export class Places {
  @Column('uuid', {
    primary: true,
    name: 'placeId',
    default: () => 'gen_random_uuid()',
  })
  placeId: string;

  @Column('character varying', { name: 'name', nullable: true, length: 100 })
  name: string | null;

  @Column('character varying', {
    name: 'location',
    nullable: true,
    length: 100,
  })
  location: string | null;

  @Column('integer', { name: 'city_id', nullable: true })
  cityId: number | null;

  @ManyToOne(() => Users, (users) => users.places)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'userId' }])
  user: Users;
}
