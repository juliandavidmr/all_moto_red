import { updateViewCount } from "../../../lib/db/motorcycle";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'POST') {
		try {
			const motorcycleId: string = req.body.motorcycleId;
			await updateViewCount(motorcycleId);
			return res
				.status(200)
				.send(true);
		} catch (e) {
			return res
				.status(400)
				.send('');
		}
	} else {
		return res
			.status(400)
			.send('Should be a "POST" method');
	}
}
