import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

export type messageObj = {
  message: string,
  username?: string,
  time?: string,
  date?: string
}

function MessageBar({align, msg} : {align: string, msg: messageObj}) {
  return (
    <section className={`flex items-start w-full gap-2 ${align} mb-2`}>
      <Avatar>
        <AvatarImage src="/images/avatar.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <div className="flex flex-col">
        <p className="font-bold text-[11px]">
          {msg.username}
        </p>
        <p className="bg-muted p-1 rounded-md md:text-base text-sm md:max-w-96 sm:max-w-72 max-w-52">
          {
          (msg.message.trim().toLowerCase().startsWith("https")) ? <a href={msg.message}>{msg.message}</a> : `${msg.message}`
          }

        </p>
        <time className="font-bold text-[9px]">{msg.time}</time>
      </div>
    </section>
  )
}

export default MessageBar