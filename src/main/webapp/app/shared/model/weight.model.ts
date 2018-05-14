import { Moment } from 'moment';
import { IUser } from './user.model';

export interface IWeight {
  id?: number;
  datetime?: Moment;
  weigth?: number;
  user?: IUser;
}

export class Weight implements IWeight {
  constructor(public id?: number, public datetime?: Moment, public weigth?: number, public user?: IUser) {}
}
