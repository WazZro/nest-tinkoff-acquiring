export interface InitOptions {
  Amount: number;
  OrderId: string;
  IP?: string;
  Description?: string;
  Currency?: number;
  Language?: string;
  CustomerKey?: string;
  Recurrent?: string;
  RedirectDueDate?: Date;
  DATA?: string;
}

export interface InitResponse {
  TerminalKey: string;
  Amount: number;
  OrderId: string;
  Success: boolean;
  Status: any;
  PaymentId: string;
  ErrorCode: string;
  PaymentURL?: string;
  Message?: string;
  Details?: string;
}
