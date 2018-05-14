import { IUser } from './user.model';

export const enum Units {
  kg = 'kg',
  lb = 'lb'
}

export interface IPreferences {
  id?: number;
  weekly_goal?: number;
  weight_units?: Units;
  user?: IUser;
}

export class Preferences implements IPreferences {
  constructor(public id?: number, public weekly_goal?: number, public weight_units?: Units, public user?: IUser) {}
}
