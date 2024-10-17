import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb"
import { getUserTeamDetails } from "@/lib/lucia"
import { GameEventsModel } from "@/module/GameEvents"
import { UserModel } from "@/module/Users"
import Link from "next/link"
import { redirect } from "next/navigation"
import { MdArrowBackIosNew } from "react-icons/md"
import { OrderCreate } from "./_components/OrderCreate"

export default async function OrderPage({
  params,
}: {
  params: { eventId: string }
}) {
  const eventDetails = await GameEventsModel.getGameEventDetails(params.eventId);
  const userDetails = await getUserTeamDetails()
  
  if (!eventDetails || !userDetails) {
    return redirect('/')
  }
  const user = UserModel.groupUserTeamWithMembers(userDetails)

  return (
    <>
      <section className="ml-6 mb-6">
        <Breadcrumb className="hidden md:flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/${params.eventId}`} className="flex items-center"><MdArrowBackIosNew className="mr-2" /> Back</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>
      <section className="ml-6 mb-6">
        <div className="text-2xl font-black">Order</div>
      </section>
      <OrderCreate 
        eventDetails={eventDetails}
        user={user}
      />
    </>
  )
}