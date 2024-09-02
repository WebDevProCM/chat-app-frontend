import {Menu} from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { FaUsers } from "react-icons/fa6";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export type sideBarType = {
  id: string,
  username: string,
  room: string,
  time: string,
  icon: string
}

export function SideBarLg({data}: {data: sideBarType[]}) {
  return (
    <div className="flex h-full max-h-screen flex-col gap-2">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <div className="flex items-center gap-2 font-semibold">
          <FaUsers size={30}/>
          <span className="">Users in the Room</span>
        </div>
      </div>
      <div className="flex-1">
        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
          {data.map((user: sideBarType) =>{
            return (
            <div key={user.id} className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
              <Avatar>
                <AvatarImage src={`/images/${user.icon}.png`} alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p className="font-bold text-lg">{user.username}</p>
            </div>
            )
          })}

        </nav>
      </div>
    </div>
  )
}

export function SideBarSm({data}: {data: sideBarType[]}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="shrink-0 md:hidden"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <nav className="grid gap-2 text-lg font-medium">
          <div>
          <FaUsers size={30}/>
          <p>Users in the room</p>
          </div>

          {data.map((user: sideBarType) =>{
            return (
            <div key={user.id} className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
              <Avatar>
                <AvatarImage src={`/images/${user.icon}.png`} alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p className="font-bold text-lg">{user.username}</p>
            </div>
            )
          })}

        </nav>
      </SheetContent>
    </Sheet>
  )
}