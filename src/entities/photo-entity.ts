import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('photosDB', {schema:'public'})
export class PhotoDB {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

}