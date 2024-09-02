import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

import { IoIosSend } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { Link, LoaderFunction, redirect, useLocation } from "react-router-dom"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { ModeToggle } from "./mode-toggle"
import MessageBar, { messageObj } from "./MessageBar"
import { SideBarLg, SideBarSm, sideBarType } from "./SideBar";
import { ScrollArea } from "@/components/ui/scroll-area"
import queryString from 'query-string';
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast"
import { io } from 'socket.io-client';

// let socket: any;
const url: string = "http://localhost:3000";
let socket: any;

function chatRoom() {
  const {search} = useLocation();
  const userData = queryString.parse(search);

  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<messageObj[]>([]);
  const [name, setName] = useState<string | (string | null)[] | null>("");
  const [sideBar, setSideBar] = useState<sideBarType[]>([]);
  const { toast } = useToast()

  useEffect(() =>{
    socket = io(url);
    setName(userData.name);

    socket.emit("room", userData, (error: string) =>{
      if(error){
        return toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: error,
        })
      }
    })

    socket.on("sidebarData", (users: []) =>{
      setSideBar(() => users);
    })

   return () =>{
    socket.disconnect();
    socket.off();
   } 
  }, [search, toast])

  useEffect(() =>{
    socket.on("message", (msg: messageObj) =>{
      setMessages((prev) => [...prev, msg])
    })

    return () =>{
      socket.off("message");
    }
  }, [messages]);


  const messageInputHandler = (event: ChangeEvent<HTMLInputElement>) =>{
    setMessage(() => event.target.value);
  }

  const sendMessageHandler = (event: FormEvent<HTMLFormElement>) =>{
    event.preventDefault();
    if(message.trim().length > 0){
      socket.emit("message", message, (error: string) =>{
        if(error){
          return toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: error,
          })
        }
      });
    }

    setMessage(() => "");
  }

  const sendLocationHandler = () =>{
    if(!navigator.geolocation){
      return toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Your browser doesn't support this feature",
      })
    }

    navigator.geolocation.getCurrentPosition((location) =>{
    const cords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude 
    }

    socket.emit("location", cords, (error: string) =>{
      if(error){
        return toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: error,
        })
      }   
    })

    }, (error) =>{
      if(error){
        return toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "Error getting location. You have denied location permission!",
        })
      } 
    });
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">

      <div className="hidden border-r bg-muted/40 md:block">
      <ScrollArea className="flex flex-col w-full items-start gap-4 md:p-4 md:pb-11 pb-11 p-1 max-h-screen">
        <SideBarLg data={sideBar}/>
      </ScrollArea>
      </div>

      <div className="flex flex-col">
        <header className="flex h-14 md:justify-end justify-between items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <ScrollArea className="flex flex-col w-full items-start gap-4 md:p-4 md:pb-11 pb-11 p-1 max-h-screen">
            <SideBarSm data={sideBar}/>
          </ScrollArea>

          <div className="flex justify-center items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="rounded-full">
                  <Avatar>
                    <AvatarImage src={`/images/${userData.icon}.png`} alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                <Link to="/">Leave</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <ModeToggle />
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-4 p-2 lg:gap-6">

          <div className="flex items-center">
            <h1 className="text-lg font-bold md:text-2xl uppercase">{`Chat-Room-${sideBar[0]?.room}`}</h1>
          </div>

          <div className="relative flex flex-1 p-2 items-start justify-center rounded-lg border border-dashed shadow-sm" x-chunk="dashboard-02-chunk-1">
            
            <ScrollArea className="flex flex-col w-full items-start gap-4 md:p-4 md:pb-11 pb-11 p-1 max-h-[450px]">
              
              {messages && messages.map((message, i) =>{
                  if(message.username === name){
                    return( <MessageBar key={i} align="justify-end" msg={message}/> ) 
                  }
                  return( <MessageBar key={i} align="justify-start" msg={message}/> ) 
              })}

            </ScrollArea>

            <form onSubmit={sendMessageHandler} className="absolute bg-sendMsg rounded-lg flex justify-center items-center gap-2 bottom-0 w-full p-2">
              <Input
                type="text"
                placeholder="Search products..."
                value={message}
                className="w-full"
                onChange={messageInputHandler}
              />
              <Button type="submit" variant="secondary" className="sm:block hidden">Send Message</Button>
              <Button type="submit" variant="secondary" className="sm:hidden block"> <IoIosSend size={25} className="sm:hidden block"/> </Button>
              <Button type="button" variant="outline" onClick={sendLocationHandler} className="sm:block hidden">Send Location</Button>
              <Button type="button" variant="outline" onClick={sendLocationHandler} className="sm:hidden block p-2"> <FaLocationDot size={20} className="sm:hidden block"/> </Button>
            </form>
          </div>

        </main>
      </div>
    </div>
  )
}

export const chatLoader: LoaderFunction = ({request}) =>{
  const queryParams = new URL(request.url).searchParams;
  const name = queryParams.get("name");
  const room = queryParams.get("room");
  const icon = queryParams.get("icon");

  if(!name || !room || !icon){
    return redirect("/");
  }

  return null;
}

export default chatRoom;