import { TinkoffAcquiringTaxations } from '..';
import { Item } from './item.interface';

export interface Receipt {
  Email?: string;
  Phone?: string;
  EmailCompany?: string;
  Taxation: TinkoffAcquiringTaxations;
  Items: Item[];
}
