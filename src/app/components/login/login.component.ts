import { Component } from '@angular/core';
import { auth } from '../../firebase-config'
import { signInWithEmailAndPassword } from "firebase/auth";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email!: string;
  password!: string;

  login() {
    signInWithEmailAndPassword(auth, this.email, this.password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }
}
