import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library.js";
import { MemberTypeId } from "../../member-types/schemas.js";

type DbType = PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;

type MutationsArgs<O> = {
  dto: O;
  id: string;
};

type CreateUserInputArgs = {
  name: string; 
  balance: number;
};

type CreatePostInputArgs = {
  title: string;
  content: string;
  authorId: string;
};

type CreateProfileInputArgs = {
  userId: string,
  memberTypeId: MemberTypeId,
  isMale: boolean,
  yearOfBirth: number
};

type SubsManageArgs = {
  authorId: string;
  userId: string;
};

export type { DbType, MutationsArgs, CreateUserInputArgs, CreatePostInputArgs, CreateProfileInputArgs, SubsManageArgs }