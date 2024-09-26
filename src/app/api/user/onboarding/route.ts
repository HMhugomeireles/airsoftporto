import { onboardingFormSchema } from "@/app/onboarding/[userId]/forms/WizardForm";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";
import { z } from "zod";


export async function POST(request: Request) {
  const body: z.infer<typeof onboardingFormSchema> = await request.json();

  try {

    const userActivation = await prisma.user.update({
      where: {
        id: body.userId
      },
      data: {
        active: true,
        apdName: body.apdName,
        apdNumber: Number(body.apdNumber),
        nick: body.nick,
      }
    })
    console.log(body)

    return redirect("/")
  } catch (error) {
    console.error(error)
    return NextResponse.json({})
  }
}