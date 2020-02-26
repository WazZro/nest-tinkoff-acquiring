import { TinkoffOptions } from './interfaces/tinkoff-options.interface';

export class AcquiringOptionsService {
  constructor(private opt: TinkoffOptions) {}

  get options(): TinkoffOptions {
    return this.opt;
  }
}
