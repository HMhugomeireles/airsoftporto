'use client'

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
import { Search } from "lucide-react"
import Image from "next/image"
import { CronoUserForm } from "./CronoUserForm"

type CronySectionProps = {
  eventId: string
}

export function CronySection({
  eventId
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
              <CronoUserForm eventId={eventId} />
              <TableRow>
                <TableCell className="hidden xl:table-column">
                  <Image
                    alt="Product image"
                    className="aspect-square rounded-md object-cover"
                    height="34"
                    src="https://ui.shadcn.com/placeholder.svg"
                    width="34"
                  />
                </TableCell>
                <TableCell>
                  <DialogTrigger><div className="font-medium">Liam Johnson</div></DialogTrigger>
                </TableCell>
                <TableCell>
                  <DialogTrigger>-</DialogTrigger>
                </TableCell>
                <TableCell>
                  <DialogTrigger>-</DialogTrigger>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Dialog>
  )
}