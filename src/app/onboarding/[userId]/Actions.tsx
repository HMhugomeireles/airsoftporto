import { prisma } from "@/lib/prisma";

export async function getUserInformation(userId: string) {
  return await prisma.user.findUnique({
    where: {
      id: userId
    }
  })
}
