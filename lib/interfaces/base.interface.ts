export interface OptionsBase {
  TerminalKey?: string;
  Token?: string;
}

export interface ResponseBase {
  TerminalKey: string;
  OrderId: string;
  Success: boolean;
  Status: string;
  PaymentId: number;
  ErrorCode: string;
  Message?: string;
  Details?: string;
}
