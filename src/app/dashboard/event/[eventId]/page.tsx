
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Users } from "lucide-react"
import Image from "next/image"
import { HiUserGroup } from "react-icons/hi"
import { TbRulerMeasure } from "react-icons/tb"
import { CronySection } from "./_components/CronySection"

export default async function Onboarding({
  params,
}: {
  params: { eventId: string }
}) {

  return (
    <section className="bg-muted/50 p-4">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <section className="p-4 mb-4 col-span-2">
          <div className="flex"><h1 className="text-2xl">Event: Sunday games</h1><Badge className="ml-4" variant={"active"}>Active</Badge></div>
          <p className="text-sm text-gray-500">2023-07-12 10:42 AM</p>
          <div className="flex items-center"><Users className="h-4 w-4 text-muted-foreground mr-4" /> 20</div>
        </section>
        <Card x-chunk="dashboard-01-chunk-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Crony</CardTitle>
            <TbRulerMeasure className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">%80</div>
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
            <div className="text-2xl font-bold">100</div>
            <p className="text-xs text-muted-foreground">
              Camuflados: 50
            </p>
            <p className="text-xs text-muted-foreground">
              Contractors: 50
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3 mt-4">
        <CronySection eventId={params.eventId} />
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
                <TableRow className="bg-accent">
                  <TableCell className="hidden sm:table-cell">
                    <Image
                      alt="Product image"
                      className="aspect-square rounded-md object-cover"
                      height="34"
                      src="https://ui.shadcn.com/placeholder.svg"
                      width="34"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">Liam Johnson</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      liam@example.com
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className="bg-accent">
                  <TableCell className="hidden sm:table-cell">
                    <Image
                      alt="Product image"
                      className="aspect-square rounded-md object-cover"
                      height="34"
                      src="https://ui.shadcn.com/placeholder.svg"
                      width="34"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">Liam Johnson</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      liam@example.com
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className="bg-accent">
                  <TableCell className="hidden sm:table-cell">
                    <Image
                      alt="Product image"
                      className="aspect-square rounded-md object-cover"
                      height="34"
                      src="https://ui.shadcn.com/placeholder.svg"
                      width="34"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">Liam Johnson</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      liam@example.com
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className="bg-accent">
                  <TableCell className="hidden sm:table-cell">
                    <Image
                      alt="Product image"
                      className="aspect-square rounded-md object-cover"
                      height="34"
                      src="https://ui.shadcn.com/placeholder.svg"
                      width="34"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">Liam Johnson</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      liam@example.com
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className="bg-accent">
                  <TableCell className="hidden sm:table-cell">
                    <Image
                      alt="Product image"
                      className="aspect-square rounded-md object-cover"
                      height="34"
                      src="https://ui.shadcn.com/placeholder.svg"
                      width="34"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">Liam Johnson</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      liam@example.com
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className="bg-accent">
                  <TableCell className="hidden sm:table-cell">
                    <Image
                      alt="Product image"
                      className="aspect-square rounded-md object-cover"
                      height="34"
                      src="https://ui.shadcn.com/placeholder.svg"
                      width="34"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">Liam Johnson</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      liam@example.com
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className="bg-accent">
                  <TableCell className="hidden sm:table-cell">
                    <Image
                      alt="Product image"
                      className="aspect-square rounded-md object-cover"
                      height="34"
                      src="https://ui.shadcn.com/placeholder.svg"
                      width="34"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">Liam Johnson</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      liam@example.com
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className="bg-accent">
                  <TableCell className="hidden sm:table-cell">
                    <Image
                      alt="Product image"
                      className="aspect-square rounded-md object-cover"
                      height="34"
                      src="https://ui.shadcn.com/placeholder.svg"
                      width="34"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">Liam Johnson</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      liam@example.com
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className="bg-accent">
                  <TableCell className="hidden sm:table-cell">
                    <Image
                      alt="Product image"
                      className="aspect-square rounded-md object-cover"
                      height="34"
                      src="https://ui.shadcn.com/placeholder.svg"
                      width="34"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">Liam Johnson</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      liam@example.com
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className="bg-accent">
                  <TableCell className="hidden sm:table-cell">
                    <Image
                      alt="Product image"
                      className="aspect-square rounded-md object-cover"
                      height="34"
                      src="https://ui.shadcn.com/placeholder.svg"
                      width="34"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">Liam Johnson</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      liam@example.com
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className="bg-accent">
                  <TableCell className="hidden sm:table-cell">
                    <Image
                      alt="Product image"
                      className="aspect-square rounded-md object-cover"
                      height="34"
                      src="https://ui.shadcn.com/placeholder.svg"
                      width="34"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">Liam Johnson</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      liam@example.com
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className="bg-accent">
                  <TableCell className="hidden sm:table-cell">
                    <Image
                      alt="Product image"
                      className="aspect-square rounded-md object-cover"
                      height="34"
                      src="https://ui.shadcn.com/placeholder.svg"
                      width="34"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">Liam Johnson</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      liam@example.com
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className="bg-accent">
                  <TableCell className="hidden sm:table-cell">
                    <Image
                      alt="Product image"
                      className="aspect-square rounded-md object-cover"
                      height="34"
                      src="https://ui.shadcn.com/placeholder.svg"
                      width="34"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">Liam Johnson</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      liam@example.com
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className="bg-accent">
                  <TableCell className="hidden sm:table-cell">
                    <Image
                      alt="Product image"
                      className="aspect-square rounded-md object-cover"
                      height="34"
                      src="https://ui.shadcn.com/placeholder.svg"
                      width="34"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">Liam Johnson</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      liam@example.com
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className="bg-accent">
                  <TableCell className="hidden sm:table-cell">
                    <Image
                      alt="Product image"
                      className="aspect-square rounded-md object-cover"
                      height="34"
                      src="https://ui.shadcn.com/placeholder.svg"
                      width="34"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">Liam Johnson</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      liam@example.com
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}