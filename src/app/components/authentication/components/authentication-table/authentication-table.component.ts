import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-authentication-table',
  templateUrl: './authentication-table.component.html',
  styleUrls: ['./authentication-table.component.css']
})
export class AuthenticationTableComponent implements OnInit {

  usuarios: any[] = []

  constructor(
    private authentication: AuthenticationService,
  ) { }

  ngOnInit(): void {
    this.getUsuarios()
  }

  getUsuarios() {
    this.authentication.getUsers()
      .forEach((result) => {
        this.usuarios = result
      })
  }

}
