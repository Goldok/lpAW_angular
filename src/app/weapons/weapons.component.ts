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
  constructor(private weaponService: WeaponService) { }

  ngOnInit() {
    this.getWeapons();
  }
  getWeapons(): void {
    this.weaponService.getWeapons()
      .subscribe(weapons => this.weapons = weapons);
  }

  onSelect(weapon: Weapon): void {
    this.selectedWeapon = weapon;
  }

}
