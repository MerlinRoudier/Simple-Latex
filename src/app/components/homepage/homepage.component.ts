import {Component, OnInit, SimpleChange} from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore, collection } from "firebase/firestore"
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { Latex } from 'src/app/latex';
import { DataService } from 'src/app/shared/services/data.service';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
// /* Importing the firebase config file. */

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})


export class HomepageComponent implements OnInit  {
  email!: string;
  imageSrc = 'https://math.vercel.app/?from=LaTeX.svg';
  renderedB64Latex!: string;
  latexExpr !: Latex;
  history !: AngularFirestoreCollection<Latex>;
  constructor(
    public authService: AuthService,
    public apiService: ApiService,
    private router: Router,
    public dataService: DataService
    ) {}

    ngOnInit(): void {
      onAuthStateChanged(getAuth(), async (user) => {
        if (user) {
          const uid = user.uid;
          const docSnap = await getDoc(doc(getFirestore(), `users/${uid}`));
          if (docSnap.exists())
            this.email = docSnap.data()['email'];
          else {
            this.router.navigate(['register-user']);
          }
        }
        else {
          this.router.navigate(['register-user']);
        }
      })
    }


   public getFormula(latexStr: string): void {
    if(latexStr.length != 0){
        this.apiService.getLatex(latexStr).subscribe((a: Latex)=>{
        this.renderedB64Latex = 'data:image/svg;base64,'+a["base64"]
        this.latexExpr = a;
      })
    }
    }

    public registerFormula(): void {
      this.dataService.addLtx(this.latexExpr)
    }

    public showAllFormulas():void{
      this.history = this.dataService.getAllCommands()
      this.history.valueChanges().subscribe((commands: Latex[])=>{
      const list = document.getElementById("hist") || document.createElement('ul');
      if(list.innerHTML == ''){
        list.id = "hist";
        document.body.appendChild(list);
      }
      else{
        list.innerHTML=''
      }
      commands.forEach((command)=>{
        if(command.base64){
          const item = document.createElement('img');
          item.src='data:image/svg;base64,'+command.base64;
          list.appendChild(item);
        }
        })
      })
    }
}
