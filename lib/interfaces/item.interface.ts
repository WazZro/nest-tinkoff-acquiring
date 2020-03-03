import { TinkoffPaymentMethods } from '../enum/payment-methods.enum';
import { TinkoffPaymentObjects } from '../enum/payment-object.enum';
import { TinkoffVatValues } from '../enum/vat.enum';

export interface Item {
  Name: string;
  Quantity: number;
  Amount: number;
  Price: number;
  Tax: TinkoffVatValues;
  PaymentMethod?: TinkoffPaymentMethods;
  PaymentObject?: TinkoffPaymentObjects;
  ShopCode?: string;
  Ean13?: string;
}
