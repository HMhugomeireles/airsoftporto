'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogTrigger
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getWordFirstLatter, randomUuid } from "@/lib/utils"
import { Search } from "lucide-react"
import { EventDetails } from "../Actions"
import { CronoUserForm } from "./CronoUserForm"

type CronySectionProps = {
  eventDetails: EventDetails
}

export function CronySection({
  eventDetails
}: CronySectionProps) {


  return (
    <Dialog>
      <Card
        className="xl:col-span-2" x-chunk="dashboard-01-chunk-4"
      >
        <CardHeader className="flex flex-row items-center">
          <div className="grid gap-2">
            <CardTitle>Crony list</CardTitle>
            <CardDescription>
              All players gun measures.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="h-[400px] overflow-y-scroll">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 mb-4"
            />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden xl:table-column"><span className="sr-only">Image</span></TableHead>
                <TableHead>Player</TableHead>
                <TableHead>Measure</TableHead>
                <TableHead>BB weight</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {eventDetails.cronoList.map(playerCrono => (
                <TableRow key={randomUuid()}>
                  <TableCell className="hidden xl:table-column">
                    <Avatar>
                      <AvatarImage
                        className="aspect-square rounded-md object-cover"
                        src={playerCrono.picture!}
                        height="34"
                        width="34"
                      />
                      <AvatarFallback>{getWordFirstLatter(playerCrono.firstName!)}{getWordFirstLatter(playerCrono.lastName!)}</AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell>
                    <DialogTrigger><div className="font-medium">{playerCrono.firstName} {playerCrono.lastName}</div></DialogTrigger>
                    <CronoUserForm eventId={eventDetails.event.id} />
                  </TableCell>
                  <TableCell>
                    <DialogTrigger>{playerCrono.cronoMeasure}</DialogTrigger>
                  </TableCell>
                  <TableCell>
                    <DialogTrigger>{playerCrono.bbWeight}</DialogTrigger>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Dialog>
  )
}