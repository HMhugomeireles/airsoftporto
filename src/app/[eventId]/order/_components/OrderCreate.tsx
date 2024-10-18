'use client'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { formatDate, generateToken, getWordFirstLatter, handleNullStringValue, randomUuid } from "@/lib/utils";
import { GameEventType, GroupUserTeamWithMembersType, TeamMemberWithUser } from "@/module/type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { FaBarcode, FaUserPlus, FaUserTimes } from "react-icons/fa";
import { FaHandshakeSlash } from "react-icons/fa6";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
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
  const [teamMembers, setTeamMembers] = useState<string[]>([])
  const [isSameTeam, setIsSameTeam] = useState(true);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      orderCode: `${new Date().getTime()}-${generateToken()}`,
      allInSameSquad: true,
      defaultPlayer: {
        name: `${handleNullStringValue(user.firstName)} ${handleNullStringValue(user.lastName)}`,
        apdName: `${handleNullStringValue(user.apdName)}`,
        apdNumber: user.apdNumber,
        ticketType: user.partner ? "partner" : "normal",
        squadId: ''
      },
      teamMembersSelect: [],
      extraPlayers: []
    }
  })
  const extraPlayersFields = useFieldArray({
    name: 'extraPlayers',
    control: form.control
  })
  const teamMembersSelectFields = useFieldArray({
    name: 'teamMembersSelect',
    control: form.control
  })

  function calculateTotalTicket() {
    const defaultPlayerAmount = eventDetails.prices.find(price => price.type === form.getValues().defaultPlayer.ticketType)?.amount
    const defaultPlayer = defaultPlayerAmount === undefined ? 0 : defaultPlayerAmount;
    const extraPlayers = form.getValues().extraPlayers.map(player => eventDetails.prices.find(price => price.type === player.ticketType)?.amount).filter(item => item !== undefined)
    const teamMembersSelect = form.getValues().teamMembersSelect.map(player => eventDetails.prices.find(price => price.type === player.ticketType)?.amount).filter(item => item !== undefined)

    const teamMembersSelectAmount = teamMembersSelect.reduce((previousValue: number, currentValue: number) => previousValue + currentValue, 0)
    const extraPlayersTotalAmount = extraPlayers.reduce((previousValue: number, currentValue: number) => previousValue + currentValue, 0)

    return extraPlayersTotalAmount + defaultPlayer + teamMembersSelectAmount;
  }

  function handleTeamPlayerSelect(e: React.MouseEvent<HTMLElement>, member: TeamMemberWithUser) {
    if (teamMembers.includes(member.id)) {
      const index = form.getValues().teamMembersSelect.findIndex(memberSelect => memberSelect.memberId === member.id)
      teamMembersSelectFields.remove(index)
      return setTeamMembers(prev => prev.filter((item: string) => item !== member.id));
    }
    teamMembersSelectFields.append({
      memberId: member.id,
      name: `${handleNullStringValue(member.player.firstName)} ${handleNullStringValue(member.player.lastName)}`,
      ticketType: member.player.partner ? "partner" : "normal",
      squadId: ''
    })
    return setTeamMembers([...teamMembers, member.id])
  }

  function handleRemovePlayer(playerId: string) {
    const index = form.getValues().extraPlayers.findIndex(player => player.id === playerId)
    return extraPlayersFields.remove(index)
  }

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
                    name={`defaultPlayer.squadId`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Squad</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={(value) => field.onChange(value)}
                            defaultValue={field.value}
                            {...field}
                          >
                            <SelectTrigger className="w-60">
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
                <FormField
                  control={form.control}
                  name="allInSameSquad"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Label htmlFor="allInSameSquad" className="mt-6 flex items-center cursor-pointer">
                          <div className="mr-2">Your colleges in the same squad than you?</div>
                          <Checkbox id="allInSameSquad" 
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </Label>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>
          <div>
            {user.team
              ? (
                <Card className="sm:col-span-2 lg:col-span-4 bg-muted/20" x-chunk="dashboard-05-chunk-0">
                  <CardHeader>
                    <CardTitle>{user.team.name}</CardTitle>
                    <CardDescription>Team members</CardDescription>
                    <CardDescription>Select team member to add the ticket order.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap">
                      {user.members.map((member: TeamMemberWithUser, index: number) => (
                        <Card
                          key={member.id}
                          className={`select-none relative cursor-pointer transition-colors ${teamMembers.includes(member.id) ? 'border-green-600 bg-green-600/10' : 'bg-muted/20'}`}
                          onClick={(e: React.MouseEvent<HTMLElement>) => handleTeamPlayerSelect(e, member)}
                        >
                          {teamMembers.includes(member.id) && (
                            <div className="absolute top-1 right-1 "><IoMdCheckmarkCircleOutline className="w-6 h-6 text-green-600" /></div>
                          )}
                          <CardContent className="pt-6">
                            <div className="flex items-center">
                              <Avatar className="w-20 h-20">
                                <AvatarImage src={member.player.picture!} />
                                <AvatarFallback>{getWordFirstLatter(member.player.firstName!)}{getWordFirstLatter(member.player.lastName!)}</AvatarFallback>
                              </Avatar>
                              <div className="ml-4">
                                <div className="text-xl">{member.player.firstName}<span className="font-bold text-2xl">{member.player.nick && `"${member.player.nick}"`}</span>{member.player.lastName}</div>
                                <div className="flex items-center">
                                  <span className="mr-2">Partner:</span>
                                  {member.player.partner
                                    ? <div><PiHandshakeFill className="text-green-700 w-5 h-5" /></div>
                                    : <div><FaHandshakeSlash className="text-red-700 w-5 h-5" /></div>
                                  }
                                </div>
                              </div>
                            </div>
                            {!form.getValues().allInSameSquad && (
                              <FormField
                                control={form.control}
                                name={`teamMembersSelect.${index}.squadId`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Squad</FormLabel>
                                    <FormControl>
                                      <Select
                                        onValueChange={(value) => field.onChange(value)}
                                        defaultValue={field.value}
                                        {...field}
                                      >
                                        <SelectTrigger className="">
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
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            )}
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
                <h3>Extra players</h3>
                {extraPlayersFields.fields.map((field, index) => (
                  <section key={index} className="mt-6">
                    <section className="mb-5">
                      <div className="flex justify-between items-center">
                        <div className="text-blue-500">#{index + 1} Friend</div>
                        <div><FaUserTimes className="text-red-500 cursor-pointer" onClick={() => handleRemovePlayer(field.id)} /></div>
                      </div>
                      <div className="my-4">Ticket price: {eventDetails.prices.find(price => price.type === 'normal')?.amount}€</div>
                      <div className="my-2">
                        <FormField
                          control={form.control}
                          name={`extraPlayers.${index}.name`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name*</FormLabel>
                              <FormControl>
                                <Input placeholder="Insert player name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="flex justify-between">
                        <div className="my-2 mr-4 w-1/2">
                          <FormField
                            control={form.control}
                            name={`extraPlayers.${index}.apdName`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>APD Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Insert APD name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="my-2 w-1/2">
                          <FormField
                            control={form.control}
                            name={`extraPlayers.${index}.apdNumber`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>APD number</FormLabel>
                                <FormControl>
                                  <Input placeholder="Insert APD number" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                      {!form.getValues().allInSameSquad && (
                        <div>
                          <FormField
                            control={form.control}
                            name={`extraPlayers.${index}.squadId`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Squad</FormLabel>
                                <FormControl>
                                  <Select
                                    onValueChange={(value) => field.onChange(value)}
                                    defaultValue={field.value}
                                    {...field}
                                  >
                                    <SelectTrigger className="">
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
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      )}
                    </section>
                    <Separator />
                  </section>
                ))}
              </CardContent>
              <CardFooter className="pt-6 flex justify-center border-t">
                <Button
                  onClick={() => extraPlayersFields.append({ id: randomUuid(), apdName: '', apdNumber: '', name: '', ticketType: "normal", squadId: '' })}
                  variant="outline"><FaUserPlus className="mr-2"
                  /> Add Friends</Button>
              </CardFooter>
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
                      Ticket - {form.getValues().defaultPlayer.name}
                    </span>
                    <span>{eventDetails.prices.find(price => price.type === form.getValues().defaultPlayer.ticketType)?.amount.toFixed(2)}€</span>
                  </li>
                  {form.getValues().teamMembersSelect.map(teamMemberSelect => (
                    <li key={teamMemberSelect.memberId} className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Ticket - {teamMemberSelect.name}
                      </span>
                      <span>{eventDetails.prices.find(price => price.type === teamMemberSelect.ticketType)?.amount.toFixed(2)}€</span>
                    </li>
                  ))}
                  {form.getValues().extraPlayers.map(extraPlayer => (
                    <li key={extraPlayer.id} className="flex items-center justify-between">
                      <span className="text-muted-foreground">
                        Ticket - {extraPlayer.name}
                      </span>
                      <span>{eventDetails.prices.find(price => price.type === extraPlayer.ticketType)?.amount.toFixed(2)}€</span>
                    </li>
                  ))}
                </ul>
                <Separator className="my-2" />
                <ul className="grid gap-3">
                  <li className="flex items-center justify-between font-semibold">
                    <span className="text-muted-foreground">Total</span>
                    <span>{calculateTotalTicket().toFixed(2)}€</span>
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