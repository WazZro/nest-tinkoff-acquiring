export interface OptionsBase {
  TerminalKey?: string;
  Token?: string;
}

export interface ResponseBase {
  TerminalKey: string;
  OrderID: string;
  Success: boolean;
  Status: string;
  PaymentId: number;
  ErrorCode: string;
  Message?: string;
  Details?: string;
}
