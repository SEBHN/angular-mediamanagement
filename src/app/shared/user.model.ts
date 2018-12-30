export class User {

  private id: string;
  private email: string;
  private password: string;
  private name: string;

  constructor(id: string, name: string, email: string, isAdmin: boolean, password: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
  }

  getId(): string {
    return this.id;
  }

  getEmail(): string {
    return this.email;
  }

  getPassword(): string {
    return this.password;
  }

  getName(): string {
    return this.name;
  }
}
