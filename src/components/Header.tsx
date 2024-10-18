import { Button } from "@/components/ui/button";
import { getUserAuthorization } from "@/lib/lucia";
import { getWordFirstLatter } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { CgDanger } from "react-icons/cg";
import { Logout } from "./Logout";
import { Menu, MenuButton, MenuProvider } from "./Menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export async function Header() {
  const user = await getUserAuthorization()

  return (
    <MenuProvider>
      <header className="bg-[#00000090] z-10">
        <div className="lg:container">
          <div className="lg:max-w-full p-4">
            <div className="relative flex items-center justify-between">
              <div className="flex flex-1 items-center justify-between sm:items-stretch sm:justify-between">
                <div className="absolute inset-y-0 right-0 flex items-center lg:hidden">
                  <MenuButton />
                </div>
                <Link href={`/`}>
                  <div className="flex flex-shrink-0 items-center">
                    <div className="flex items-center text-white font-extrabold">
                      <Image className="h-14 w-14" width={50} height={50} src="/cap_logo.png" alt="logo cap" />
                      <div className="ml-2 text-sm uppercase">
                        <div>Club</div>
                        <div>Airsoft</div>
                        <div>Porto</div>
                      </div>
                    </div>
                  </div>
                </Link>
                <div className="hidden lg:flex lg:items-center lg:ml-6">
                  <div className="flex space-x-4 items-center">
                    {user ? (
                      <>
                        {!user.active && (
                          <Link href={`/onboarding/${user.id}`}>
                            <Button className="bg-yellow-600 hover:bg-yellow-700"><CgDanger className="text-2xl mr-2" /> Activate account</Button>
                          </Link>
                        )}
                        <>
                          <Link href={`/profile/${user.id}`}>
                            <Avatar>
                              <AvatarImage src={user.picture!} />
                              <AvatarFallback>{getWordFirstLatter(user.firstName!)}{getWordFirstLatter(user.lastName!)}</AvatarFallback>
                            </Avatar>
                          </Link>
                          <Logout />
                        </>
                      </>
                    ) : (
                      <Link href="/auth"><Button variant="link">Login</Button></Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Menu user={user} />
        </div>
      </header>
      {user && (
        <div className="hidden lg:block py-4 bg-muted/50 select-none">
          <div className="container flex">
            <div className="px-6">
              <Link className="mr-10" href={`/`}>Home</Link>
              {/* <Link className="mr-10" href={`/profile/${user?.id}`}>Profile</Link> */}
              <Link className="mr-10" href={`/team/${user?.id}`}>Team</Link>
              {user.hasAdminPrecision && (
                <>
                  <Link className="mr-10" href={`/dashboard`}>Dashboard</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </MenuProvider>
  )
}