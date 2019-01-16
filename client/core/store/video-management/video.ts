import { User } from '../user-management/user/user';
import { Metadata } from './metadata';
import { Comment } from './comment'

export class Video {
  constructor(
    private _id: number = null,
    private _name: string = '',
    private _url: string = '',
    private _thumbnailUrl: string = '',
    private _ownerId: number = null,
    private _owner: User = new User(),
    private _metadataId: number = null,
    private _metadata: Metadata = new Metadata(),
    private _comments: Array<Comment> = []
  ) {}
  public set id(id: number) {
    this._id = id;
  }
  public get id(): number {
    return this._id;
  }
  public set name(name: string) {
    this._name = name;
  }
  public get name(): string {
    return this._name;
  }
  public set url(url: string) {
    this._url = url;
  }
  public get url(): string {
    return this._url;
  }
  public set thumbnailUrl(url: string) {
    this._thumbnailUrl = url;
  }
  public get thumbnailUrl(): string {
    return this._thumbnailUrl;
  }
  public set ownerId(id: number) {
    this._ownerId = id;
  }
  public get ownerId(): number {
    return this._ownerId;
  }
  public set owner(owner: User) {
    this._owner = owner;
  }
  public get owner(): User {
    return this._owner;
  }
  public set metadataId(id: number) {
    this._metadataId = id;
  }
  public get metadataId(): number {
    return this._metadataId;
  }
  public set metadata(meta: Metadata) {
    this._metadata = meta;
  }
  public get metadata(): Metadata {
    return this._metadata;
  }
  public addComment(comment: Comment) {
    this._comments.push(comment);
  }
  public get comments(): Array<Comment> {
    return this._comments;
  }
}
