import prisma from "../prisma";

export async function fetchAllZones() {
  return prisma.zones.findMany();
}

export async function fetchWardsByZone(zoneId: number) {
  return prisma.wards.findMany({
    where: { zoneid: zoneId }
  });
}

export async function fetchPrabhagsByWard(wardId: number) {
  return prisma.prabhags.findMany({
    where: { wardid: wardId }
  });
}
