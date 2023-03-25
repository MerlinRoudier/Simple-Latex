import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import { Router } from '@angular/router';



@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  hide = true;
  constructor(
    public authService: AuthService,
    private router: Router
  ) { }
  ngOnInit() { }
  goTo(url: string){
    this.router.navigate([url]);
  }
}
