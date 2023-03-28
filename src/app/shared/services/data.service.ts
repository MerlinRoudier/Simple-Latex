import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Latex } from 'src/app/latex';



@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dbPath ='/commandes'
  ltxRef:AngularFirestoreCollection<Latex>


  constructor(
    private db: AngularFirestore,
    private afs: AngularFirestore
    ) {
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

  eraseFormula(email: string){
    const collectionRef: AngularFirestoreCollection<any> = this.afs.collection(this.dbPath);
    const query = collectionRef.ref.where('user', '==', email);
    query.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        doc.ref.delete();
      });
    });
  }
}
