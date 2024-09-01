import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ChangeEvent, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { useNavigate } from "react-router-dom"


function Home() {
  const [name, setName] = useState<String>("");
  const [roomID, setRoomID] = useState<String>("");
  const { toast } = useToast()
  const navigate = useNavigate();

  function nameChangeHandler (e: ChangeEvent<HTMLInputElement>) {
    setName( (prev) => e.target.value);
  }

  function RoomIDChangeHandler (e: ChangeEvent<HTMLInputElement>) {
    setRoomID( (prev) => e.target.value);
  }

  function submitHandler(){
    if(name.length <= 0 || roomID.length <= 0){
      return toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Please fill all the inputs!",
      })
    }

    navigate(`/chat?name=${name}&room=${roomID}`);
  }

  return (
    <main className="flex md:flex-row flex-col justify-around items-center h-screen p-3">
      <section className="flex flex-col justify-center items-center gap-5">
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
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={submitHandler}>
              Join
            </Button>
          </CardFooter>
        </Card>
      </section>
    </main>
  )
}

export default Home;