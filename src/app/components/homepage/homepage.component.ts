import {Component, OnInit} from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, getFirestore, collection } from "firebase/firestore"
import { DocumentData, DocumentSnapshot, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
// /* Importing the firebase config file. */

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit  {
  email!: string;
  constructor(
    public authService: AuthService,
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


}
