import { HttpModule, Provider } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AcquiringOptionsService } from './acquiring-options.service';
import { AcquiringService } from './acquiring.service';

describe('AcquiringService', () => {
  const options: Provider = {
    provide: AcquiringOptionsService,
    useValue: new AcquiringOptionsService({
      terminalKey: process.env.TINKOFF_TERMINAL_KEY,
      password: process.env.TINKOFF_PASSWORD,
    }),
  };
  const testRequestForToken = {
    TerminalKey: 'TinkoffBankTest',
    Amount: '100000',
    OrderId: 'TokenExample',
    Description: 'test',
    DATA: {
      Phone: '+71234567890',
      Email: 'a@test.com',
    },
    Receipt: {
      Email: 'a@test.ru',
      Phone: '+79031234567',
      Taxation: 'osn',
      Items: [
        {
          Name: 'Наименование товара 1',
          Price: 10000,
          Quantity: 1.0,
          Amount: 10000,
          Tax: 'vat10',
          Ean13: '0123456789',
        },
      ],
    },
  };
  const validShaToken =
    '48d4ca825aab2ede06736d3eae099bd56ac97bd1bcdd598aff210f729de4eb21';
  let service: AcquiringService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [AcquiringService, options],
    }).compile();

    service = module.get<AcquiringService>(AcquiringService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be valid sha token', () => {
    const request = testRequestForToken;

    const sha = service.generateToken(request, 'TinkoffBankTest');
    expect(sha).toEqual(validShaToken);
  });
});
