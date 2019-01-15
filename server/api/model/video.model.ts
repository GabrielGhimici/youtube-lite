import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MaxLength, Property } from '@tsed/common';
import { User } from './user.model';
import { Metadata } from './metadata.model';
import { Comment } from './comment.model';

@Entity()
export class Video {
  @PrimaryGeneratedColumn()
  @Property()
  id: number;

  @Column()
  @MaxLength(50)
  name: string;

  @Column()
  @MaxLength(500)
  url: string;

  @Column({name: 'thumbnail_url'})
  @MaxLength(500)
  thumbnailUrl: string;

  @Column({name: 'owner_id'})
  @Property()
  ownerId: number;

  @Column({name: 'metadata_id'})
  @Property()
  metadataId: number;

  @Column()
  @Property()
  status: number;

  @ManyToOne(type => User, owner => owner.videos)
  @JoinColumn({name: 'owner_id'})
  @Property()
  owner: User;

  @OneToOne(type => Metadata, metadata => metadata.video)
  @JoinColumn({name: 'metadata_id'})
  @Property()
  metadata: Metadata;

  @OneToMany(type => Comment, comment => comment.video)
  @Property()
  comments: Array<Comment>;
}
