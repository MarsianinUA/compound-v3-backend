import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { CometService } from '@/services/comet';
import { CometGraphQLResponse } from '@/services/comet/resolvers';


describe('CometService', () => {
  let service: CometService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CometService,
        {
          provide: ConfigService,
          useValue: {
            getOrThrow: jest.fn().mockReturnValue('mockSubgraphUrl'),
          },
        },
      ],
    }).compile();

    service = module.get<CometService>(CometService);
    configService = module.get<ConfigService>(ConfigService);
  });

  describe('calculateApr', () => {
    it('should calculate APR correctly', () => {
      const subgraphData: CometGraphQLResponse = {
        comet: {
          supplyRate: '3000000000000000000', // 3e18
          borrowRate: '4000000000000000000', // 4e18
        },
      };

      const result = (service as any).calculateApr(subgraphData);

      expect(result.supplyApr).toBe('9460800000.00000');
      expect(result.borrowApr).toBe('12614400000.00000');
    });

    it('should handle zero rates correctly', () => {
      const subgraphData: CometGraphQLResponse = {
        comet: {
          supplyRate: '0',
          borrowRate: '0',
        },
      };

      const result = (service as any).calculateApr(subgraphData);

      expect(result.supplyApr).toBe('0.00000');
      expect(result.borrowApr).toBe('0.00000');
    });
  });
});
