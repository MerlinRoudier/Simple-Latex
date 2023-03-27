import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { query, where, collection } from "firebase/firestore";
import { Latex } from 'src/app/latex';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dbPath ='/commandes'
  ltxRef:AngularFirestoreCollection<Latex>


  constructor(private db: AngularFirestore) {
    this.ltxRef = db.collection(this.dbPath)
  }

  getAllCommands(): AngularFirestoreCollection<Latex>{
    return this.ltxRef;
  }

  getUserCommands(user: string): AngularFirestoreCollection<Latex>{
    return this.db.collection(this.dbPath, ref=>ref.where("user", "==", user))
  }

  addLtx(ltx : Latex){
    return this.ltxRef.add({ ...ltx })
  }

}
