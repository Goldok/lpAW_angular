import {Component, Input, OnInit} from '@angular/core';
import {WeaponService} from '../services/weapon.service';
import {Hero} from '../data/hero';
import {Weapon} from '../data/weapon';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-weapon-detail',
  templateUrl: './weapon-detail.component.html',
  styleUrls: ['./weapon-detail.component.css']
})
export class WeaponDetailComponent implements OnInit {

  updated: boolean;
  hint: boolean;
  constructor(private weaponService: WeaponService, private route: ActivatedRoute,    private location: Location

  ) { }
  @Input() weapon: Weapon;

  ngOnInit() {
    this.getWeapon();
  }
  getWeapon(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.weaponService.getWeapon(id.toString()).subscribe(weapon => this.weapon = weapon);
  }
  save(): void {
    if (this.weapon.name === '' || this.getTotalPoints() !== 0 ) {
      this.hint = true;
      return;
    }
    this.weaponService.updateWeapon(this.weapon.id, this.weapon);
    this.updated = false;
    this.location.back();
  }
  goBack(): void {
    this.location.back();
  }
  increase(attribute): void {
    this.updated = true;
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
    this.updated = true;

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
  deleteWeapon(): void {
    this.weaponService.deleteWeapon(this.weapon.id);
    this.goBack();
  }
  getTotalPoints(): number {
    return  (this.weapon.attaque + this.weapon.degats + this.weapon.esquive + this.weapon.pdv);
  }
}
