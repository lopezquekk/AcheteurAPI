import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
} from 'typeorm';
import { Country } from './entities';

@Index('Cities_pkey', ['cityId'], { unique: true })
@Entity('cities', { schema: 'public' })
export class Cities {
  @Column('uuid', { primary: true, name: 'city_id' })
  cityId: string;

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

  @ManyToOne(() => Country, (country) => country.cities)
  @JoinColumn([{ name: 'country_id', referencedColumnName: 'countryId' }])
  country: Country;
}
