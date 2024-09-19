// import { getUserInformation } from "./Actions";

export default async function ProfilePage({
  params,
}: {
  params: { userId: string }
}) {
  //const user = await getUserInformation(params.userId)

  // if (!user || user.active) {
  //   return redirect('/', RedirectType.push);
  // }

  return (
    <section className="flex w-full justify-center">
      <section className="max-w-md w-full flex flex-col justify-center">
        Profile Page
      </section>
    </section>
  )
}