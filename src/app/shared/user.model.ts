export class User {

  private id: string;
  private email: string;
  private isAdmin: boolean;
  private password: string;
  private token: string;

  constructor(id: string, email: string, isAdmin: boolean, password: string, token: string) {
    this.id = id;
    this.email = email;
    this.isAdmin = isAdmin;
    this.password = password;
    this.token = token;
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

  getToken(): string {
    return this.token;
  }

  storeTokenInLS(): void {
    localStorage.setItem('token', this.getToken());
  }

  getTokenFromLS(): string {
    return localStorage.getItem('token');
  }
}