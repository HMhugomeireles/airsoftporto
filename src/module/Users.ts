import { prisma } from "@/lib/prisma";
import { GroupUserTeamWithMembersType, TeamMemberWithUser, UserType, UserWithTeamMembers, UserWithTeamType } from "./type";

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


function groupUserTeamWithMembers(user: UserWithTeamMembers): GroupUserTeamWithMembersType {
  const { TeamMember, ...userDetails  } = user;
  let members: TeamMemberWithUser[] | [] = []
  let team = undefined
  user.TeamMember.map(item => {
    if (item.Team) {
      team = {
        id: item.Team?.id,
        name: item.Team?.name
      }
      members = item.Team.members.filter(member => member.player.id !== user.id)
    }
  })

  return {
    ...userDetails,
    team,
    members
  }
}

export const UserModel = {
  getUserTeam,
  getAllUsers,
  groupUserTeamWithMembers
}