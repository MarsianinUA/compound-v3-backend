import { CometGraphQLResponse } from './resolvers.interface';

const query = `
  query getCometData($id: String!) {
    comet(id: $id) {
      supplyRate
      borrowRate
    }
  }
`;

export async function fetchSubgraphData(
  addressCometProxy: string,
  subgraphUrl: string,
): Promise<CometGraphQLResponse> {
  const response = await fetch(subgraphUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: { id: addressCometProxy },
    }),
  });

  const data = await response.json();
  return data.data as CometGraphQLResponse;
}
