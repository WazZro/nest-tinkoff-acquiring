import { OptionsBase, ResponseBase } from './base.interface';
import { Receipt } from './receipt.interface';

export interface ConfirmOptions extends OptionsBase {
  PaymentId: string;
  Amount?: number;
  IP?: string;
  Receipt?: Receipt;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ConfirmResponse extends ResponseBase {}
