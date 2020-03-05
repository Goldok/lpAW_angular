import {Component, OnInit, Input, NgModule} from '@angular/core';
import { Hero } from '../data/hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../services/hero.service';
import {WeaponService} from '../services/weapon.service';
import {Weapon} from '../data/weapon';


@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})

export class HeroDetailComponent implements OnInit {

  updated: boolean;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private weaponService: WeaponService,
    private location: Location
  ) {}


  @Input() hero: Hero;
  weapons: Weapon[];

  ngOnInit(): void {
    this.getHero();
    this.getWeapons();
  }

  getHero(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id.toString()).subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }
  increase(attribute): void {
    if (this.hero.attaque + this.hero.degats + this.hero.esquive + this.hero.pdv >= 40) { return; }
    this.updated = true;
    if (attribute === 'degats') {
      this.hero.degats ++;
    }
    if (attribute === 'pdv') {
      this.hero.pdv ++;
    }
    if (attribute === 'attaque') {
      this.hero.attaque ++;
    }
    if (attribute === 'esquive') {
      this.hero.esquive ++;
    }
  }
  decrease(attribute): void {
    this.updated = true;

    if (attribute === 'degats' && this.hero.degats > 1) {
      this.hero.degats --;
    }
    if (attribute === 'pdv' && this.hero.pdv > 1) {
      this.hero.pdv --;
    }
    if (attribute === 'esquive' && this.hero.esquive > 1) {
      this.hero.esquive --;
    }
    if (attribute === 'attaque' && this.hero.attaque > 1) {
      this.hero.attaque --;
    }
  }
  save(): void {
    if (this.hero.name === '') {
      return ;
    }
    this.heroService.updateHero(this.hero.id, this.hero);
    this.location.back();
  }

  deleteHero(): void {
    this.heroService.deleteHero(this.hero.id);
    this.goBack();
  }
  getPointRestant(): number {
    return 40 - (this.hero.attaque + this.hero.degats + this.hero.esquive + this.hero.pdv);
  }
  getWeapons(): void {
    this.weaponService.getWeapons()
      .subscribe(weapons => this.weapons = weapons);
  }
}
