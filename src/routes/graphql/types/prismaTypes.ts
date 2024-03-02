import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library.js";

type DbType = PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;

type MutationsArgs<O> = {
  inputObj: O;
  id: string;
};

type CreateUserInputArgs = {
  name: string; 
  balance: number;
}

export type { DbType, MutationsArgs, CreateUserInputArgs }
