import { Controller, Get, SerializeOptions, Param } from '@nestjs/common';
import { CometService } from '@/services/comet';
import { ApiResponse, ApiParam } from '@nestjs/swagger';
import { CometData } from '@/entities/comet';
import { CometDataDto } from './comet-data.dto';

@Controller('token')
export class CometController {
  constructor(private readonly token: CometService) {}

  @Get('/:cometProxyAddress')
  @ApiResponse({ status: 200, type: CometDataDto })
  @SerializeOptions({ type: CometDataDto })
  @ApiParam({
    name: 'cometProxyAddress',
    required: true,
    description: 'CometProxy Address',
    example: '0x3afdc9bca9213a35503b077a6072f3d0d5ab0840',
  })
  getCometData(
    @Param('cometProxyAddress') cometProxyAddress: string,
  ): Promise<CometData> {
    return this.token.getCometData(cometProxyAddress);
  }
}