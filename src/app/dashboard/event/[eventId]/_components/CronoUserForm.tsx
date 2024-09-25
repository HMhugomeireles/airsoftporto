'use client'

import { Button } from "@/components/ui/button"
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { Save } from "lucide-react"
import { useEffect } from "react"
import { useFormState } from "react-dom"
import { updateUserCrono } from "./Actions"

type CronoUserFormProps = {
  eventId: string
  
}

export function CronoUserForm({
  eventId
}: CronoUserFormProps) {
  const [state, action] = useFormState(updateUserCrono, undefined);


  useEffect(() => {
    if (state?.status === 200) {
      toast({
        title: state.message
      })
      return;
    }
    if (state) {
      toast({
        variant: 'destructive',
        title: state.message
      })
    }
  }, [state])

  return (
    <DialogContent>
      <form action={action}>
        <DialogHeader className="mb-4">
          <DialogTitle>Register crony</DialogTitle>
          <DialogDescription>
            This will register the payer crony values.
          </DialogDescription>
        </DialogHeader>
        <input type="hidden" name="eventId" value={eventId} />
        <input type="hidden" name="entryPlayerId" value="11" />
        <div className="flex justify-between">
          <div>
            <label className="text-sm mb-2">Joule</label>
            <Input name="cronoMeasure" placeholder="Enter value" />
          </div>
          <div>
            <label className="text-sm mb-2">BB weight</label>
            <Select name="bbWeight">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select item" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0.20">0.20</SelectItem>
                <SelectItem value="0.23">0.23</SelectItem>
                <SelectItem value="0.25">0.25</SelectItem>
                <SelectItem value="0.28">0.28</SelectItem>
                <SelectItem value="0.30">0.30</SelectItem>
                <SelectItem value="0.32">0.32</SelectItem>
                <SelectItem value="0.33">0.33</SelectItem>
                <SelectItem value="0.36">0.36</SelectItem>
                <SelectItem value="0.40">0.40</SelectItem>
                <SelectItem value="0.43">0.43</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter className="sm:justify-end mt-4">
          <DialogClose asChild>
            <Button
              type="submit"
              variant="default"
            >
              <Save className="text-sm w-5 h-5 mr-4" /> Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}