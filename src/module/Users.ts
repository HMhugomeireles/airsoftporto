import { prisma } from "@/lib/prisma";
import { UserType, UserWithTeamType } from "./type";

export async function getUserInformation(userId: string) {
  return await prisma.user.findUnique({
    where: {
      id: userId
    }
  })
}


async function getUserTeam(userId: string): Promise<UserWithTeamType | null> {
  return await prisma.user.findUnique({
    where: {
      id: userId
    },
    include: {
      TeamMember: true
    }
  })
}


async function getAllUsers(): Promise<UserType[]> {
  return await prisma.user.findMany()
}

export const UserModel = {
  getUserTeam,
  getAllUsers
}