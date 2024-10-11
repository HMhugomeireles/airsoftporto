import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FormControl, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { KeyboardEvent, useState } from "react";
import { useFormContext } from "react-hook-form";
import PulseLoader from 'react-spinners/PulseLoader';
import { z } from "zod";
import { onboardingFormSchema } from "./WizardForm";

type TeamType = { id: string; name: string; fag: string | null; banner: string | null; }

export function TeamAssociateForm() {
  const [loading, setLoading] = useState<boolean>(false)
  const [playerType, setPlayerType] = useState<"independent" | "team">("independent");
  const { setValue } = useFormContext<z.infer<typeof onboardingFormSchema>>();
  const [teamList, setTeamList] = useState<TeamType[] | undefined>(undefined);

  async function handleSearch(e: KeyboardEvent<HTMLInputElement>) {
    const value = e.currentTarget.value;

    if (value.length <= 3) {
      return;
    }

    try {
      const response = await fetch(`/api/team/searchTeam`, {
        method: 'POST',
        body: JSON.stringify({ teamName: value }),
        headers: {
          "Content-Type": "application/json"
        }
      });
      const data = await response.json();

      setTeamList(data)
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error on get teams name!'
      })
    }
  }
  return (
    <>
      <PulseLoader
        loading={loading}
      />
      <CardHeader className="">
        <CardTitle>Team Information</CardTitle>
        <CardDescription>
          {"We need you to register the guns you will play in the event. This is for make possible to register the crony of the guns"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <section className="mb-4">
          <div className="text-xs mb-2">Do you have team?</div>
          <Button type="button" onClick={() => setPlayerType("independent")} variant="ghost" className={`w-1/2 ${playerType === "independent" ? "bg-accent text-accent-foreground" : ""}`}>Independent</Button>
          <Button type="button" onClick={() => setPlayerType("team")} variant="ghost" className={`w-1/2 ${playerType === "team" ? "bg-accent text-accent-foreground" : ""}`}>Team</Button>
        </section>

        {playerType === "team" && (
          <section>
            <section>
              <section>
                <FormItem>
                  <FormLabel>Find your team</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your value" onKeyUp={handleSearch} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </section>
              <section className="p-4">
                {Boolean(teamList) && teamList?.length === 0 && (
                  <div className="flex justify-end">
                    <Button type="button" onClick={() => setValue("team.needCreate", true)}>Create team</Button>
                  </div>
                )}
                {Boolean(teamList) && teamList?.length === 0 && (
                  <div className="text-xs p-2">Select your team</div>
                )}
                {Boolean(teamList) && teamList?.map(team => (
                  <Badge key={team.id} onClick={() => setValue("team.name", team.name)} className="m-2 cursor-pointer select-none" variant="outline">{team.name}</Badge>
                ))}
              </section>
            </section>
          </section>
        )}



      </CardContent>
    </>
  )
}