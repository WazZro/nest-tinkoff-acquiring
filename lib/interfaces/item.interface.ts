import { TinkoffPaymentMethods, TinkoffPaymentObjects, TinkoffVatValues } from '..';

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
