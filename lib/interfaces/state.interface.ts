import { OptionsBase, ResponseBase } from './base.interface';

export interface StateOptions extends OptionsBase {
  PaymentId: string;
}

export interface StateResponse extends ResponseBase {}
