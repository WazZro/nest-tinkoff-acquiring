import { OptionsBase, ResponseBase } from './base.interface';

// https://oplata.tinkoff.ru/develop/api/payments/finishAuthorize-request/
export interface FinishAuthorizeOptions extends OptionsBase {
  CardData: string; // Base64
  EncryptedPaymentData?: string;
  Amount?: number;
  IP?: string;
  Description?: string;
  CustomerKey?: string;
  InfoEmail?: string;
  Phone?: string;
  Route?: 'ACQ'; // wtf
  Source?: 'cards' | 'ApplePay';
  Receipt?: {};
  DATA?: {};
}

export interface FinishAuthorizeResponse extends ResponseBase {
  Amount: number;
  CardId?: string;
}
