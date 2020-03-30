import { Component, OnInit } from '@angular/core';
import { Hero } from '../data/hero';
import { HeroService } from '../services/hero.service';
import { WeaponService } from '../services/weapon.service';
import { Weapon } from '../data/weapon';
@Component({
  selector: 'app-heros',
  templateUrl: './heros.component.html',
  styleUrls: ['./heros.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[];
  selectedHero: Hero;
  weapons: Weapon[];
  sortingType: boolean;
  input : string;
  heroesMemory : Hero[];


  constructor(private heroService: HeroService, private weaponService: WeaponService) { }

  ngOnInit() {
    this.getHeroes();
    this.getArmes();
    this.sortingType = true;
    this.input = '';
  }
  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => {this.heroes = heroes; this.heroesMemory = heroes});
  }
  getArmes(): void {
    this.weaponService.getWeapons()
      .subscribe(weapons => this.weapons = weapons);
  }

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
  getWeaponNameById(weaponId: string): string {
    let weapon = this.weapons.filter(weapon => weapon.id === weaponId)[0];
    if (weapon){
      return weapon.name;
    }else{
      return '';
    }
  }

  sortHeroesByProperty(property: string) {
    if (this.sortingType) {
      this.heroes.sort((a, b) => { return a[property] - b[property] });
    }
    else {
      this.heroes.sort((a, b) => { return  b[property] - a[property] });
    }
    this.sortingType = !this.sortingType;
  }
  sortHeroesByName(){
    if (this.sortingType) {
      this.heroes.sort((a, b) => a.name.localeCompare(b.name));
    }
    else {
      this.heroes.sort((a, b) => b.name.localeCompare(a.name));
    }
    this.sortingType = !this.sortingType;
  }
  searchHeroesByName(){
    this.heroes = this.heroesMemory;
    this.heroes = this.heroes.filter(hero => hero.name.toLocaleLowerCase().includes(this.input.toLocaleLowerCase()));
  }
}
