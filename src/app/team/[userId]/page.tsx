//import { getUserInformation } from "./Actions";

import { UserModel } from "@/module/Users";
import { redirect, RedirectType } from "next/navigation";

export default async function ProfilePage({
  params,
}: {
  params: { userId: string }
}) {
  const user = await UserModel.getUserTeam(params.userId)

  if (!user) {
    return redirect('/', RedirectType.push);
  }

  return (
    <section className="container">
      {!Boolean(user.TeamMember.length) && (
        <>
          <section>Create Team</section>
          <section>Join Team</section>
        </>
      ) }
      {Boolean(user.TeamMember.length) && (
        <>
          team name
          
        </>
      ) }   
    </section>
  )
}