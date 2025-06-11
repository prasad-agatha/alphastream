import csv from 'csvtojson';
import {NextApiRequest, NextApiResponse} from 'next';
// constants
import {parsed_data} from 'lib/constants/cashflow_parsed_data';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const jsonArray = await csv().fromString(parsed_data);
  res.end(JSON.stringify(jsonArray));
}
