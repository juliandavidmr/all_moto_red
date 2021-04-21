import prisma from "./prisma";

export function getPopularMotorcycles() {
	return prisma.motorcycle.findMany({
		where: {
			active: true
		},
		include: {
			motorcycleLinks: true,
			motorcycleType: true,
			motorcycleBrand: true
		},
		orderBy: {
			viewCount: 'asc'
		},
		take: 20
	});
}