import { Badge } from "@/components/ui/badge"
import { GameEventStatusType } from "@/module/type"
// import { GameEventStatus } from "@prisma/client"


type EventStatusProps = {
  eventStatus: GameEventStatusType
}

export function EventStatusUI({
  eventStatus
}: EventStatusProps) {
  return (
    <>
      {eventStatus.match("ACTIVE") && <Badge variant="active">Active</Badge>}
      {eventStatus.match("SCHEDULE") && <Badge variant="schedule">Schedule</Badge>}
      {eventStatus.match("DONE") && <Badge variant="outline">Done</Badge>}
    </>
  )
}