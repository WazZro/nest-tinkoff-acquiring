import { OptionsBase, ResponseBase } from './base.interface';

export interface StateOptions extends OptionsBase {
  PaymentId: string;
  Amount?: number;
  IP?: string;
  Receipt?: {};
}

export interface StateResponse extends ResponseBase {}
