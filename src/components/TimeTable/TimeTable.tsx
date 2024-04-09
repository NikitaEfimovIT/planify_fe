import {
  Button,
  Grid,
  SwipeableDrawer,
  Tab,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
  tabsClasses,
  useMediaQuery,
  useTheme,
} from "@mui/material";
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
    height: "100px",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "&:hover": {
      backgroundColor: theme.palette.primary.light,
      cursor: "pointer",
    },
    [theme.breakpoints.down("xs")]: {
      height: 65,
    },
  },
  timeCellSelected: {
    border: `1px solid ${theme.palette.primary.dark}`,
    borderRadius: "20px",
    padding: "5px",
    height: "100px",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.palette.secondary.main,
    "&:hover": {
      cursor: "pointer",
    },
    [theme.breakpoints.down("xs")]: {
      height: 65,
    },
  },
  tabs: {
    width: "100%",
    "& .MuiTabs-flexContainer": {
      justifyContent: "space-evenly",
      [theme.breakpoints.down("md")]: {
        overflow: "scroll",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      },
    },
    // [theme.breakpoints.down("md")]: {
    //   "& .MuiTabs-flexContainer": {
    //     overflow: "scroll",
    //     scrollbarWidth: "none",
    //     msOverflowStyle: "none",
    //   },
    // },
  },
}));

const TimeCell: React.FC<{ value: TimeBlock; index: number; onSelectHandler?: any }> = ({
  value,
  index,
  onSelectHandler,
}) => {
  const theme = useTheme();
  const { classes } = useStyles();
  console.log(value);
  return onSelectHandler ? (
    <Grid
      item
      md={3}
      xs={12}
      // style={{ border: `1px solid ${theme.palette.primary.dark}`, borderRadius: "10px", margin: "0 0 10px 10px" }}

      key={index}
      id={index.toString()}
      onClick={() => onSelectHandler(value)}
    >
      <div className={value.isSelected ? classes.timeCellSelected : classes.timeCell}>{value.date.getHours()}:00</div>
    </Grid>
  ) : (
    <Grid item md={3} xs={12} key={index} id={index.toString()}>
      <div
        style={{
          backgroundColor: `rgba(${251 - value.color * 20}, ${value.color !== 0 ? 255 : 249}, ${
            251 - value.color * 20
          }, 1)`,
        }}
        className={classes.timeCell}
      >
        {value.date.getHours()}:00
      </div>
    </Grid>
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
  const [currentDay, setCurrentDay] = useState(0);
  const { classes } = useStyles();
  const theme = useTheme();

  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));

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
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", marginTop: "2em" }}>
      <Tabs
        className={classes.tabs}
        value={currentDay}
        variant="scrollable"
        onChange={(e, newValue) => setCurrentDay(newValue)}
        sx={
          isSmDown
            ? {
                [`& .${tabsClasses.indicator}`]: {
                  display: "none",
                },
              }
            : null
        }
      >
        {dates.map((date, index) => (
          <Tab
            style={{ borderBottom: "none", textAlign: "center" }}
            label={date.toLocaleString("en", { day: "numeric", month: "long" })}
            key={index}
            tabIndex={index}
          />
        ))}
      </Tabs>
      <Grid container spacing={3} style={{ marginTop: isSmDown ? 0 : "1em", width: "100%" }}>
        {Array.from(Array(24).keys()).map((hour, index) => {
          const currentDate = new Date(dates[currentDay].setHours(hour, 0, 0, 0));
          const id = currentDate.getTime();
          return (
            <TimeCell
              index={id}
              value={{
                id: id,
                date: currentDate,
                isSelected: Boolean(formState.values.find((elem) => elem.id === id)),
                color:
                  room?.availability[dates[currentDay].toLocaleString().split(",")[0]]?.[
                    `${currentDate.getHours()}:00`
                  ] || 0,
                amountOfSelection: 0,
              }}
              onSelectHandler={isSelectMode ? onSelectHandler : null}
            />
            // <Grid item md={3}>
            //   {id}
            // </Grid>
          );
        })}
      </Grid>
      {/*<Table style={{ padding: "2em 0", borderSpacing: "30px 10px", borderCollapse: "separate" }}>*/}
      {/*  <TableHead>*/}
      {/*    <TableRow>*/}
      {/*      {dates.map((date, index) => (*/}
      {/*        <TableCell style={{ borderBottom: "none", textAlign: "center" }} key={index}>*/}
      {/*          <h3>{date.toLocaleString().split(",")[0]}</h3>*/}
      {/*        </TableCell>*/}
      {/*      ))}*/}
      {/*    </TableRow>*/}
      {/*  </TableHead>*/}
      {/*  <tbody>*/}
      {/*    {Array.from(Array(24).keys()).map((hour, index) => {*/}
      {/*      return (*/}
      {/*        <TableRow key={index}>*/}
      {/*          {dates.map((date) => {*/}
      {/*            const currentDate = new Date(date.setHours(hour, 0, 0, 0));*/}
      {/*            const id = currentDate.getTime();*/}
      {/*            return (*/}
      {/*              <TimeCell*/}
      {/*                index={id}*/}
      {/*                value={{*/}
      {/*                  id: id,*/}
      {/*                  date: currentDate,*/}
      {/*                  isSelected: Boolean(formState.values.find((elem) => elem.id === id)),*/}
      {/*                  color:*/}
      {/*                    room?.responses[date.toLocaleString().split(",")[0]]?.find(*/}
      {/*                      (elem: any) => elem.time === `${currentDate.getHours()}:00`,*/}
      {/*                    ) || 0,*/}
      {/*                  amountOfSelection: 0,*/}
      {/*                }}*/}
      {/*                onSelectHandler={isSelectMode ? onSelectHandler : null}*/}
      {/*              />*/}
      {/*            );*/}
      {/*          })}*/}
      {/*        </TableRow>*/}
      {/*      );*/}
      {/*    })}*/}
      {/*  </tbody>*/}
      {/*</Table>*/}
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
