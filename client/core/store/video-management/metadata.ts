export class Metadata {
  constructor(
    private _id: number = null,
    private _description: string = '',
    private _likes: number = null,
    private _dislikes: number = null,
    private _shares: number = null,
    private _uploadDate: string = ''
  ) {}
  public set id(id: number) {
    this._id = id;
  }
  public get id(): number {
    return this._id;
  }
  public set description(description: string) {
    this._description = description;
  }
  public get description(): string {
    return this._description;
  }
  public set likes(likes: number) {
    this._likes = likes;
  }
  public get likes(): number {
    return this._likes;
  }
  public set dislikes(likes: number) {
    this._dislikes = likes;
  }
  public get dislikes(): number {
    return this._dislikes;
  }
  public set shares(shares: number) {
    this._shares = shares;
  }
  public get shares(): number {
    return this._shares;
  }
  public set uploadDate(uploadDate: string) {
    this._uploadDate = uploadDate;
  }
  public get uploadDate(): string {
    return this._uploadDate;
  }
}
