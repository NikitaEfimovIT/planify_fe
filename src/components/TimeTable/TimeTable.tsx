import { Button, Table, TableCell, TableHead, TableRow, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Room } from "@src/store/room/roomTypes";
import { makeStyles } from "tss-react/mui";
import { RespondModal } from "@src/view/Modal/RespondModal";
import { OPEN_RESPONSE_MODAL } from "@src/store/response/responseTypes";
import { useDispatch } from "react-redux";

function getWeek(_current: number) {
  let current = new Date(parseInt(String(_current)));
  let week = [];
  let first = current.getDate() - current.getDay() + 1;
  for (let i = 0; i < 7; i++) {
    week.push(new Date(current.setDate(first++)));
  }
  return week;
}

export interface TimeBlock {
  id: number;
  date: Date;
  isSelected: boolean;
  color: number;
  amountOfSelection: number;
}

const useStyles = makeStyles()((theme) => ({
  timeCell: {
    border: `1px solid ${theme.palette.primary.dark}`,
    borderRadius: "20px",
    padding: "5px",
    textAlign: "center",
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
      cursor: "pointer",
    },
  },
  timeCellSelected: {
    border: `1px solid ${theme.palette.primary.dark}`,
    borderRadius: "20px",
    padding: "5px",
    textAlign: "center",
    backgroundColor: theme.palette.secondary.main,
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

const TimeCell: React.FC<{ value: TimeBlock; index: number; onSelectHandler?: any }> = ({
  value,
  index,
  onSelectHandler,
}) => {
  const theme = useTheme();
  const { classes } = useStyles();
  return onSelectHandler ? (
    <TableCell
      // style={{ border: `1px solid ${theme.palette.primary.dark}`, borderRadius: "10px", margin: "0 0 10px 10px" }}
      className={value.isSelected ? classes.timeCellSelected : classes.timeCell}
      key={index}
      id={index.toString()}
      onClick={() => onSelectHandler(value)}
    >
      {value.date.getHours()}:00
    </TableCell>
  ) : (
    <TableCell
      // style={{ border: `1px solid ${theme.palette.primary.dark}`, borderRadius: "10px", margin: "0 0 10px 10px" }}
      className={classes.timeCell}
      key={index}
      id={index.toString()}
      style={{
        backgroundColor: `rgba(${251 - value.color * 2}, ${249 - value.color * 2}, ${251 - value.color * 2}, 1)`,
      }}
    >
      {value.date.getHours()}:00
    </TableCell>
  );
};

export interface FormDefaultState {
  values: TimeBlock[];
}

const defaultState = (): FormDefaultState => ({
  values: [],
});

export const TimeTable: React.FC<{ isSelectMode: boolean; room: Room }> = ({ isSelectMode = false, room }) => {
  const [dates, setDates] = useState(getWeek(room.key));

  const [formState, setFormState] = useState(defaultState());

  useEffect(() => {
    if (!isSelectMode) setFormState(defaultState());
  }, [isSelectMode]);

  const dispatch = useDispatch<any>();

  const onSelectHandler = (timeBlock: TimeBlock) => {
    const existedTimeBlock = formState.values.findIndex((elem) => elem.id === timeBlock.id);

    // console.log(copy.values.splice(copy.values.indexOf(existedTimeBlock), 1));
    setFormState((prevState) => ({
      ...prevState,
      values:
        existedTimeBlock !== -1
          ? [
              ...prevState.values.slice(0, existedTimeBlock),
              ...prevState.values.slice(existedTimeBlock + 1, prevState.values.length),
            ]
          : [...prevState.values, { ...timeBlock, isSelected: true }],
    }));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Table style={{ padding: "2em 0", borderSpacing: "30px 10px", borderCollapse: "separate" }}>
        <TableHead>
          <TableRow>
            {dates.map((date, index) => (
              <TableCell style={{ borderBottom: "none", textAlign: "center" }} key={index}>
                <h3>{date.toLocaleString().split(",")[0]}</h3>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <tbody>
          {Array.from(Array(24).keys()).map((hour, index) => {
            return (
              <TableRow key={index}>
                {dates.map((date) => {
                  const currentDate = new Date(date.setHours(hour, 0, 0, 0));
                  const id = currentDate.getTime();
                  return (
                    <TimeCell
                      index={id}
                      value={{
                        id: id,
                        date: currentDate,
                        isSelected: Boolean(formState.values.find((elem) => elem.id === id)),
                        color: 0,
                        amountOfSelection: 0,
                      }}
                      onSelectHandler={isSelectMode ? onSelectHandler : null}
                    />
                  );
                })}
              </TableRow>
            );
          })}
        </tbody>
      </Table>
      <RespondModal responses={formState.values} roomID={room.key} />
      {isSelectMode && formState.values.length ? (
        <div style={{ position: "sticky", bottom: 0, paddingBottom: "4em", width: "200px", height: "fit-content" }}>
          <Button
            variant="contained"
            size="large"
            style={{ width: "100%" }}
            onClick={() => dispatch({ type: OPEN_RESPONSE_MODAL })}
          >
            SEND
          </Button>
        </div>
      ) : null}
    </div>
  );
};
