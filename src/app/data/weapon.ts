import {Serializable} from './serializable';

export class Weapon extends Serializable  {
  id: string;
  name: string;
  pdv: number;
  attaque: number;
  degats: number;
  esquive: number;
}
