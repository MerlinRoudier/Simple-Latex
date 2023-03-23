import {Component, OnInit, SimpleChange} from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore, collection } from "firebase/firestore"
import { DocumentData, DocumentSnapshot, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { Input, OnChanges , SimpleChanges} from '@angular/core';
import { Latex } from 'src/app/latex';
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
  constructor(
    public authService: AuthService,
    public apiService: ApiService,
    private router: Router,
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


   public getFormula(latexStr: string): any {
     this.apiService.getLatex(latexStr).subscribe((a: Latex)=>{
      this.renderedB64Latex = 'data:image/svg;base64,'+a["base64"]
      console.log(a['type'])
      console.log(a)
     })
    }


}
