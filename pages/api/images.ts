import { NextApiRequest, NextApiResponse } from "next";
import got from 'got';

const PATH_BASE = 'https://raw.githubusercontent.com/juliandavidmr/all_moto_red/files/files/';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const name: string = decodeURIComponent(req.body?.name || req.query?.name);

  const response: { images: string[] } = {
    images: []
  };

  try {
    if (typeof name === 'string' && name.length) {
      const body = await got(PATH_BASE + name + '/config.json', {
        responseType: 'json'
      }).json<{ images: string[] }>();
  
      if (Array.isArray(body.images)) {
        response.images = body.images.map(image =>
          PATH_BASE + encodeURIComponent(name) + '/' + image
        );
      }
    }
  } catch (error) {
    console.error(error);
  }

  return res.status(200).json(response);
}
