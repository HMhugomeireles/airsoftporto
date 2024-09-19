import { LoginForm } from "./LoginForm";
import { GoogleAuth } from "./providers/GoogleAuth";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import Image from "next/image";
import { FacebookAuth } from "./providers/FacebookAuth";
import { RegisterForm } from "./RegisterForm";

export default function AuthPage() {

  return (
    <section className="flex w-full justify-center">

      <section className="max-w-md flex flex-col justify-center">
        <div className="hidden md:flex md:justify-center text-white font-extrabold mb-10">
          <div className="flex items-center">
            <Image className="h-14 w-14" width={50} height={50} src="/cap_logo.png" alt="logo Cap" />
            <h1 className="ml-2 text-xl uppercase">Clube Airsoft Porto</h1>
          </div>
        </div>
        <section className="flex flex-col justify-center">
          <GoogleAuth />
          <FacebookAuth />
        </section>

        <section className="w-full flex items-center justify-center gap-2 my-8">
          <span className="border-b border-gray-300 w-full"></span>
          <span className="flex-none uppercase text-xs">Or sign in with your email</span>
          <span className="border-b border-gray-300 w-full"></span>
        </section>

        <section className="">
          <Tabs defaultValue="login">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="account-creation">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <LoginForm />
            </TabsContent>
            <TabsContent value="account-creation">
              <RegisterForm />
            </TabsContent>
          </Tabs>
        </section>
      </section>

    </section>
  )
}