export class User {
  constructor(
    private _id: number = null,
    private _email: string = '',
    private _firstName: string = '',
    private _lastName: string = '',
    private _birthDate: string = '',
    private _gender: string = '',
  ) {}
  public get id(): number {
    return this._id;
  }
  public set id(id: number) {
    this._id = id;
  }
  public get email(): string {
    return this._email;
  }
  public set email(email: string) {
    this._email = email;
  }
  public get firstName(): string {
    return this._firstName;
  }
  public set firstName(firstName: string) {
    this._firstName = firstName;
  }
  public get lastName(): string {
    return this._lastName;
  }
  public set lastName(lastName: string) {
    this._lastName = lastName;
  }
  public get birthDate(): string {
    return this._birthDate;
  }
  public set birthDate(birthDate: string) {
    this._birthDate = birthDate;
  }
  public get gender(): string {
    return this._gender;
  }
  public set gender(gender: string) {
    this._gender = gender;
  }
}

export interface UserState {
  user: User,
  loading: boolean,
  saving: boolean,
  error: any
}
