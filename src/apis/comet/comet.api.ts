import { Module } from '@nestjs/common';
import { CometModule } from '@/services/comet';
import { CometController } from './comet.controller';

@Module({
  imports: [CometModule],
  controllers: [CometController],
})
export class CometApi {}