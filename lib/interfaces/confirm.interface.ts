import { OptionsBase, ResponseBase } from './base.interface';

export interface ConfirmOptions extends OptionsBase {
  PaymentId: string;
  Amount?: number;
  IP?: string;
  Receipt?: {};
}

export interface ConfirmResponse extends ResponseBase {}
