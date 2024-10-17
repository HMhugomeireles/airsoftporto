'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { formatDate, generateToken, getWordFirstLatter } from "@/lib/utils";
import { GameEventType, GroupUserTeamWithMembersType } from "@/module/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FaBarcode } from "react-icons/fa";
import { FaHandshakeSlash } from "react-icons/fa6";
import { MdOutlinePayment } from "react-icons/md";
import { PiHandshakeFill } from "react-icons/pi";
import { z } from "zod";
import { formSchema } from "./formSchema";

type OrderCreateProps = {
  eventDetails: GameEventType;
  user: GroupUserTeamWithMembersType;
}

export function OrderCreate({
  eventDetails,
  user
}: OrderCreateProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      orderCode: `${new Date().getTime()}-${generateToken()}`,
      defaultPlayer: {
        name: '',
        apdName: '',
        apdNumber: '',
        ticketType: "normalTicket",
        squadId: ''
      },
      extraPlayers: []
    }
  })

  return (
    <Form
      {...form}
    >
      <section className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <Card
              className="sm:col-span-2 lg:col-span-4 bg-muted/20" x-chunk="dashboard-05-chunk-0"
            >
              <CardContent className="pt-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src={user.picture!} />
                      <AvatarFallback>{getWordFirstLatter(user.firstName!)}{getWordFirstLatter(user.lastName!)}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4">
                      <div className="text-xl">{user.firstName}<span className="font-bold text-2xl">{user.nick && `"${user.nick}"`}</span>{user.lastName}</div>
                      <div className="flex items-center">
                        <span className="mr-2">Partner:</span>
                        {user.partner
                          ? <div><PiHandshakeFill className="text-green-700 w-5 h-5" /></div>
                          : <div><FaHandshakeSlash className="text-red-700 w-5 h-5" /></div>
                        }
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div>Ticket</div>
                    <FaBarcode className="w-20 h-20" />
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <FormField
                    control={form.control}
                    name="defaultPlayer.squadId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Squad</FormLabel>
                        <FormControl>
                          <Select {...field}>
                            <SelectTrigger className="w-[200px]">
                              <SelectValue placeholder="Select a squad" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {eventDetails.squads.map(squad => (
                                  <SelectItem key={squad.id} value={squad.id}>{squad.name}</SelectItem>
                                ))}
                              </SelectGroup>
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
                  <div className="w-20 text-center">
                    <div>Price</div>
                    <div>
                      {eventDetails.prices.map(price => {
                        if (user.partner && price.type === 'partner') {
                          return price;
                        }
                        if (price.type === 'normal' && !user.partner) {
                          return price;
                        }
                        return undefined
                      })
                        .filter(item => item !== undefined)
                        .at(0)?.amount}€
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div>
            {user.team
              ? (
                <Card className="sm:col-span-2 lg:col-span-4 bg-muted/20" x-chunk="dashboard-05-chunk-0">
                  <CardContent className="pt-5">
                    <div>Team members</div>
                    <div>
                      {user.members.map(member => (
                        <Card
                          key={member.id}
                          className="sm:col-span-2 lg:col-span-4 bg-muted/20" x-chunk="dashboard-05-chunk-0"
                        >
                          <CardContent className="pt-5">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                <Avatar className="w-20 h-20">
                                  <AvatarImage src={user.picture!} />
                                  <AvatarFallback>{getWordFirstLatter(user.firstName!)}{getWordFirstLatter(user.lastName!)}</AvatarFallback>
                                </Avatar>
                                <div className="ml-4">
                                  <div className="text-xl">{user.firstName}<span className="font-bold text-2xl">{user.nick && `"${user.nick}"`}</span>{user.lastName}</div>
                                  <div className="flex items-center">
                                    <span className="mr-2">Partner:</span>
                                    {user.partner
                                      ? <div><PiHandshakeFill className="text-green-700 w-5 h-5" /></div>
                                      : <div><FaHandshakeSlash className="text-red-700 w-5 h-5" /></div>
                                    }
                                  </div>
                                </div>
                              </div>
                              <div className="text-center">
                                <div>Ticket</div>
                                <FaBarcode className="w-20 h-20" />
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <FormField
                                control={form.control}
                                name="defaultPlayer.squadId"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Squad</FormLabel>
                                    <FormControl>
                                      <Select {...field}>
                                        <SelectTrigger className="w-[200px]">
                                          <SelectValue placeholder="Select a squad" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectGroup>
                                            {eventDetails.squads.map(squad => (
                                              <SelectItem key={squad.id} value={squad.id}>{squad.name}</SelectItem>
                                            ))}
                                          </SelectGroup>
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
                              <div className="w-20 text-center">
                                <div>Price</div>
                                <div>
                                  {eventDetails.prices.map(price => {
                                    if (user.partner && price.type === 'partner') {
                                      return price;
                                    }
                                    if (price.type === 'normal' && !user.partner) {
                                      return price;
                                    }
                                    return undefined
                                  })
                                    .filter(item => item !== undefined)
                                    .at(0)?.amount}€
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>

              ) : (
                <div>{'Independente'}</div>
              )}
          </div>
          <div>
            <Card className="sm:col-span-2 lg:col-span-4 bg-muted/20" x-chunk="dashboard-05-chunk-0">
              <CardContent className="pt-5">
                <div>Extra players</div>

              </CardContent>
            </Card>
          </div>
          <div>

          </div>
        </div>
        <div>
          <Card
            className="overflow-hidden" x-chunk="dashboard-05-chunk-4"
          >
            <CardHeader className="flex flex-row items-start bg-muted/50">
              <div className="grid gap-0.5">
                <CardTitle className="flex items-center gap-2 text-lg">
                  Order <span className="text-xs">{form.getValues().orderCode}</span>
                </CardTitle>
                <CardDescription>Date: {formatDate(new Date())}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-6 text-sm">
              <div className="grid gap-3">
                <div className="font-semibold">Order Details</div>
                <ul className="grid gap-3">
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Ticket - no partner
                    </span>
                    <span>$4.00</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Ticket - no partner
                    </span>
                    <span>$4.00</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Ticket - no partner
                    </span>
                    <span>$4.00</span>
                  </li>
                  <li className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      Ticket - no partner
                    </span>
                    <span>$4.00</span>
                  </li>
                </ul>
                <Separator className="my-2" />
                <ul className="grid gap-3">
                  <li className="flex items-center justify-between font-semibold">
                    <span className="text-muted-foreground">Total</span>
                    <span>$16.00</span>
                  </li>
                </ul>
              </div>
              <Separator className="my-4" />
              <div className="grid gap-3">
                <div className="font-semibold">Customer Information</div>
                <dl className="grid gap-3">
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">Customer</dt>
                    <dd>{user.firstName} {user.lastName}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-muted-foreground">Email</dt>
                    <dd>
                      <a href="mailto:">{user.email}</a>
                    </dd>
                  </div>
                </dl>
              </div>
            </CardContent>
            <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
              <Button className="w-full"><MdOutlinePayment className="mr-2 w-5 h-5" /> Payment</Button>
            </CardFooter>
          </Card>
        </div>
      </section>
    </Form>
  )
}