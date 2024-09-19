'use client'

import { Button } from "@/components/ui/button";
import { Card, CardFooter } from "@/components/ui/card";
import { validateNIF } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { TeamAssociateForm } from "./TeamAssociateForm";
import { UserActivateAccountForm } from "./UserActivateAccountForm";


export const formSchema = z.object({
  apdName: z.string({
    required_error: "Value is required."
  }).min(1),
  apdNumber: z.string({
    required_error: "Value is required."
  }).min(1),
  nif: z.string({
    required_error: "Value is required."
  }).refine((value) => validateNIF(value), { message: "The value need to be nif valid." }),
  nick: z.string().optional(),
  team: z.object({
    needCreate: z.boolean().default(false),
    name: z.string(),
  }).optional()
})


export function WizardForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  })
  const { formState: { isValid, isSubmitted, errors } } = form
  const [step, setStep] = useState(0);

  const nextStep = () => {
    if (form.formState.isValid) {
      return setStep((prev) => prev + 1);
    }
  }
  const prevStep = () => setStep((prev) => prev - 1);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  useEffect(() => {
    console.log("Is Valid:", isValid);
    console.log("Is Submitted:", isSubmitted);
    console.log("Errors:", errors);
  }, [isValid, isSubmitted, errors]);

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          {step === 0 && <UserActivateAccountForm />}
          {/* {step === 1 && <UserRegisterGunsForm />} */}
          {step === 1 && <TeamAssociateForm />}

          <CardFooter className="flex justify-between">
            {step < 1 && <div className="w-full flex justify-end"><Button type="button" onClick={nextStep}>Next</Button></div>}
            {step > 0 && <Button type="button" onClick={prevStep}>Previous</Button>}
            {step === 1 && <Button type="submit">Submit</Button>}
          </CardFooter>
        </Card>
      </form>
    </FormProvider>
  )
}