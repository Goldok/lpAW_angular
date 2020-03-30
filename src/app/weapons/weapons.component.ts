import { Component, OnInit } from '@angular/core';
import {Weapon} from '../data/weapon';
import { WeaponService } from '../services/weapon.service';
import {Hero} from '../data/hero';

@Component({
  selector: 'app-weapons',
  templateUrl: './weapons.component.html',
  styleUrls: ['./weapons.component.css']
})
export class WeaponsComponent implements OnInit {
  weapons: Weapon[];
  selectedWeapon: Weapon;
  sortingType: boolean;
  input : string;
  weaponsMemory : Weapon[];
  constructor(private weaponService: WeaponService) { }

  ngOnInit() {
    this.getWeapons();
    this.sortingType = true;
    this.input= '';
  }
  getWeapons(): void {
    this.weaponService.getWeapons()
      .subscribe(weapons => {this.weapons = weapons; this.weaponsMemory = weapons});
  }

  onSelect(weapon: Weapon): void {
    this.selectedWeapon = weapon;
  }

  sortWeaponsByProperty(property: string) {
    if (this.sortingType) {
      this.weapons.sort((a, b) => { return a[property] - b[property] });
    }
    else {
      this.weapons.sort((a, b) => { return  b[property] - a[property] });
    }
    this.sortingType = !this.sortingType;
  }
  sortWeaponsByName(){
    if (this.sortingType) {
      this.weapons.sort((a, b) => a.name.localeCompare(b.name));
    }
    else {
      this.weapons.sort((a, b) => b.name.localeCompare(a.name));
    }
    this.sortingType = !this.sortingType;
  }
  searchWeaponsByName(){
    this.weapons = this.weaponsMemory;
    this.weapons = this.weapons.filter(hero => hero.name.toLocaleLowerCase().includes(this.input.toLocaleLowerCase()));
  }


}
