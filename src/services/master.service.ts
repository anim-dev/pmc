import prisma from "../prisma";

export async function getMasterData(types: string[]) {
  const result: Record<string, any[]> = {};

  const configs = await prisma.master_table_map.findMany({
    where: { code: { in: types }, isactive: true }
  });

  for (const type of types) {
    const config:any = configs.find((cfg:any) => cfg.code === type);
    if (config) {
      // Type assertion below
      const data = await prisma.$queryRawUnsafe<any[]>(`SELECT * FROM ${config.tablename}`);
      result[type] = data;
    } else {
      result[type] = [];
    }
  }
  return result;
}
