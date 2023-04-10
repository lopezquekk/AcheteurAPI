import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Countries } from './Countries';

@Index('Cities_pkey', ['cityId'], { unique: true })
@Entity('cities', { schema: 'public' })
export class Cities {
  @Column('uuid', { primary: true, name: 'city_id' })
  cityId: string;

  @Column('text', { name: 'name', nullable: true })
  name: string | null;

  @ManyToOne(() => Countries, (countries) => countries.cities)
  @JoinColumn([{ name: 'country_id', referencedColumnName: 'countryId' }])
  country: Countries;
}
