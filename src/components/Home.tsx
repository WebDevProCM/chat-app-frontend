import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChangeEvent, useRef, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { useNavigate } from "react-router-dom"
import { HomeChatList } from "./HomeChatList"

const icons = ["rabbit", "dog", "cat", "panda", "giraffe"];

function Home() {
  const [name, setName] = useState<String>("");
  const [roomID, setRoomID] = useState<String>("");
  const [userIcon, setUserIcon] = useState<String>("");
  const { toast } = useToast()
  const navigate = useNavigate();

  function nameChangeHandler (e: ChangeEvent<HTMLInputElement>) {
    setName( () => e.target.value);
  }

  function RoomIDChangeHandler (e: ChangeEvent<HTMLInputElement>) {
    setRoomID( () => e.target.value);
  }

  function submitHandler(){
    if(name.length <= 0 || roomID.length <= 0 || userIcon.length <= 0){
      return toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Please fill all the inputs!",
      })
    }

    navigate(`/chat?name=${name}&room=${roomID}&icon=${userIcon}`);
  }

  const iconSelectHandler = (icon: string) =>{
    setUserIcon(icon);
  }

  return (
    <main className="flex md:flex-row flex-col justify-around items-center h-screen p-3 max-w-[1400px] mx-auto">
      <section className="relative flex flex-col justify-center items-center gap-5">
        <h1 className="font-bold md:text-7xl">Chat-App</h1>
        <img src="/images/chatIcon.png" className="max-w-60"/>
      </section>

      <section className="flex justify-center items-center">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Join Chat</CardTitle>
            <CardDescription>
              Enter your name and room ID below to join the chat.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" type="text" placeholder="Enter your name" onChange={nameChangeHandler} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="room">Room ID</Label>
              <Input id="room" type="text" required onChange={RoomIDChangeHandler}/>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="icon">Select Icon</Label>
              <div className="flex justify-center items-center gap-3">
                {icons.map((icon) =>{
                  return (
                    <section key={icon} className={`cursor-pointer rounded-full p-1 ${userIcon===icon ? "bg-slate-600" : "bg-slate-400" }`} onClick={ () =>iconSelectHandler(icon)}>
                      <Avatar className="cursor">
                        <AvatarImage src={`/images/${icon}.png`} alt={`${icon} icon`} />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </section>
                  )
                })}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={submitHandler}>
              Join
            </Button>
          </CardFooter>
        </Card>
      </section>
      <section className="absolute top-0 -z-10 opacity-20 overflow-hidden">
          <HomeChatList />
      </section>
    </main>
  )
}

export default Home;