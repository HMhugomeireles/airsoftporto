'use client'

import { Button } from "@/components/ui/button"
import { FcGoogle } from "react-icons/fc";
import { getGoogleConsentUrl } from "../Actions";
import { useToast } from "@/components/ui/use-toast"

export function GoogleAuth() {
  const { toast } = useToast()

  return (
    <Button
      onClick={async () => {
        const { url } = await getGoogleConsentUrl();
        if (!url) {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
          })
          return;
        }
        window.location.href = url;
      }}
      variant="secondary"
      className="text-white w-full my-2"
    >
      <FcGoogle className="text-3xl mr-6" /> Continue with Google
    </Button>
  )
}