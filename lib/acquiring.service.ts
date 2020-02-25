import crypto = require('crypto');

import { AxiosResponse } from 'axios';
import { HttpService, Injectable, Logger, Optional } from '@nestjs/common';
import { AcquiringOptionsService } from './acquiring-options.service';
import { OptionsBase, ResponseBase } from './interfaces/base.interface';
import { InitOptions, InitResponse } from './interfaces/init.interface';
import { TinkoffAcquiringUrls } from './url.enum';

@Injectable()
export class AcquiringService {
  private static readonly HEADERS_JSON_DEFAULT = {
    'Content-Type': 'application/json',
  };

  constructor(
    private http: HttpService,
    private options: AcquiringOptionsService,
    @Optional() private logger: Logger,
  ) {}

  public async initPayment(options: InitOptions): Promise<InitResponse> {
    try {
      this.logger?.log('Creating init request...');
      const response = await this.getRequest<InitResponse>(
        TinkoffAcquiringUrls.INIT,
        options,
      );

      return response.data;
    } catch (e) {
      this.logger?.error(e);
      Logger.error(e);
    }
  }

  public generateToken(body: unknown, password: string): string {
    const bodyCopy = Object.assign({}, body);
    bodyCopy['Password'] = password;

    const values = Object.keys(bodyCopy)
      .filter(
        key => key.toLowerCase() !== 'data' && key.toLowerCase() !== 'receipt',
      )
      .sort()
      .map(key => bodyCopy[key])
      .join('');

    return crypto
      .createHash('sha256')
      .update(values)
      .digest('hex');
  }

  private prepareOptions(options: OptionsBase): OptionsBase {
    options.TerminalKey = this.options.options.terminalKey;
    options.Token = this.generateToken(options, this.options.options.password);

    return options;
  }

  private async getRequest<T extends ResponseBase>(
    url: string,
    options: OptionsBase,
  ): Promise<AxiosResponse<T>> {
    this.prepareOptions(options);
    return this.http
      .post<T>(url, options, {
        headers: AcquiringService.HEADERS_JSON_DEFAULT,
      })
      .toPromise();
  }
}
