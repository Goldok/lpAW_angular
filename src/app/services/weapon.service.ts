import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {Weapon} from '../data/weapon';
import {Hero} from '../data/hero';
@Injectable({
  providedIn: 'root'
})
export class WeaponService {
  weapons: Observable<any[]>;
  db: AngularFirestore;

  constructor(db: AngularFirestore) {
    this.db = db;
  }

  getWeapons(): Observable<Weapon[]> {

    //
    return this.db.collection<Weapon>('weapons')
      .snapshotChanges()
      .pipe(
        map(actions => {

          return actions.map(a => {

            // Get document data
            const data = a.payload.doc.data();

            // New Hero
            const weapon = new Weapon().fromJSON(data);

            // Get document id
            const id = a.payload.doc.id;
            weapon.id = id;

            // Use spread operator to add the id to the document data
            return weapon;

          });
        })
      );
  }

  private getWeaponDocument(id: string): AngularFirestoreDocument<Weapon> {
    // return document
    return this.db.doc<Weapon>('weapons' + `/` + id);
  }

  getWeapon(id: string): Observable<Weapon> {

    // Return hero observable
    return this.getWeaponDocument(id).snapshotChanges()
      .pipe(
        map(a => {

          // Get document data
          const data = a.payload.data() as Weapon;
          // return {id, ...data};

          // New Hero
          const weapon = new Hero().fromJSON(data);
          weapon.id = id;

          // Use spread operator to add the id to the document data
          return weapon;
        })
      );
  }

  updateWeapon(id: string, weapon: Weapon) {
    // Update document
    this.getWeaponDocument(id).update(Object.assign({}, weapon));
  }

  addWeapon(weapon: Weapon) {
    this.db.collection<Weapon>('weapons').add(Object.assign({}, weapon));
  }

  deleteWeapon(id: string) {

    // Delete the document
    this.getWeaponDocument(id).delete();
  }

}
