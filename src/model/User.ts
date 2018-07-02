export class User {


  public displayName: string;
  public email: string;
  public photoURL: string;

  constructor(user: any) {
    if (user) {
      this.displayName = user.displayName;
      this.email = user.email;
      this.photoURL = user.photoURL;
    }
  }


}
