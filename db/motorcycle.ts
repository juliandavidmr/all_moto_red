import prisma from "./prisma";

export function getMotorcycleByName(motorcycleName: string) {
	return prisma.motorcycle.findFirst({
		where: {
			name: motorcycleName,
			active: true
		},
		include: {
			motorcycleLinks: true,
			motorcycleType: true,
			motorcycleBrand: true
		},
	});
}

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

export function getMotorcycleNames() {
	return prisma.motorcycle.findMany({
		select: {
			name: true
		},
		where: {
			active: true
		}
	});
}