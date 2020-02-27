import { OptionsBase, ResponseBase } from './base.interface';

export interface CancelOptions extends OptionsBase {
  Amount: number;
  PaymentId: number;
  IP?: string;
  Receipt: {};
}

export interface CancelResponse extends ResponseBase {
  OriginalAmount: number;
  NewAmount: number;
}
