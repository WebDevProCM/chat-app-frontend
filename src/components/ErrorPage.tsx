import { useRouteError } from "react-router-dom";

type RouteError = {
  statusText?: string;
  message?: string;
}

export default function ErrorPage() {
  const error = useRouteError() as RouteError
  console.error(error);

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-2">
      <h1 className="font-bold text-5xl">Oops!</h1>
      <p className="text-center">Sorry, an unexpected error has occurred.</p>
      <p className="font-bold">
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}