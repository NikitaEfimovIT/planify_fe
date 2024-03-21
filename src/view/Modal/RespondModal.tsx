import { Button, CircularProgress, Dialog, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OPEN_RESPONSE_MODAL } from "@src/store/response/responseTypes";
import { makeStyles } from "tss-react/mui";
import { makeResponse } from "@src/store/response/responseActions";
import useDebounce from "@src/hooks/useDebounce";
import { v4 } from "uuid";

const useStyles = makeStyles()((theme) => ({
  root: {
    padding: "0 1em 1em 1em",
    display: "flex",
    flexDirection: "column",
  },
  container: {
    display: "flex",
    flexDirection: "column",
  },
}));
export const RespondModal: React.FC<{ responses: any; roomID: number }> = ({ responses, roomID }) => {
  const { classes } = useStyles();
  const open = useSelector((state: any) => state.response.open);
  const isSending = useSelector((state: any) => state.response.isSending);
  const debouncedIsSending = useDebounce(isSending, 200);
  const debouncedOpen = useDebounce(open, 200);
  const dispatch = useDispatch<any>();
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const groupedResponses = responses.reduce((acc: any, response: any) => {
    let key = response.date.toLocaleString().split(",")[0];

    if (!acc[key]) {
      acc[key] = [];
    }

    acc[key].push(`${response.date.getHours()}:00`);

    return acc;
  }, {});

  const handleSubmit = (e: any) => {
    console.log("here");
    e.preventDefault();
    if (!name) {
      setError(true);
      return false;
    }

    const data = {
      number: roomID.toString(),
      response: {
        responseID: v4(),
        name: name,
        availableTimes: groupedResponses,
      },
    };

    dispatch(makeResponse(data));
  };

  return (
    <Dialog open={debouncedOpen} onClose={() => dispatch({ type: OPEN_RESPONSE_MODAL })}>
      <form onSubmit={handleSubmit}>
        <div className={classes.root}>
          <h2>Enter your name before sending your available time</h2>
          <div className={classes.container}>
            <TextField
              variant={"outlined"}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError(false);
              }}
              fullWidth
              label={"Name"}
              style={{ marginBottom: "1em" }}
              helperText={error && "This field must not be empty"}
              error={error}
            ></TextField>
            <Button variant={"contained"} type={"submit"} disabled={isSending}>
              {debouncedIsSending ? <CircularProgress /> : "Send"}{" "}
            </Button>
          </div>
        </div>
      </form>
    </Dialog>
  );
};
