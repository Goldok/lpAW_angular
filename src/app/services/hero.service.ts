import { Injectable } from '@angular/core';
import { Hero } from '../data/hero';
import { HEROES } from '../mock-heroes';
import {Observable, of} from 'rxjs';
import { MessageService } from './message.service';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {ancestorWhere} from 'tslint';
@Injectable({
  providedIn: 'root'
})
export class HeroService {
  heroes: Observable<any[]>;
  db: AngularFirestore;

  constructor(private messageService: MessageService, db: AngularFirestore) {
    this.db = db;
  }

  getHeroes(): Observable<Hero[]> {

    //
    return this.db.collection<Hero>('heroes')
      .snapshotChanges()
      .pipe(
        map(actions => {

          return actions.map(a => {

            // Get document data
            const data = a.payload.doc.data();

            // New Hero
            const hero = new Hero().fromJSON(data);

            // Get document id
            const id = a.payload.doc.id;
            hero.id = id;
            // Use spread operator to add the id to the document data
            return hero;

          });
        })
      );
  }


  getHeroesTop3(): Observable<Hero[]> {

    //
    return this.db.collection('heroes', ref => ref.limit(3))
      .snapshotChanges()
      .pipe(
        map(actions => {

          return actions.map(a => {

            /* // Get document data
            const data = a.payload.doc.data() as Hero;

            // Get document id
            const id = a.payload.doc.id;

            // Use spread operator to add the id to the document data
            return {id, ...data};*/

            // Get document data
            const data = a.payload.doc.data();

            // New Hero
            const hero = new Hero().fromJSON(data);

            // Get document id
            const id = a.payload.doc.id;
            hero.id = id;

            // Use spread operator to add the id to the document data
            return hero;

          });
        })
      );
  }

  private getHeroDocument(id: string): AngularFirestoreDocument<Hero> {
    // return document
    return this.db.doc<Hero>('heroes' + `/` + id);
  }

  getHero(id: string): Observable<Hero> {

    // Return hero observable
    return this.getHeroDocument(id).snapshotChanges()
      .pipe(
        map(a => {

          // Get document data
          const data = a.payload.data() as Hero;
          // return {id, ...data};

          // New Hero
          const hero = new Hero().fromJSON(data);
          hero.id = id;
          // Use spread operator to add the id to the document data
          return hero;
        })
      );
  }

  addHero(hero: Hero) {
    this.db.collection<Hero>('heroes').add(Object.assign({}, hero));
  }

  updateHero(id: string, hero: Hero) {

    // Update document
    this.getHeroDocument(id).update(Object.assign({}, hero));
  }

  deleteHero(id: string) {

    // Delete the document
    this.getHeroDocument(id).delete();
  }

}
