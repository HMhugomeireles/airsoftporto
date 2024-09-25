import { Badge } from "@/components/ui/badge";
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChangeEvent, ReactNode, useState } from "react";

export type TeamData = {
  teamName: string;
  maxTeamPlayers: string;
  teamItems: string[];
  color: string;
}

type AddTeamProps = {
  onAddTeam(data: TeamData): void
  children: ReactNode;
}

export function AddTeam({
  children,
  onAddTeam
}: AddTeamProps) {
  const [teamData, setTeamData] = useState<TeamData>({
    maxTeamPlayers: '',
    teamItems: [],
    teamName: '',
    color: ''
  });

  function handleAddItem(event: React.KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      const inputHTML = event.currentTarget as HTMLInputElement;
      const value = inputHTML.value
      if (value.trim()) {
        setTeamData({
          ...teamData,
          teamItems: [...teamData.teamItems, value]
        })
      }
      inputHTML.value = ''
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    switch (e.target.name) {
      case 'teamName':
        setTeamData({
          ...teamData,
          teamName: e.target.value
        })
        break;
      case 'maxTeamPlayers':
        setTeamData({
          ...teamData,
          maxTeamPlayers: e.target.value
        })
        break;
      case 'teamItems':
        setTeamData({
          ...teamData,
          teamItems: [...teamData.teamItems, e.target.value]
        })
        break;
      default:
        return;

    }
  }

  return (
    <section>
      <FormItem className="mt-4">
        <FormLabel>Team name</FormLabel>
        <FormControl>
          <Input
            type="text"
            name="teamName"
            value={teamData?.teamName}
            onChange={handleChange}
            placeholder="Insert value"
            required={false}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
      <FormItem className="mt-4">
        <FormLabel>Max Team players</FormLabel>
        <FormControl>
          <Input
            type="text"
            name="maxTeamPlayers"
            value={teamData?.maxTeamPlayers}
            onChange={handleChange}
            placeholder="Insert value"
            required={false}
          />
        </FormControl>
        <FormMessage />
      </FormItem>
      <FormItem className="mt-4">
        <FormLabel>Team items</FormLabel>
        <FormControl>
          <Input
            type="text"
            name="teamItems"
            placeholder="Insert value"
            required={false}
            onKeyDown={handleAddItem}
          />
        </FormControl>
        <FormDescription>Write the item and press Enter</FormDescription>
        <FormMessage />
      </FormItem>
      <div className="flex flex-wrap p-2">
        {teamData.teamItems.map((teamItem, index) => (
          <Badge key={`${index}-${teamItem}`} className="m-2 rounded-3xl">{teamItem}</Badge>
        ))}
      </div>
      <FormItem className="mt-4">
        <FormLabel>Team items</FormLabel>
        <FormControl>
          <Select
            onValueChange={(value) => setTeamData({ ...teamData, color: value})}
            required={false}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select color" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="red" className="text-red-600">Red</SelectItem>
              <SelectItem value="blue" className="text-blue-600">Blue</SelectItem>
              <SelectItem value="green" className="text-green-600">Green</SelectItem>
              <SelectItem value="yellow" className="text-yellow-600">Blue</SelectItem>
            </SelectContent>
          </Select>
        </FormControl>
        <FormDescription>Write the item and press Enter</FormDescription>
        <FormMessage />
      </FormItem>
      <section className="mt-4 w-full" onClick={() => onAddTeam(teamData)}>
        {children}
      </section>
    </section>
  )
}