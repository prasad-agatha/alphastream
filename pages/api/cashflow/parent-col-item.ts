import csv from 'csvtojson';
import {NextApiRequest, NextApiResponse} from 'next';
// constants
import {parent_col_item} from 'lib/constants/cashflow_parsed_data';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const jsonArray = await csv().fromString(parent_col_item);
  res.end(JSON.stringify(jsonArray));
}
