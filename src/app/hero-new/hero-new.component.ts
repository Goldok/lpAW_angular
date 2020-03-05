import {Component, Input, OnInit} from '@angular/core';
import {Hero} from '../data/hero';
import {Location} from '@angular/common';
import {HeroService} from '../services/hero.service';
import {Weapon} from '../data/weapon';
import {WeaponService} from '../services/weapon.service';

@Component({
  selector: 'app-hero-new',
  templateUrl: './hero-new.component.html',
  styleUrls: ['./hero-new.component.css']
})
export class HeroNewComponent implements OnInit {

  @Input()
  hero: Hero;
  weapons: Weapon[];
  selectedWeapon: string;
  hint: boolean
  constructor(
    private location: Location,
    private weaponService: WeaponService,
    private heroService: HeroService,
  ) { }

  ngOnInit() {
    this.getWeapons();
    this.hero = new Hero();
    this.hint = false;
    this.hero.name = '';
    this.hero.esquive = 1;
    this.hero.attaque = 1;
    this.hero.degats = 1;
    this.hero.pdv = 1;
  }



  increase(attribute): void {
    if (this.hero.attaque + this.hero.degats + this.hero.esquive + this.hero.pdv >= 40) { return; }
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
    console.log('SELECTED WEAPON :', this.selectedWeapon);

    if (this.hero.name === '') {
      this.hint = true;
      return ;
    }
    if (this.selectedWeapon){
      this.hero.weaponId = this.selectedWeapon;
    }
    this.heroService.addHero(this.hero);
    this.goBack();
  }

  getPointRestant(): number {
    return 40 - (this.hero.attaque + this.hero.degats + this.hero.esquive + this.hero.pdv);
  }
  goBack(): void {
    this.location.back();
  }
  getWeapons(): void {
    this.weaponService.getWeapons()
      .subscribe(weapons => this.weapons = weapons);
  }

}
