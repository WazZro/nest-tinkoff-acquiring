import { Module, HttpModule, DynamicModule } from "@nestjs/common";
import { AcquiringService } from "./acquiring.service";
import { TinkoffOptions } from "./interfaces/tinkoff-options.interface";
import { AcquiringOptionsService } from "./acquiring-options.service";

@Module({
  imports: [HttpModule],
  providers: [AcquiringService]
})
export class AcquiringModule {
  public static register(options: TinkoffOptions): DynamicModule {
    return {
      module: AcquiringModule,
      providers: [
        {
          provide: AcquiringOptionsService,
          useExisting: new AcquiringOptionsService(options)
        },
        AcquiringService
      ]
    };
  }
}
