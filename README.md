## Description

TinkoffBank Acquiring Module for [NestJS](https://github.com/nestjs/nest) using Cron

## Installation

```bash
$ npm i nest-tinkoff-acquiring
```

Import module to AppModule

```ts
import { Module } from '@nestjs/common';
import { AcquiringModule } from 'nest-tinkoff-acquiring';

@Module({
  imports: [
    AcquiringModule.register({
      terminalKey: 'test',
      password: 'test',
    }),
  ],
})
export class AppModule {}
```

API
==

### TaskModule
* `register`
  * `terminalKey` - [REQUIRED] your bank terminal key
  * `password` - [REQUIRED] password:)
