import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('cards')
export class CardEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  manaCost: string;

  @Column()
  cmc: number;

  @Column('simple-array')
  colors: string[];

  @Column('simple-array')
  colorIdentity: string[];

  @Column()
  type: string;

  @Column('simple-array')
  supertypes: string[];

  @Column('simple-array')
  types: string[];

  @Column('simple-array')
  subtypes: string[];

  @Column()
  rarity: string;

  @Column()
  set: string;

  @Column()
  setName: string;

  @Column()
  text: string;

  @Column()
  flavor: string;

  @Column()
  artist: string;

  @Column()
  number: string;

  @Column()
  power: string;

  @Column()
  toughness: string;

  @Column()
  layout: string;

  @Column()
  multiverseid: string;

  @Column()
  imageUrl: string;

  @Column('simple-array')
  foreignNames: string[];

  @Column('simple-array')
  printings: string[];

  @Column()
  originalText: string;

  @Column()
  originalType: string;

  @Column('json')
  legalities: { format: string; legality: string }[];

  @Column({ nullable: true })
  commanderId?: string; 
}
