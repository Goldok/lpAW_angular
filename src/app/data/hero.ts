import {Serializable} from './serializable';
export class Hero extends Serializable  {
  id: string;
  name: string;
  pdv: number;
  attaque: number;
  degats: number;
  esquive: number;
  weaponId: string;
}
