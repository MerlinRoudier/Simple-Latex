import { Component } from '@angular/core';
import { auth } from '../../firebase-config'
import { createUserWithEmailAndPassword } from "firebase/auth";




@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  email!: string;
  password!: string;
  passwordConf!: string;

  submit(){
    //submition code here
    if(this.password != this.passwordConf)
    {
     console.log("les mots de passe ne correspondent pas");
    }
    else if(this.password.length < 6)
    {
      console.log("Ce mot de passe est a chier");
    }
    else
    {
    createUserWithEmailAndPassword(auth, this.email, this.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
    }
  }
}

