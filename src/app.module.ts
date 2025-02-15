import { Module } from '@nestjs/common';
import { ConfigModule } from '@/config';
import { HealthApi } from './apis/health';
import { CometApi } from './apis/comet';

@Module({
  imports: [ConfigModule, HealthApi, CometApi],
})
export class AppModule {}
