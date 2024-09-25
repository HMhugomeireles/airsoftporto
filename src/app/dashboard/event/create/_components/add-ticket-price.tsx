import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ReactNode, useState } from "react";


type AddTeamProps = {
  onAddData(data: { amount: number, type: 'partner' | 'normal'}[]): void
  children: ReactNode;
}

export function AddTicketPrice({
  children,
  onAddData
}: AddTeamProps) {
  const [data, setData] = useState<{ amount: number, type: 'partner' | 'normal'}[]>([
    { amount: 0, type: 'normal'},
    { amount: 0, type: 'partner'},
  ]);

  return (
    <section>
      <FormItem className="mt-4">
        <FormLabel>Partner ticket price</FormLabel>
        <FormControl>
          <Input
            placeholder="Insert value"
            value={data.at(1)?.amount}
            onChange={(e) => setData(pre => [
              { amount: Number(pre.at(0)?.amount) , type: 'normal'},
              { amount: Number(e.target.value) , type: 'partner'},
            ])} 
            required={false}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
      <FormItem className="mt-4">
        <FormLabel>Normal ticket price</FormLabel>
        <FormControl>
          <Input
            placeholder="Insert value"
            value={data.at(0)?.amount}
            onChange={(e) => setData(pre => [
              { amount: Number(e.target.value) , type: 'normal'},
              { amount: Number(pre.at(1)?.amount), type: 'partner'},
            ])} 
            required={false}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
      <section className="mt-4 w-full" onClick={() => onAddData(data)}>
        {children}
      </section>
    </section>
  )
}