
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getWordFirstLatter, randomUuid } from "@/lib/utils"
import { Users } from "lucide-react"
import { HiUserGroup } from "react-icons/hi"
import { TbRulerMeasure } from "react-icons/tb"
import { EventStatusUI } from "../../../../components/EventStatus"
import { CronySection } from "./_components/CronySection"
import { getEventDetails } from "./Actions"

export default async function Onboarding({
  params,
}: {
  params: { eventId: string }
}) {
  const eventDetails = await getEventDetails(params.eventId);

  return (
    <section className="bg-muted/50 p-4">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <section className="p-4 mb-4 col-span-2">
          <div className="flex"><h1 className="text-2xl">Event: {eventDetails.event.name}</h1></div>
          <p className="text-sm text-gray-500">{eventDetails.event.date.toLocaleDateString('pt-PT', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
          })}</p>
          <EventStatusUI eventStatus={eventDetails.event.status} />
          <div className="flex items-center"><Users className="h-4 w-4 text-muted-foreground mr-4" /> {eventDetails.players.totalPlayers}</div>
        </section>
        <Card x-chunk="dashboard-01-chunk-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Crony</CardTitle>
            <TbRulerMeasure className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">80%</div>
            {/* {eventDetails.players.teams.map(team => (
              <p key={randomUuid()} className="text-xs text-muted-foreground">
                {team.name}: {team.totalPlayersPresents}
              </p>
            ))} */}
            <p className="text-xs text-muted-foreground">
              Camuflados: 30/50
            </p>
            <p className="text-xs text-muted-foreground">
              Contractors: 30/50
            </p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-3">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Players</CardTitle>
            <HiUserGroup className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{eventDetails.players.totalPlayers}</div>
            {eventDetails.players.teams.map(team => (
              <p key={randomUuid()} className="text-xs text-muted-foreground">
                {team.name}: {team.totalPlayersPresents}
              </p>
            ))}
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3 mt-4">
        <CronySection
          eventDetails={eventDetails}
        />
        <Card x-chunk="dashboard-01-chunk-5">
          <CardHeader>
            <CardTitle>Players</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px] overflow-y-scroll">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead><span className="sr-only">Image</span></TableHead>
                  <TableHead>Player name</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {eventDetails.players.list.map(eventPlayer => (
                  <TableRow key={randomUuid()} className="bg-accent">
                    <TableCell className="hidden sm:table-cell">
                      <Avatar>
                        <AvatarImage
                          className="aspect-square rounded-md object-cover"
                          src={eventPlayer.player.picture!}
                          height="34"
                          width="34"
                        />
                        <AvatarFallback>{getWordFirstLatter(eventPlayer.player.firstName!)}{getWordFirstLatter(eventPlayer.player.lastName!)}</AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{eventPlayer.player.firstName} {eventPlayer.player.lastName}</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        {eventPlayer.player.email}
                      </div>
                    </TableCell>
                  </TableRow>

                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}