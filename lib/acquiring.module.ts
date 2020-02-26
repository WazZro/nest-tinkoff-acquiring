import { Module, HttpModule, DynamicModule } from '@nestjs/common';
import { AcquiringService } from './acquiring.service';
import { TinkoffOptions } from './interfaces/tinkoff-options.interface';
import { AcquiringOptionsService } from './acquiring-options.service';

@Module({})
export class AcquiringModule {
  public static register(options: TinkoffOptions): DynamicModule {
    return {
      module: AcquiringModule,
      providers: [
        {
          provide: AcquiringOptionsService,
          useValue: new AcquiringOptionsService(options),
        },
        AcquiringService,
      ],
      exports: [AcquiringService],
      imports: [HttpModule],
    };
  }
}
