import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getUserAuthorization } from "@/lib/lucia";
import { formatDate, randomUuid } from "@/lib/utils";
import { GameEventsModel } from "@/module/GameEvents";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FaClock } from "react-icons/fa";
import { MdArrowBackIosNew, MdOutlineNotStarted } from "react-icons/md";
import { RiDoorOpenLine } from "react-icons/ri";

export default async function EventPage({
  params,
}: {
  params: { eventId: string }
}) {
  const eventDetails = await GameEventsModel.getGameEventDetails(params.eventId);
  const user = await getUserAuthorization()

  if (!eventDetails) {
    return redirect('/')
  }

  return (
    <>
      <section className="ml-6 mb-6">
        <Breadcrumb className="hidden md:flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/" className="flex items-center"><MdArrowBackIosNew className="mr-2" /> Back</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </section>
      <section className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <Card
              className="sm:col-span-2 lg:col-span-4 bg-muted/20" x-chunk="dashboard-05-chunk-0"
            >
              <CardHeader className="pb-3">
                <CardTitle>{eventDetails.name}</CardTitle>
                <CardDescription className="max-w-lg text-balance leading-relaxed">
                  {formatDate(eventDetails.date)}
                </CardDescription>
                <div className="flex ">
                  <div className="flex items-center mr-6"><FaClock className="mr-2" />{eventDetails.duration}h</div>
                  <div className="flex items-center mr-6"><RiDoorOpenLine className="mr-2" />{eventDetails.openDoors}</div>
                  <div className="flex items-center"><MdOutlineNotStarted className="mr-2" />{eventDetails.startGame}</div>
                </div>
              </CardHeader>
              <CardContent className="pt-10">

                <section className="mb-6">
                  <div className="uppercase font-extrabold text-xs">Description</div>
                  <div>{eventDetails.description}</div>
                </section>

                <section className="mb-6">
                  <div className="uppercase font-extrabold text-xs">Location</div>
                  <div>{eventDetails.location.street}</div>
                  <div>{eventDetails.location.directions}</div>
                </section>

                <section className="mb-6">
                  <div className="uppercase font-extrabold text-xs">Goals</div>
                  <div>{eventDetails.gameGoals.map(goal => (
                    <div key={randomUuid()}>{goal}</div>
                  ))}</div>
                </section>

                <section className="mb-6">
                  <div className="uppercase font-extrabold text-xs">Rules</div>
                  <div>{eventDetails.rules.map(rule => (
                    <div key={rule.id}>{rule.description}</div>
                  ))}</div>
                </section>

                <section className="mb-6">
                  <div className="uppercase font-extrabold text-xs">Squads</div>
                  <div className="flex">{eventDetails.squads.map(squad => (
                    <Card key={squad.id} className="w-1/2 mr-2">
                      <CardHeader>
                        <CardTitle>{squad.name}</CardTitle>
                        <CardDescription>
                          <div>Team color</div>
                          <div className={`text-${squad.color}-600 capitalize`}>{squad.color}</div>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex flex-wrap">{squad.items.map(item => (
                          <Badge className="m-1" key={randomUuid()}>{item}</Badge>
                        ))}</div>
                      </CardContent>
                    </Card>
                  ))}</div>
                </section>

              </CardContent>
              <CardFooter>

              </CardFooter>
            </Card>
          </div>
        </div>
        <div>
          <Card className="p-4">
            {user
              ? (
                <Link href={`/${eventDetails.id}/order`}>
                  <Button className="w-full">Buy ticket</Button>
                </Link>
              ) : (
                <div>
                  <div>You need have account to buy the ticket for this event.</div>  
                  <Link href={`/auth`}>
                    <Button className="w-full">Login</Button>
                  </Link>
                </div>
              )
            }
          </Card>
        </div>
      </section>
    </>
  )
}