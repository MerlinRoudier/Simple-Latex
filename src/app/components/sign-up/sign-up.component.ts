import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  hide=true;
  constructor(
    public authService: AuthService,
    private router: Router
  ) { }
  ngOnInit() { }
  goTo(url: string){
    this.router.navigate([url]);
  }
}
