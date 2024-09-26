import { getUserInformation } from "@/module/Users";
import { redirect, RedirectType } from "next/navigation";
import { WizardForm } from "./forms/WizardForm";

export default async function Onboarding({
  params,
}: {
  params: { userId: string }
}) {
  const user = await getUserInformation(params.userId)

  if (!user || user.active) {
    return redirect('/', RedirectType.push);
  }

  return (
    <section>
      <section className="flex w-full justify-center">
        <section className="max-w-md w-full flex flex-col justify-center">
          <WizardForm user={user} />
        </section>
      </section>
    </section>
  )
}