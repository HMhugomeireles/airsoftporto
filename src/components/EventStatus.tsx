import { Badge } from "@/components/ui/badge"
import { GameEventStatus } from "@prisma/client"


type EventStatusProps = {
  eventStatus: GameEventStatus
}

export function EventStatusUI({
  eventStatus
}: EventStatusProps) {
  return (
    <>
      {eventStatus.match(GameEventStatus.ACTIVE) && <Badge variant="active">Active</Badge>}
      {eventStatus.match(GameEventStatus.SCHEDULE) && <Badge variant="schedule">Schedule</Badge>}
      {eventStatus.match(GameEventStatus.DONE) && <Badge variant="outline">Done</Badge>}
    </>
  )
}