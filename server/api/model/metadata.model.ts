import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MaxLength, Property } from '@tsed/common';
import { Video } from './video.model';

@Entity()
export class Metadata {
  @PrimaryGeneratedColumn()
  @Property()
  id: number;

  @Column()
  @MaxLength(500)
  description: string;

  @Column()
  @Property()
  likes: number;

  @Column()
  @Property()
  dislikes: number;

  @Column()
  @Property()
  shares: number;

  @Column()
  @Property()
  status: number;

  @Column({name: 'upload_date'})
  @Property()
  uploadDate: Date;

  @OneToOne(type => Video, video => video.metadata)
  @Property()
  video: Video;
}
