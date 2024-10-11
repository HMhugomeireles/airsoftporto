import { Button } from "@/components/ui/button"
import { DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { GameEventWithStatsType } from "@/module/type"
import { MoreHorizontal } from "lucide-react"
import Link from "next/link"
import { EventStatusUI } from "../../../components/EventStatus"


type EventsProps = {
  events: GameEventWithStatsType[]
}

export function Events({ 
  events
}: EventsProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Event name</TableHead>
          <TableHead>Created at</TableHead>
          <TableHead className="hidden md:table-cell">
            Status
          </TableHead>
          <TableHead className="hidden md:table-cell">
            Capacity
          </TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {events.map(event => (
          <TableRow key={event.id}>
            <Link href={`/dashboard/event/${event.id}`}>
              <TableCell className="font-medium">
                <Button variant="link">{event.name}</Button>
              </TableCell>
            </Link>
            <TableCell>
              <Link href={`/dashboard/event/${event.id}`}>
                {event.date.toLocaleDateString('pt-PT', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}
              </Link>
            </TableCell>
            <TableCell className="hidden md:table-cell">
              <EventStatusUI eventStatus={event.status} />
            </TableCell>
            <TableCell className="hidden md:table-cell">
              <span className="font-semibold text-xl">{event.maxPlayersRegister}</span>/{event.eventMaxPlayers}
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    aria-haspopup="true"
                    size="icon"
                    variant="ghost"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <Separator />
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>
                    <DialogTrigger>Duplicate</DialogTrigger>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}