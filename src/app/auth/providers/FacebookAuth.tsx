'use client'

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { IoLogoFacebook } from "react-icons/io";
import { getFaceBookConsentUrl } from "../Actions";

export function FacebookAuth() {
  const { toast } = useToast()

  return (
    <Button
      onClick={async () => {
        const { url } = await getFaceBookConsentUrl();
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
      <IoLogoFacebook className="text-3xl mr-6" /> Continue with Facebook
    </Button>
  )
}