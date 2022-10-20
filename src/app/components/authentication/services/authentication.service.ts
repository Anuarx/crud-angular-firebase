import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

export interface IUser {
  email: string
  username: string
  password: string
}

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor(
    private firestore: AngularFirestore,
  ) { }

  createUser(userData: IUser) {
    return this.firestore.collection("users").add(userData)
      .then((result) => {
        return result
      })
      .catch((error) => {
        return error.message
      })
  }

  getUsers() {
    return this.firestore.collection("users").valueChanges()
  }

  deleteUser(userId: string) {
    return this.firestore.collection("users").doc(userId).delete()
      .then((result) => {
        return result
      })
      .catch((error) => {
        return error.message
      })
  }
}
