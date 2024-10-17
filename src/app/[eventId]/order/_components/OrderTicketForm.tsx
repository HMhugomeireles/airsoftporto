"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { UserWithTeamMembers } from "@/module/type"
import { zodResolver } from "@hookform/resolvers/zod"
import { CircleX, Plus } from "lucide-react"
import { useEffect, useRef } from "react"
import { useFormState } from "react-dom"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"
import { onSubmitAction } from "./action"
import { formSchema } from "./formSchema"

type OrderTicketFormType = {
  user: UserWithTeamMembers
}

export function OrderTicketForm({

}: OrderTicketFormType) {
  const [state, formAction] = useFormState(onSubmitAction, {
    isValid: false,
    urlRedirect: undefined
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      defaultPlayer: {
        name: '',
        apdName: '',
        apdNumber: '',
        ticketType: "normalTicket"
      },
      extraPlayers: []
    }
  })
  const { control, register, handleSubmit } = form;
  const { fields, append, remove } = useFieldArray({
    name: 'extraPlayers',
    control
  })

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.urlRedirect) {
      window.location.href = state.urlRedirect;
    }
  }, [state])

  return (
    <Form {...form}>
      <form
        ref={formRef}
        className="space-y-8"
        action={formAction}
        onSubmit={(evt) => {
          evt.preventDefault();
          form.handleSubmit(() => {
            formAction(new FormData(formRef.current!));
          })(evt);
        }}
      >
        <section className="mb-5">
          <div>Default Player</div>
          <div className="my-2">
            <FormField
              control={form.control}
              name="defaultPlayer.name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Insert player name" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="my-2">
            <FormField
              control={form.control}
              name="defaultPlayer.apdName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>APD Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Insert APD name" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="my-2">
            <FormField
              control={form.control}
              name="defaultPlayer.apdNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>APD Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Insert APD number" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="my-2">
            <FormField
              control={form.control}
              name="defaultPlayer.ticketType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Partner of Clube Clube Airsoft Porto</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      defaultValue={field.value}
                      {...field}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent >
                        <SelectItem value="partnerTicket">Partner ticket - 3€</SelectItem>
                        <SelectItem value="normalTicket">Partner ticket - 4€</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </section>

        <Separator />

        <section>
          {fields.map((field, index) => (
            <div key={index}>
              <section className="mb-5">
                <div className="flex justify-between items-center">
                  <div className="text-blue-500">Player {index + 1}</div>
                  <div><CircleX className="text-red-500 cursor-pointer" onClick={() => remove(index)} /></div>
                </div>
                <div className="my-2">
                  <FormField
                    control={form.control}
                    name={`extraPlayers.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Insert player name" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is your public display name.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="my-2">
                  <FormField
                    control={form.control}
                    name={`extraPlayers.${index}.apdName`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>APD Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Insert APD name" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is your public display name.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="my-2">
                  <FormField
                    control={form.control}
                    name={`extraPlayers.${index}.apdNumber`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>APD number</FormLabel>
                        <FormControl>
                          <Input placeholder="Insert APD number" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is your public display name.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="my-2">
                  <FormField
                    control={form.control}
                    name={`extraPlayers.${index}.ticketType`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Partner of Clube Clube Airsoft Porto</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={(value) => field.onChange(value)}
                            defaultValue={field.value}
                            {...field}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select option" />
                            </SelectTrigger>
                            <SelectContent >
                              <SelectItem value="partnerTicket">Partner ticket - 3€</SelectItem>
                              <SelectItem value="normalTicket">Partner ticket - 4€</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormDescription>
                          This is your public display name.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </section>

              <Separator />
            </div>
          ))}
        </section>

        <section className="my-5">
          <div>You can buy ticket for you colleges</div>
          <Button
            type="button"
            className="mt-2"
            onClick={() => append({ apdName: '', apdNumber: '', name: '', ticketType: "normalTicket" })}
          ><Plus className="w-4 h-4 mr-4" /> Add player</Button>
        </section>

        <Separator />

        <section className="my-5">
          <div className="flex justify-between">
            <div>Total Price</div>
            <div className="text-right">20€</div>
          </div>
          <div className="flex justify-end mt-2">
            <Button type="submit">Go payment</Button>
          </div>
        </section>
      </form>
    </Form>
  )
}