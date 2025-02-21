import { Test, TestingModule } from '@nestjs/testing';
import { CometController } from '@/apis/comet';
import { ConfigModule } from '@/config';
import { CometService } from '@/services/comet';

describe('CometController', () => {
  let appController: CometController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [CometController],
      providers: [CometService],
    }).compile();

    appController = app.get<CometController>(CometController);
  });

  describe('comet', () => {
    it('should return "0x3afdc9bca9213a35503b077a6072f3d0d5ab0840"', async () => {
      const comet = await appController.getCometData(
        '0x3afdc9bca9213a35503b077a6072f3d0d5ab0840',
      );
      expect(comet.address).toBe('0x3afdc9bca9213a35503b077a6072f3d0d5ab0840');
    });
  });
});
