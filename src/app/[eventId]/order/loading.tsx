import { Spinner } from "@/components/ui/spinner";


export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 bg-black/80  overflow-hidden w-full h-full">
      <div className="flex justify-center items-center h-full">
        <Spinner />
      </div>
    </div>
  )
}