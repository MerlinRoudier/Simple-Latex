import { Component } from '@angular/core';



@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  username!: string;
  password!: string;
  passwordConf!: string;
  email!: string;
  birthDate!: string;
  phoneNumber!: string;

  submit(){
    //submition code here
  }

  checkPhoneNumer(){
    //function to check the phone number
  }

  checkEmailAdress(){
    //function to check email adress
  }

  checkCastBirthDate(){
    //function to check and convert birth date
  }

  checkPassword(){
    //function to check if passwords matches or not
  }
}
