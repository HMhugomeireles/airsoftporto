import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "./WizardForm";


export function UserActivateAccountForm() {
  const { control } = useFormContext<z.infer<typeof formSchema>>();

  return (
    <>
      <CardHeader>
        <CardTitle>User information</CardTitle>
        <CardDescription>
          {"Complete the your profile."}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <FormField
          control={control}
          name="apdName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>APD name*</FormLabel>
              <FormControl>
                <Input placeholder="Enter your value" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="apdNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>APD number*</FormLabel>
              <FormControl>
                <Input placeholder="Enter your value" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="nif"
          render={({ field }) => (
            <FormItem>
              <FormLabel>NIF*</FormLabel>
              <FormControl>
                <Input placeholder="Enter your value" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="nick"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nick</FormLabel>
              <FormControl>
                <Input placeholder="Enter your value" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </>
  )
}