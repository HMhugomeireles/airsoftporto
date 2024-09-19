import { Card } from "@/components/ui/card"

export default async function Ticket({ params }: { params: { eventId: string, ticketId: string } }) {
  
   // validar se user tem premisões
   //confirmar presensa de todos os players no ticket

  return (
    <section className="bg-muted/50 p-4">
       <Card x-chunk="dashboard-06-chunk-0">
         {params.eventId}
       </Card>
       <Card x-chunk="dashboard-06-chunk-0">
         {params.ticketId}
       </Card>
    </section>
  )
}