import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library.js";

type DbType = PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>

export default DbType;
