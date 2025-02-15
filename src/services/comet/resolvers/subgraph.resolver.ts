import { gql, request } from 'graphql-request';
import { CometGraphQLResponse } from './network';


const query = gql`
  query getCometData($id: String!) {
    comet(id: $id) {
      supplyRate
      borrowRate
    }
  }
`;

export async function fetchSubgraphData(addressCometProxy: string, subgraphUrl: string): Promise<CometGraphQLResponse> {
    return await request<CometGraphQLResponse>(subgraphUrl, query, { id: addressCometProxy });
}
