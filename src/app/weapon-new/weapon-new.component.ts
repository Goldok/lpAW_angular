import {Component, Input, OnInit} from '@angular/core';
import {Weapon} from '../data/weapon';
import {WeaponService} from '../services/weapon.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-weapon-new',
  templateUrl: './weapon-new.component.html',
  styleUrls: ['./weapon-new.component.css']
})
export class WeaponNewComponent implements OnInit {

  @Input()
  weapon: Weapon;
  hint: boolean;

  constructor(private weaponService: WeaponService, private route: ActivatedRoute,    private location: Location) { }

  ngOnInit() {
    this.weapon = new Weapon();
    this.weapon.name = '';
    this.weapon.degats = 0;
    this.weapon.attaque = 0;
    this.weapon.esquive = 0;
    this.weapon.pdv = 0;

  }

  save(): void {
    if (this.weapon.name === '' || this.getPointRestant() !== 0 ) {
      this.hint = true;
      return;
    }
    this.weaponService.addWeapon(this.weapon);
    this.location.back();
  }
  goBack(): void {
    this.location.back();
  }
  increase(attribute: string): void {
    if (attribute === 'degats' && this.weapon.degats < 5) {
      this.weapon.degats ++;
    }
    if (attribute === 'pdv' && this.weapon.pdv < 5) {
      this.weapon.pdv ++;
    }
    if (attribute === 'attaque' && this.weapon.attaque < 5) {
      this.weapon.attaque ++;
    }
    if (attribute === 'esquive' && this.weapon.esquive < 5) {
      this.weapon.esquive ++;
    }
  }
  decrease(attribute): void {
    if (attribute === 'degats' && this.weapon.degats > -5 ) {
      this.weapon.degats --;
    }
    if (attribute === 'pdv' && this.weapon.pdv > -5 ) {
      this.weapon.pdv --;
    }
    if (attribute === 'esquive' && this.weapon.esquive > -5) {
      this.weapon.esquive --;
    }
    if (attribute === 'attaque' && this.weapon.attaque > -5 ) {
      this.weapon.attaque --;
    }
  }

  getPointRestant(): number {
    return  (this.weapon.attaque + this.weapon.degats + this.weapon.esquive + this.weapon.pdv);
  }
}
