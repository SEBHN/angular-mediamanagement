import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private usersService: UsersService) { }

  ngOnInit() {
  }

  onRegister(name: string, email: string, password: string) {
    this.usersService.register(new User('', email, false, password, 'JWT token'));
  }
}
