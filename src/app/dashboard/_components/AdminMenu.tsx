import { getUserAuthorization } from "@/lib/lucia";
import Link from "next/link";
import { MdOutlineDoubleArrow } from "react-icons/md";

export async function AdminMenu() {
  const user = await getUserAuthorization()

  if (!user || !user.hasAdminPrecision) {
    return <></>
  }

  return (
    <div className="hidden lg:block py-4 select-none bg-muted/70 relative mb-2">
      <div className="absolute -top-7 left-4 p-2 font-bold uppercase text-xs flex items-center"><MdOutlineDoubleArrow className="mr-1 text-lg" /> Admin menu</div>
      <div className="container flex">
        <div className="px-6">
          {/* <Link className="mr-10" href={`/dashboard`}>Dashboard</Link> */}
          <Link className="mr-10" href="/dashboard/event">Event</Link>
          <Link className="mr-10" href={`/dashboard/users`}>Users</Link>
        </div>
      </div>
    </div>
  )
}