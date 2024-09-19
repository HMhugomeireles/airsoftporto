import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFieldArray, useFormContext } from "react-hook-form"
import { formSchema } from "./WizardForm";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { generateId } from "lucia";

export function UserRegisterGunsForm() {
  const { control } = useFormContext<z.infer<typeof formSchema>>();
  const { fields, append, remove } = useFieldArray({
    name: 'guns',
    control
  })

  return (
    <>
      <CardHeader>
        <CardTitle>Gun registry</CardTitle>
        <CardDescription>
          {"All players need register one gun to be possible participate in event. This is for make possible to register the crony of the guns"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        {fields.map((field, index) => (
          <section key={field.id}>
            <div></div>
            <FormField
              control={control}
              name={`guns.${index}.name`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gun name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your value" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div></div>
          </section>
        ))}
        <div className="flex justify-end">
          <Button
            variant="secondary"
            className="mt-2"
            onClick={() => append({ id: generateId(20), name: '' })}
          ><Plus className="w-4 h-4 mr-4" /> Add other gun</Button>
        </div>
      </CardContent>
    </>
  )
}