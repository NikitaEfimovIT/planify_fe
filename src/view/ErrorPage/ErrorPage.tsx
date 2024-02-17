import React, { useEffect } from "react";
import { FallbackProps } from "react-error-boundary";

export const ErrorPage = (props: FallbackProps) => {

  return <div style={{display: "flex", justifyContent: "center", flexDirection: "column", alignItems:"center"}}>
    <h1>Something went wrong, sorry :(</h1>
    <h2>Error: {props.error.message}</h2>
  </div>
}
