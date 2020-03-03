import { OptionsBase, ResponseBase } from './base.interface';
import { Receipt } from './receipt.interface';

export interface CancelOptions extends OptionsBase {
  Amount: number;
  PaymentId: number;
  IP?: string;
  Receipt: Receipt;
}

export interface CancelResponse extends ResponseBase {
  OriginalAmount: number;
  NewAmount: number;
}
