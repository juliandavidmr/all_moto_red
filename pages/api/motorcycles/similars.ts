import { normalizeJSON } from "../../../utils/stringify";
import { getPopularMotorcycles } from "../../../lib/db/motorcycle";

export default async (req, res) => {
	const motorcycles = await getPopularMotorcycles();
	res.status(200).json({ data: normalizeJSON(motorcycles) })
}
