import { Motorcycle, MotorcycleBrand, MotorcycleLinks, MotorcycleType } from ".prisma/client";
import prisma from "./prisma";

export type MotorcyclePopulated =  Motorcycle & {
	motorcycleLinks: MotorcycleLinks[],
	motorcycleType: MotorcycleType,
	motorcycleBrand: MotorcycleBrand
};

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

export function getPopularMotorcycles(args?: { take?: number }) {
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
		take: args?.take || 20,
	});
}

export function updateViewCount(motorcycleId: string) {
	if (process.env.NODE_ENV === 'development') {
		return Promise.resolve(true);
	}

	return prisma.motorcycle.update({
		where: {
			id: motorcycleId,
		},
		data: {
			viewCount: {
				increment: 1,
			}
		}
	});
}


export function getMotorcycleNames() {
	return prisma.motorcycle.findMany({
		select: {
			name: true
		},
		where: {
			active: true,
			published: true,
		}
	});
}