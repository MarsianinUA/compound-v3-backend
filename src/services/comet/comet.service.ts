import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CometData } from '@/entities/comet';
import { fetchSubgraphData } from './resolvers/subgraph.resolver';
import BigNumber from 'bignumber.js';
import { CometGraphQLResponse } from './resolvers/resolvers.interface';
import { aprData } from './comet.interface';

@Injectable()
export class CometService {
  constructor(private readonly config: ConfigService) {}
  private readonly logger = new Logger(CometService.name);

  private calculateApr(subgraphData: CometGraphQLResponse): aprData {
    const secondsPerYear = new BigNumber(60 * 60 * 24 * 365);
    const supplyRate = new BigNumber(subgraphData.comet.supplyRate);
    const borrowRate = new BigNumber(subgraphData.comet.borrowRate);
    const supplyApr: string = supplyRate
      .div(new BigNumber(1e18))
      .times(secondsPerYear)
      .times(100)
      .toFixed();
    const borrowApr: string = borrowRate
      .div(new BigNumber(1e18))
      .times(secondsPerYear)
      .times(100)
      .toFixed();
    return {
      supplyApr: supplyApr,
      borrowApr: borrowApr,
    };
  }

  private async fetchCometData(cometProxyAddress: string): Promise<CometData> {
    try {
      const subgraphData = await fetchSubgraphData(
        cometProxyAddress,
        this.config.getOrThrow('subgraphUrl'),
      );
      const cometData = this.calculateApr(subgraphData);

      return {
        address: cometProxyAddress,
        SupplyAPR: cometData.supplyApr,
        BorrowAPR: cometData.borrowApr,
      };
    } catch (error) {
      const message = `Error fetching token data: ${error.message}`;
      this.logger.error(message);
      throw new Error(message);
    }
  }

  public getCometData(cometProxyAddress: string): Promise<CometData> {
    if (!cometProxyAddress) {
      throw new Error(`Missing token address`);
    }
    return this.fetchCometData(cometProxyAddress);
  }
}
