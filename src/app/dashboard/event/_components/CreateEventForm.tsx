'use client'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { zodResolver } from "@hookform/resolvers/zod"
import { PlusCircle } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"
import { FormProvider, useFieldArray, useForm } from "react-hook-form"
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md"
import { z } from "zod"
import { AddTeam, TeamData } from "./add-team"

export const formSchema = z.object({
  eventName: z.string().min(1),
  eventDate: z.date(),
  location: z.object({
    street: z.string(),
    directions: z.string()
  }),
  duration: z.string(),
  openDoors: z.string(),
  startGame: z.string(),
  description: z.string().optional(),
  teamGap: z.string(),
  teams: z.array(z.object({
    teamName: z.string(),
    teamItems: z.array(z.string()),
    maxTeamPlayers: z.number(),
    color: z.number()
  })),
  ticketPrices: z.array(z.object({
    type: z.enum(['partner', 'user']),
    amount: z.number()
  })),
  gameGoals: z.array(z.string()),
  rules: z.array(z.string())
})

export function CreateEventForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: {
        street: 'Avecar CQB City - Maia',
        directions: 'https://maps.app.goo.gl/uPkW2rBwapriE3ZU6',
      },
      duration: '4',
      teams: [
        {
          maxTeamPlayers: 99,
          teamItems: ['calças camufladas', 'camisola camufladas', 'Ghillie suits'],
          teamName: 'Camuflados'
        },
        {
          maxTeamPlayers: 99,
          teamItems: ['calças lisas', 'camisola lisas'],
          teamName: 'Contractors'
        },
      ],
      gameGoals: [
        'Pegar nos bidões um de cada vez e trazer para sua base.'
      ],
      rules: [],
      ticketPrices: []
    },
  })
  const teamsFields = useFieldArray({
    name: 'teams',
    control: form.control
  })
  const ticketPrices = useFieldArray({
    name: 'ticketPrices',
    control: form.control
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  useEffect(() => {
    console.log("Is Valid:", form.formState.errors);
  }, [form.formState]);

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <section className="grid flex-1 items-start gap-4 p-4">
          <div className="mx-auto md:grid lg:max-w-[59rem] lg:flex-1 auto-rows-max gap-4">
            <div className="flex items-center gap-4">
              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                Event creation
              </h1>
              <div className="hidden items-center gap-2 md:ml-auto md:flex">
                <Link href="/dashboard">
                  <Button variant="outline" size="sm">
                    Discard
                  </Button>
                </Link>
                <Button type="submit" size="sm">Save Event</Button>
              </div>
            </div>
            <div className="grid gap-4 lg:grid-cols-3 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8 mb-10">
                <Card x-chunk="dashboard-07-chunk-0">
                  <CardHeader>
                    <CardTitle>Event Details</CardTitle>
                    <CardDescription>
                      Insert all event information.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <FormField
                          control={form.control}
                          name="eventName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Event name*</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your value" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid gap-3">
                        <FormField
                          control={form.control}
                          name="eventDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Event Date*</FormLabel>
                              <FormControl>
                                <Calendar
                                  mode="single"
                                  fromDate={new Date()}
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  {...field}
                                  className="max-w-fit rounded-md border"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid gap-3">
                        <FormField
                          control={form.control}
                          name="location.street"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Street*</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your value" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid gap-3">
                        <FormField
                          control={form.control}
                          name="location.directions"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Direction*</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your value" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid gap-3">
                        <FormField
                          control={form.control}
                          name="duration"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Duration*</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your value" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid gap-3">
                        <FormField
                          control={form.control}
                          name="openDoors"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Open doors*</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your value" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid gap-3">
                        <FormField
                          control={form.control}
                          name="startGame"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Start game*</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your value" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid gap-3">
                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description</FormLabel>
                              <FormControl>
                                <Textarea className="min-h-32" placeholder="Enter your value" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card x-chunk="dashboard-07-chunk-1">
                  <CardHeader>
                    <CardTitle>Teams</CardTitle>
                    <CardDescription>
                      Define the number of teams this event will have.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <FormField
                          control={form.control}
                          name="teamGap"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Team gap</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter your value" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <FormLabel className="mt-4">Game teams</FormLabel>
                        {teamsFields.fields.map((field, index) => (
                          <Card key={field.id} className="my-2 p-0">
                            <CardContent className="p-4">
                              <div className=" flex justify-between">
                                <div>
                                  <div className="text-xs font-bold">Team name</div>
                                  <div className="font-light">{field.teamName}</div>
                                </div>
                                <div>
                                  <div className="text-xs font-bold">Max team Players:</div>
                                  <div>{field.maxTeamPlayers}</div>
                                </div>
                              </div>
                              <div className="my-4">
                                <div className="text-xs font-bold">Team items</div>
                                <div>
                                  {field.teamItems.map((item, id) => (
                                    <Badge className="m-1" key={`${field.teamName}-${item}-${id}`}>{item}</Badge>
                                  ))}
                                </div>
                              </div>
                              <div className="my-4">
                                <Select
                                  onValueChange={(value) => field.onChange(value)}
                                  defaultValue={field.value}
                                  {...field}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select option" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="32134234-asds3-4a">Avecar CQB City - Maia </SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </CardContent>
                            <CardFooter className="border-t p-2 flex justify-evenly">
                              <Button variant="outline"><MdDeleteOutline /></Button>
                              <Button variant="outline"><MdOutlineEdit /></Button>
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="justify-center border-t p-4">
                    <Dialog>
                      <DialogTrigger>
                        <Button size="sm" variant="ghost" className="gap-1">
                          <PlusCircle className="h-3.5 w-3.5" />
                          Add Team
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Are you absolutely sure?</DialogTitle>
                          <DialogDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                          </DialogDescription>
                        </DialogHeader>
                        <AddTeam
                          onAddTeam={function (data: TeamData) {
                            teamsFields.append({
                              maxTeamPlayers: Number(data.maxTeamPlayers),
                              teamItems: data.teamItems,
                              teamName: data.teamName
                            })
                          }
                          }
                        >
                          <DialogClose className="w-full">
                            <Button className="w-full">Add</Button>
                          </DialogClose>
                        </AddTeam>
                      </DialogContent>
                    </Dialog>
                  </CardFooter>
                </Card>

              </div>
              <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                <Card x-chunk="dashboard-07-chunk-2">
                  <CardHeader>
                    <CardTitle>Game goals</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul>
                      {form.formState.defaultValues?.gameGoals?.map((goal, index) => (
                        <li key={`${goal}-${index}`}>{goal}</li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="justify-center border-t p-4">
                    <Dialog>
                      <DialogTrigger>
                        <Button size="sm" variant="ghost" className="gap-1">
                          <PlusCircle className="h-3.5 w-3.5" />
                          Add Game Gaol
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Are you absolutely sure?</DialogTitle>
                          <DialogDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  </CardFooter>
                </Card>

                <Card x-chunk="dashboard-07-chunk-2">
                  <CardHeader>
                    <CardTitle>Game Rules</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul>
                      {form.formState.defaultValues?.rules?.map((rule, index) => (
                        <li key={`${rule}-${index}`}>{rule}</li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter className="justify-center border-t p-4">
                    <Button size="sm" variant="ghost" className="gap-1">
                      <PlusCircle className="h-3.5 w-3.5" />
                      Add Game Rule
                    </Button>
                  </CardFooter>
                </Card>

                <Card x-chunk="dashboard-07-chunk-3">
                  <CardHeader>
                    <CardTitle>Ticket Price</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Ticket Type</TableHead>
                              <TableHead>amount</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {ticketPrices.fields.map((field, index) => (
                              <TableRow key={field.id}>
                                <TableCell className="font-semibold">
                                  {field.type}
                                </TableCell>
                                <TableCell>
                                  {field.amount}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>

                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="justify-center border-t p-4">
                    <Button size="sm" variant="ghost" className="gap-1">
                      <PlusCircle className="h-3.5 w-3.5" />
                      Add Ticket Price
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 md:hidden">
              <Button variant="outline" size="sm">
                Discard
              </Button>
              <Button type="submit" size="sm">Save Event</Button>
            </div>
          </div>
        </section>

      </form>
    </FormProvider>
  )
}