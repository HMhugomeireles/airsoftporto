import { Badge } from "@/components/ui/badge"
import { EventStatus } from "@prisma/client"

type EventStatusProps = {
  eventStatus: EventStatus
}

export function EventStatusUI({
  eventStatus
}: EventStatusProps) {
  return (
    <>
      {eventStatus.match(EventStatus.ACTIVE) && <Badge variant="active">Active</Badge>}
      {eventStatus.match(EventStatus.SCHEDULE) && <Badge variant="schedule">Schedule</Badge>}
      {eventStatus.match(EventStatus.DONE) && <Badge variant="outline">Done</Badge>}
    </>
  )
}