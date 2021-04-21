import { useRouter } from "next/router";

export default function Detail(params) {
	const router = useRouter()
	const { name } = router.query;

	return <div>
		{ name }
	</div>
}