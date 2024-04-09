import React, { useEffect } from "react";
import { FallbackProps } from "react-error-boundary";
import { Button } from "@mui/material";

export const ErrorPage = (props: FallbackProps) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        height: "100%",
        alignItems: "center",
      }}
    >
      <h1>Something went wrong, sorry :(</h1>
      <h2>Error: {props.error.message}</h2>
      <Button variant={"contained"} onClick={() => (window.location.href = "/")}>
        Home
      </Button>
    </div>
  );
};
