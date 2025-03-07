import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';
import { CometData } from '@/entities/comet';

@Exclude()
export class CometDataDto implements CometData {
  @Expose()
  @IsString()
  @ApiProperty({
    type: String,
    example: '0x3afdc9bca9213a35503b077a6072f3d0d5ab0840',
  })
  address: string;

  @Expose()
  @IsString()
  @ApiProperty({ type: String, example: '4.80092' })
  supplyApr: string;

  @Expose()
  @IsString()
  @ApiProperty({ type: String, example: '5.94530' })
  borrowApr: string;
}
