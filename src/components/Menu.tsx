'use client'

import { User } from "@/lib/lucia";
import { getWordFirstLatter } from "@/lib/utils";
import Link from "next/link";
import { createContext, ReactNode, useContext, useState } from "react";
import { CgDanger } from "react-icons/cg";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

type MenuProps = {
  user?: User | null
}

export function Menu({ user }: MenuProps) {
  const { isOpen, toggle } = useToggleMenuContext();

  console.log(user)
  return (
    <>
      {isOpen && (
        <div className="lg:hidden p-4 bg-muted/50" id="mobile-menu">
          <div className="space-y-2 px-2 pb-3 pt-2 flex justify-center">
            {user ? (
              <div className="relative" onClick={toggle}>
                <Link href={`/profile/${user.id}`}>
                  <div className="flex items-center mb-4">
                    <Avatar>
                      <AvatarImage src={user.picture!} />
                      <AvatarFallback>{getWordFirstLatter(user.firstName!)}{getWordFirstLatter(user.lastName!)}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4">
                      <p className="text-xl font-bold">{user.firstName} {user.firstName}</p>
                      <p className="text-gray-500 text-sm mb-2">{user.email}</p>
                      {!user.active && (
                        <Link className="" href={`/onboarding/${user.id}`}>
                          <Badge className="bg-yellow-600 hover:bg-yellow-700"><CgDanger className="text-xl mr-2" /> Activate account</Badge>
                        </Link>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            ) : (
              <Link href="/auth"><Button className="w-full text-center" variant="link" onClick={toggle}>Login</Button></Link>
            )}
          </div>
          <div>
            {Boolean(user?.id) && (
              <>
                <div className="mb-6">
                  <p className="text-xs font-semibold">MENU</p>
                  <Separator />
                </div>
                <Link onClick={toggle} href="/team" className="block rounded-md px-3 py-2 text-base font-extrabold uppercase text-gray-300 hover:bg-gray-700 hover:text-white">Team</Link>
              </>
            )}
            {user?.hasAdminPrecision && (
              <>
                <div className="my-6">
                  <p className="text-xs font-semibold">ADMIN MENU</p>
                  <Separator />
                </div>
                <Link onClick={toggle} href="/dashboard" className="block rounded-md px-3 py-2 text-base font-extrabold uppercase text-gray-300 hover:bg-gray-700 hover:text-white">Dashboard</Link>
                <Link onClick={toggle} href="/dashboard/event" className="block rounded-md px-3 py-2 text-base font-extrabold uppercase text-gray-300 hover:bg-gray-700 hover:text-white">Event</Link>
                <Link onClick={toggle} href="/dashboard/users" className="block rounded-md px-3 py-2 text-base font-extrabold uppercase text-gray-300 hover:bg-gray-700 hover:text-white">Users</Link>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export function MenuButton() {
  const { toggle } = useToggleMenuContext();
  return (
    <Button onClick={toggle} variant="link" className="relative inline-flex items-center justify-center select-none rounded-md p-2 opacity-85 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
      <span className="absolute -inset-0.5"></span>
      <span className="sr-only">Open main menu</span>

      <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>

      <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </Button>
  )
}

interface ToggleContextType {
  isOpen: boolean;
  toggle: () => void;
}

const ToggleContext = createContext<ToggleContextType | undefined>(undefined);

// Create a custom hook for accessing the context
export const useToggleMenuContext = () => {
  const context = useContext(ToggleContext);
  if (!context) {
    throw new Error("useToggleContext must be used within a ToggleProvider");
  }
  return context;
};

// Create a Provider component
interface ToggleProviderProps {
  children: ReactNode;
}

export const MenuProvider: React.FC<ToggleProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(prev => !prev);

  return (
    <ToggleContext.Provider value={{ isOpen, toggle }}>
      {children}
    </ToggleContext.Provider>
  );
};