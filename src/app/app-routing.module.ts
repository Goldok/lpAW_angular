import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heros/heros.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HeroDetailComponent} from './hero-detail/hero-detail.component';
import {WeaponsComponent} from './weapons/weapons.component';
import {WeaponDetailComponent} from './weapon-detail/weapon-detail.component';
import {HeroNewComponent} from './hero-new/hero-new.component';
import {WeaponNewComponent} from './weapon-new/weapon-new.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'heroes', component: HeroesComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'hero/new', component: HeroNewComponent },
  { path: 'weapons', component: WeaponsComponent },
  { path: 'weapon/new', component: WeaponNewComponent },

  { path: 'detailWeapon/:id', component: WeaponDetailComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
