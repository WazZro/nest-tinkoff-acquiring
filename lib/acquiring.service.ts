import crypto = require("crypto");

import { Injectable, HttpService, Logger, Optional } from "@nestjs/common";
import { InitResponse, InitOptions } from "./interfaces/init.interface";
import { AcquiringOptionsService } from "./acquiring-options.service";
import { TinkoffAcquiringUrls } from "./url.enum";

@Injectable()
export class AcquiringService {
  private static readonly HEADERS_JSON_DEFAULT = {
    "Content-Type": "application/json"
  };

  constructor(
    private http: HttpService,
    private options: AcquiringOptionsService,
    @Optional() private logger: Logger
  ) {}

  public async initPayment(options: InitOptions): Promise<InitResponse> {
    try {
      this.logger?.log("Creating init request...");
      const response = await this.getRequest<InitResponse>(
        TinkoffAcquiringUrls.INIT,
        options
      );

      return response.data;
    } catch (e) {
      this.logger?.error(e);
      Logger.error(e);
    }
  }

  private generateToken(body): string {
    let values = Object.keys(body)
      .sort()
      .map(key => body[key])
      .join("");

    return crypto
      .createHash("sha256")
      .update(values)
      .digest("hex");
  }

  private async getRequest<T>(url: string, options: any) {
    const opt = Object.assign({}, this.options.options, options);
    opt.Token = this.generateToken(opt);

    return this.http
      .post<T>(url, opt, {
        headers: AcquiringService.HEADERS_JSON_DEFAULT
      })
      .toPromise();
  }
}
