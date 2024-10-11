import { DatePicker } from "@/components/Datepicker"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { PlusCircle } from "lucide-react"
import Link from "next/link"
import { Events } from "./_components/Events"
import { getAllEvents } from "./event/Action"


export default async function DashBoardPage() {
  const events = await getAllEvents();

  return (
    <Dialog>
      <section className="bg-muted/50">
        <section className="p-4">
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex justify-end">
            <Link href="/dashboard/event/create">
              <Button size="sm" className="h-8 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Create event
                </span>
              </Button>
            </Link>
          </div>
        </section>

        <section className="p-4">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Events</CardTitle>
              <CardDescription>
                Manage your events and view their status.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Events events={events} />
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                products
              </div>
            </CardFooter>
          </Card>
        </section>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Duplicate event</DialogTitle>
            <DialogDescription>
              This action will create new event with the same information this event have.
              You can edit later the event information.
            </DialogDescription>
          </DialogHeader>
          <div>
            <DatePicker />
          </div>
          <DialogFooter className="sm:justify-end">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Duplicates
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </section>
    </Dialog>
  )
}