import {NextApiRequest, NextApiResponse} from 'next';
import data from 'lib/constants/tables.json';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
}
