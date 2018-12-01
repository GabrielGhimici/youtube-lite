import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MaxLength, Property } from '@tsed/common';
import { Video } from './video.model';
import { Comment } from './comment.model';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @Property()
  id: number;

  @Column({unique: true})
  @MaxLength(50)
  email: string;

  @Column({
    select: false
  })
  @MaxLength(50)
  password: string;

  @Column({
    select: false
  })
  @MaxLength(10)
  salt: string;

  @Column({name: 'first_name'})
  @MaxLength(50)
  firstName: string;

  @Column({name: 'last_name'})
  @MaxLength(50)
  lastName: string;

  @Column({name: 'birth_date'})
  @Property()
  birthDate: Date;

  @Column()
  @MaxLength(50)
  gender: string;

  @Column()
  @Property()
  status: number;

  @OneToMany(type => Video, video => video.owner)
  @Property()
  videos: Array<Video>;

  @OneToMany(type => Comment, comment => comment.owner)
  @Property()
  comments: Array<Comment>;
}
