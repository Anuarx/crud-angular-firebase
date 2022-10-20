import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-authentication-form',
  templateUrl: './authentication-form.component.html',
  styleUrls: ['./authentication-form.component.css']
})
export class AuthenticationFormComponent implements OnInit {

  email: FormControl = new FormControl('')
  username: FormControl = new FormControl('')
  password: FormControl = new FormControl('')

  form: FormGroup = new FormGroup({
    email: this.email,
    username: this.username,
    password: this.password,
  })

  constructor(
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit(): void {
  }

  createUser() {
    this.authenticationService.createUser(this.form.value)
      .then((result) => {
        alert('Usuario registrado')
      })
      .catch((error) => {
        return error.message
      })
  }
}
