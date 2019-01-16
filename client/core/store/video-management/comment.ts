import { User } from '../user-management/user/user';

export class Comment {
  constructor(
    private _id: number = null,
    private _ownerId: number = null,
    private _owner: User = null,
    private _content: string = '',
    private _creationDate: string = ''
  ) {}
  public set id(id: number) {
    this._id = id;
  }
  public get id(): number {
    return this._id;
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
  public set content(content: string) {
    this._content = content;
  }
  public get content(): string {
    return this._content;
  }
  public set creationDate(creationDate: string) {
    this._creationDate = creationDate;
  }
  public get creationDate(): string {
    return this._creationDate;
  }
}
