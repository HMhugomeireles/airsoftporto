import { EventStatusUI } from "@/components/EventStatus"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { EventModel } from "@/module/Events"
import Link from "next/link"


export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}

export default async function RootLayout() {
  const events = await EventModel.getAllEvents();
  return (
    <section className="flex w-full">
      <section className="w-full">
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
                <Link href={`/${event.id}`}>
                  <TableCell className="font-medium">
                    <Button variant="link">{event.name}</Button>
                  </TableCell>
                </Link>
                <TableCell>
                  <Link href={`/${event.id}`}>
                    {event.date.toLocaleDateString('pt-PT', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </Link>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <EventStatusUI eventStatus={event.eventStatus} />
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {/* <span className="font-semibold text-xl">{event.maxPlayersRegister}0</span>/99{event.eventMaxPlayers} */}
                </TableCell>
                <TableCell>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </section>
  )
}
