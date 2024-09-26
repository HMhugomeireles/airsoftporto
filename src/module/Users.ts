import { prisma } from "@/lib/prisma";

export async function getUserInformation(userId: string) {
  return await prisma.user.findUnique({
    where: {
      id: userId
    }
  })
}


async function getUserTeam(userId: string) {
  return await prisma.user.findUnique({
    where: {
      id: userId
    },
    select: {
      TeamPlayer: true
    }
  })
}


async function getAllUsers() {
  return await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      picture: true,
      block: true,
      partner: true,
      role: true,
      permissions: true,
      active: true,
    }
  })
}

export const UserModel = {
  getUserTeam,
  getAllUsers
}