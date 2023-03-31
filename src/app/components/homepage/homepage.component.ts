import {Component, OnInit, ElementRef, Injectable} from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore"
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/services/api.service';
import { Latex } from 'src/app/latex';
import { DataService } from 'src/app/shared/services/data.service';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';
import { MatListModule } from '@angular/material/list';
import { Firestore } from '@angular/fire/firestore';
import { FileSaverService } from "ngx-filesaver";
// /* Importing the firebase config file. */

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})


export class HomepageComponent implements OnInit  {
  email!: string;
  imageSrc = 'https://math.vercel.app/?from=LaTeX.svg';
  latexExpr !: Latex;
  history !: AngularFirestoreCollection<Latex>;
  displayable_history!: SafeHtml[];
  svgAttribute!: string;
  sanitizedHtmlContent !: SafeHtml;
  constructor(
    public authService: AuthService,
    public apiService: ApiService,
    private router: Router,
    public dataService: DataService,
    public sanitizer: DomSanitizer,
    private fileSaverService: FileSaverService
    ) {}

    ngOnInit(): void {
      onAuthStateChanged(getAuth(), async (user) => {
        if (user) {
          const uid = user.uid;
          const docSnap = await getDoc(doc(getFirestore(), `users/${uid}`));
          if (docSnap.exists()){
            this.email = docSnap.data()['email'];
            this.history = this.dataService.getUserCommands(this.email);
            this.history.valueChanges().subscribe((commands: Latex[])=>{
              this.displayable_history = [];
              for(let c of commands){
                //string processing
                let indexH = c["svg"].indexOf("height")+7
                let indexW = c["svg"].indexOf("width")+6
                c["svg"] = c["svg"].slice(0, indexW)+`'${window.innerWidth-25}pt' `+c["svg"].slice(indexH-8, indexH) + `'${30}pt' `+c["svg"].slice(c["svg"].indexOf("viewBox")-1)
                this.displayable_history.push(this.sanitizer.bypassSecurityTrustHtml(c["svg"]))
              }
            })
          }
          else {
            this.router.navigate(['register-user']);
          }
        }
        else {
          this.router.navigate(['register-user']);
        }
      })
    }


    public getFormula(latexStr: string ): void {
      if(latexStr.length != 0){
        this.apiService.getLatex(latexStr, this.email).subscribe((a: Latex)=>{
          this.latexExpr = a;
          
          //string processing
          let indexH = a["svg"].indexOf("height")+7
          let indexW = a["svg"].indexOf("width")+6

          a["svg"] = a["svg"].slice(0, indexW)+`'${50+Math.pow((latexStr.length),2)}pt' `+a["svg"].slice(indexH-8, indexH) + `'${25+Math.pow((latexStr.length),0.5)}pt' `+a["svg"].slice(a["svg"].indexOf("viewBox")-1)

          this.sanitizedHtmlContent = this.sanitizer.bypassSecurityTrustHtml(a["svg"])
          //console.log(a["svg"])
        })
      }
    }

    public registerFormula(): void {
      this.dataService.addLtx(this.latexExpr)
    }

    public eraseFormula(): void{
      this.dataService.eraseFormula(this.email);
    }

    public downloadSvg(svgstr: SafeHtml){    
      let htmlstr = svgstr.toString()
      htmlstr = htmlstr.slice(htmlstr.indexOf("<svg")-1, htmlstr.lastIndexOf("svg>")+4)
      let blob=new Blob([htmlstr]);    
      this.fileSaverService.save(blob,'Latex_expr.svg');
  
    }

}
