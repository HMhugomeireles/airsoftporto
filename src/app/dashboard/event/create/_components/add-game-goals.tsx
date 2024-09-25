import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { randomUuid } from "@/lib/utils";
import { ReactNode, useState } from "react";


type AddTeamProps = {
  onAddData(data: string[]): void
  children: ReactNode;
}

export function AddGameGoals({
  children,
  onAddData
}: AddTeamProps) {
  const [data, setData] = useState<string[]>([]);

  function handleAddItem(event: React.KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      const inputHTML = event.currentTarget as HTMLInputElement;
      const value = inputHTML.value
      if (value.trim()) {
        setData([...data, value])
      }
      inputHTML.value = ''
    }
  }

  return (
    <section>
      <div>
        {data.map((item, index) => (
          <div key={randomUuid()} className="m-2">{item}</div>
        ))}
      </div>
      <FormItem className="mt-4">
        <FormLabel>Team items</FormLabel>
        <FormControl>
          <Textarea
            placeholder="Insert value"
            onKeyDown={handleAddItem}
            required={false}
          />
        </FormControl>
        <FormDescription>Write the game goal and press Enter</FormDescription>
        <FormMessage />
      </FormItem>
      <section className="mt-4 w-full" onClick={() => onAddData(data)}>
        {children}
      </section>
    </section>
  )
}