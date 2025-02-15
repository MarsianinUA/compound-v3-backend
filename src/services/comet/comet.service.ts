import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CometData } from '@/entities/comet';
import BigNumber from 'bignumber.js';
import { CometGraphQLResponse, fetchSubgraphData } from './resolvers';
import { AprData } from './comet.interface';
import { SECONDS_PER_YEAR, PERCENTS_PRECISION } from '@/constants';

@Injectable()
export class CometService {
  constructor(private readonly config: ConfigService) {}
  private readonly logger = new Logger(CometService.name);
  private readonly secondsPerYear = new BigNumber(SECONDS_PER_YEAR);

  private calculateApr(subgraphData: CometGraphQLResponse): AprData {
    const supplyRate = new BigNumber(subgraphData.comet.supplyRate);
    const borrowRate = new BigNumber(subgraphData.comet.borrowRate);
    const supplyApr: string = supplyRate
      .div(new BigNumber(1e18))
      .times(this.secondsPerYear)
      .times(100)
      .toFixed(PERCENTS_PRECISION);
    const borrowApr: string = borrowRate
      .div(new BigNumber(1e18))
      .times(this.secondsPerYear)
      .times(100)
      .toFixed(PERCENTS_PRECISION);
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
        supplyApr: cometData.supplyApr,
        borrowApr: cometData.borrowApr,
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
