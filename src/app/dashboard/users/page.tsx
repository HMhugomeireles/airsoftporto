import { DatePicker } from "@/components/Datepicker"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getWordFirstLatter, randomUuid } from "@/lib/utils"
import { UserModel } from "@/module/Users"
import { MoreHorizontal } from "lucide-react"
import Link from "next/link"
import { FaCheckSquare } from "react-icons/fa"
import { IoCloseCircle } from "react-icons/io5"


export default async function UsersPage() {
  const users = await UserModel.getAllUsers();

  return (
    <Dialog>
      <section className="bg-muted/50">
        <section className="p-4">
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Users</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </section>

        <section className="p-4">
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Users</CardTitle>
              <CardDescription>
                Manage users and disable/enable users.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead><span className="sr-only">Image</span></TableHead>
                    <TableHead>Player name</TableHead>
                    <TableHead>Partner</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Account status</TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map(user => (
                    <TableRow key={randomUuid()} className="bg-accent">
                      <TableCell className="hidden sm:table-cell">
                        <Avatar>
                          <AvatarImage
                            className="aspect-square rounded-md object-cover"
                            src={user.picture!}
                            height="34"
                            width="34"
                          />
                          <AvatarFallback>{getWordFirstLatter(user.firstName!)}{getWordFirstLatter(user.lastName!)}</AvatarFallback>
                        </Avatar>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{user.firstName} {user.lastName}</div>
                        <div className="hidden text-sm text-muted-foreground md:inline">
                          {user.email}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">{user.partner ?
                        (
                          <FaCheckSquare className="text-green-600 text-2xl" />
                        ) : (
                          <IoCloseCircle className="text-red-600 text-2xl" />
                        )}
                      </TableCell>
                      <TableCell>{user.role.map((role: string) => (
                        <div className="m-2" key={randomUuid()}>{role}</div>
                      ))}</TableCell>
                      <TableCell>{user.active ? (
                        <Badge>Active</Badge>
                      ) : (
                        <Badge>Standby</Badge>
                      )}</TableCell>
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
                            <DropdownMenuItem>
                              <DialogTrigger>Edit</DialogTrigger>
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
            <DialogTitle>User editing</DialogTitle>
            <DialogDescription>
              This will update user information about partner, role, account status.
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
    </Dialog >
  )
}