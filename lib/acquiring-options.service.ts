import { Injectable } from '@nestjs/common';
import { TinkoffOptions } from './interfaces/tinkoff-options.interface';

@Injectable()
export class AcquiringOptionsService {
  constructor(private opt: TinkoffOptions) {}

  get options(): TinkoffOptions {
    return this.opt;
  }
}
