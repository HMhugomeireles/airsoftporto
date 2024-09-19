import { Button } from "@/components/ui/button";
import { getUser } from "@/lib/lucia";
import { getWordFirstLatter } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { CgDanger } from "react-icons/cg";
import { Menu, MenuButton, MenuProvider } from "./Menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";


export async function Header() {
  const user = await getUser()

  return (
    <MenuProvider>
      <header className="lg:bg-[#00000090] z-10">
        <div className="lg:container">
          <div className="lg:max-w-full p-4">
            <div className="relative flex items-center justify-between">
              <div className="flex flex-1 items-center justify-between sm:items-stretch sm:justify-between">
                <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
                  <MenuButton />
                </div>
                <div className="flex flex-shrink-0 items-center">
                  <div className="flex items-center text-white font-extrabold">
                    <Image className="h-14 w-14" width={50} height={50} src="/cap_logo.png" alt="logo 6mmm" />
                    <div className="ml-2 text-sm uppercase">
                      <div>Club</div>
                      <div>Airsoft</div>
                      <div>Porto</div>
                    </div>
                  </div>
                </div>
                <div className="hidden sm:flex sm:items-center sm:ml-6">
                  <div className="flex space-x-4 items-center">
                    <div className="hidden sm:flex sm:items-center sm:ml-6">
                      <div className="flex space-x-4 items-center">
                        <Link href="/team" className="rounded-md px-3 py-2 text-sm font-extrabold uppercase text-gray-300 hover:bg-gray-700 hover:text-white">Team</Link>
                      </div>
                    </div>
                    {user ? (
                      <>
                        {!user.active && (
                          <Link href={`/onboarding/${user.id}`}>
                            <Button className="bg-yellow-600 hover:bg-yellow-700"><CgDanger className="text-2xl mr-2" /> Activate account</Button>
                          </Link>
                        )}
                        <Link href={`/profile/${user.id}`}>
                          <Avatar>
                            <AvatarImage src={user.picture!} />
                            <AvatarFallback>{getWordFirstLatter(user.firstName!)}{getWordFirstLatter(user.lastName!)}</AvatarFallback>
                          </Avatar>
                        </Link>
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
        <div className="hidden md:block py-4 bg-muted/50">
          <div className="container flex ">
            <Link className="mr-10" href={`/profile/${user?.id}`}>Profile</Link>
            <Link className="mr-10" href={`/team/${user?.id}`}>Team</Link>
            <Link className="mr-10" href={`/dashboard`}>Dashboard</Link>
          </div>
        </div>
      )}
    </MenuProvider>
  )
}