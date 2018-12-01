import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MaxLength, Property } from '@tsed/common';
import { Video } from './video.model';
import { User } from './user.model';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  @Property()
  id: number;

  @Column({name: 'linked_video_id'})
  @Property()
  linkedVideoId: number;

  @Column({name: 'owner_id'})
  @Property()
  ownerId: number;

  @Column()
  @MaxLength(1000)
  content: string;

  @Column({name: 'created_date'})
  @Property()
  creationData: Date;

  @Column()
  @Property()
  status: number;

  @ManyToOne(type => Video, video => video.comments)
  @JoinColumn({name: 'linked_video_id'})
  @Property()
  video: Video;

  @ManyToOne(type => User, owner => owner.comments)
  @JoinColumn({name: 'owner_id'})
  @Property()
  owner: User;

}
