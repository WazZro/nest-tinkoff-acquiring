import crypto = require('crypto');

import {
  HttpService,
  Injectable,
  Logger,
  Optional,
  BadRequestException,
} from '@nestjs/common';
import { AxiosResponse } from 'axios';
import {
  CancelOptions,
  CancelResponse,
  StateOptions,
  StateResponse,
  ConfirmOptions,
  ConfirmResponse,
  FinishAuthorizeResponse,
  FinishAuthorizeOptions,
} from '.';
import { AcquiringOptionsService } from './acquiring-options.service';
import { OptionsBase, ResponseBase } from './interfaces/base.interface';
import { InitOptions, InitResponse } from './interfaces/init.interface';
import { TinkoffAcquiringUrls } from './enum/url.enum';

@Injectable()
export class AcquiringService {
  private static readonly HEADERS_JSON_DEFAULT = {
    'Content-Type': 'application/json',
  };

  public constructor(
    private http: HttpService,
    private options: AcquiringOptionsService,
    @Optional() private logger: Logger,
  ) {}

  /**
   * Initialize payment
   * @param {InitOptions} options
   * @returnType {Promise<InitResponse>}
   */
  public async initPayment(options: InitOptions): Promise<InitResponse> {
    try {
      this.logger?.log('Creating init request...');
      const response = await this.getRequest<InitResponse>(
        TinkoffAcquiringUrls.INIT,
        options,
      );

      this.errorCheck(response.data);
      return response.data;
    } catch (e) {
      this.logger?.error(e);
      Logger.error(e);
      throw e;
    }
  }

  public async getPaymentState(options: StateOptions): Promise<StateResponse> {
    try {
      this.logger?.log('Get state request...');
      const response = await this.getRequest<StateResponse>(
        TinkoffAcquiringUrls.GET_STATE,
        options,
      );

      this.errorCheck(response.data);
      return response.data;
    } catch (e) {
      this.logger?.error(e);
      Logger.error(e);
      throw e;
    }
  }

  public async cancelPayment(options: CancelOptions): Promise<CancelResponse> {
    try {
      this.logger?.log('Cancel request...');
      const response = await this.getRequest<CancelResponse>(
        TinkoffAcquiringUrls.CANCEL,
        options,
      );

      this.errorCheck(response.data);
      return response.data;
    } catch (e) {
      this.logger?.error(e);
      Logger.error(e);
      throw e;
    }
  }

  public async confirmPayment(
    options: ConfirmOptions,
  ): Promise<ConfirmResponse> {
    try {
      this.logger?.log('Confirm request...');
      const response = await this.getRequest<ConfirmResponse>(
        TinkoffAcquiringUrls.CANCEL,
        options,
      );

      this.errorCheck(response.data);
      return response.data;
    } catch (e) {
      this.logger?.error(e);
      Logger.error(e);
      throw e;
    }
  }

  public async finishAuthorizePayment(
    options: FinishAuthorizeOptions,
  ): Promise<FinishAuthorizeResponse> {
    try {
      this.logger?.log('Finishing authorize request...');
      const response = await this.getRequest<FinishAuthorizeResponse>(
        TinkoffAcquiringUrls.CANCEL,
        options,
      );

      this.errorCheck(response.data);
      return response.data;
    } catch (e) {
      this.logger?.error(e);
      Logger.error(e);
      throw e;
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

  private errorCheck(response: ResponseBase): void {
    if (response.ErrorCode === '0') return;
    throw new BadRequestException(response.Message, response.Details);
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
