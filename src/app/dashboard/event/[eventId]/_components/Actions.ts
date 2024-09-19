'use server'

import { revalidatePath } from "next/cache";
import { z } from "zod";

const schema = z.object({
  eventId: z.string().min(1),
  entryPlayerId: z.string().min(1),
  cronoMeasure: z.string().min(1),
  bbWeight: z.string().min(1),
})

export async function updateUserCrono(
  prevState: any,
  formData: FormData,
) {
  const parse = schema.safeParse({
    eventId: formData.get("eventId"),
    entryPlayerId: formData.get("entryPlayerId"),
    cronoMeasure: formData.get("cronoMeasure"),
    bbWeight: formData.get("bbWeight"),
  });

  try {
    console.log("data parse", parse.data)


    revalidatePath(`/dashboard/event/${parse.data?.eventId}`);
    return {
      status: 200, 
      message: `The crono measurement is register.` 
    };
  } catch (e) {
    return { 
      status: 500,
      message: "Failed to register crono measurement." 
    };
  }
}