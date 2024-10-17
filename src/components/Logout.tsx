'use client'

import { logOut } from "@/app/auth/Actions"
import { GrLogout } from "react-icons/gr"

export function Logout() {
  return (
    <GrLogout className="w-5 h-5 cursor-pointer" onClick={() => logOut()} />
  )
}