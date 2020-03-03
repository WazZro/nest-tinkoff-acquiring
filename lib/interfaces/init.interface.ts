import { OptionsBase, ResponseBase } from './base.interface';
import { Receipt } from './receipt.interface';

export interface InitOptions extends OptionsBase {
  Amount?: number;
  OrderId: string;
  IP?: string;
  Description?: string;
  // Currency?: number;
  Language?: 'ru' | 'en';
  CustomerKey?: string;
  Recurrent?: 'Y';
  RedirectDueDate?: Date;
  NotificationURL?: string;
  SuccessURL?: string;
  FailURL?: string;
  PayType?: 'O' | 'T';
  Receipt?: Receipt;
  DATA?: {};
}

export interface InitResponse extends ResponseBase {
  Amount: number;
  OrderId: string;
  Success: boolean;
  Status: string;
  PaymentId: number;
  ErrorCode: string;
  PaymentURL?: string;
  Message?: string;
  Details?: string;
}
