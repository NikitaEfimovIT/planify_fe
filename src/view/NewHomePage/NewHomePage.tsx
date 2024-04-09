import { Button, Container, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import { useStyles } from "@src/view/NewHomePage/newHomePageStyles";
import { useDispatch } from "react-redux";
import { OPEN_MODAL } from "@src/store/room/roomTypes";
import mascot from "@src/images/mascot_colorfull.svg";
export const NewHomePage = () => {
  const { classes } = useStyles();

  const theme = useTheme();

  const isDownSm = useMediaQuery(theme.breakpoints.down("sm"));
  const isDownMd = useMediaQuery(theme.breakpoints.down("md"));

  const dispatch = useDispatch<any>();
  const onCreateClick = () => {
    dispatch({ type: OPEN_MODAL, payload: false });
  };

  const onJoinRoom = () => {
    dispatch({ type: OPEN_MODAL, payload: true });
  };

  return (
    <Container className={classes.root} maxWidth={false}>
      <Container className={classes.contentBox} maxWidth={"xl"}>
        <div className={classes.textBox}>
          <h1>
            What is <span className={classes.brandName}>PLANIFY</span>?
          </h1>
          {!isDownSm && (
            <>
              <p>
                Determining the best time for meetings, parties, or events is no longer a problem. We offer an
                innovative approach based on mathematical analysis and statistics to help you determine the most
                convenient time for all participants.
                <br />
                <br />
                Our tool takes into account various factors such as availability, preferences, and schedules of
                participants to suggest optimal time options for hosting events. We aim to make the planning process
                simpler and more efficient for everyone.
              </p>

              <h3 style={{ fontSize: "1.7em", fontWeight: 500 }}>
                Join us today and start planning your events to suit all participants!
              </h3>
            </>
          )}
          {isDownSm && (
            <>
              <p>
                Determining the best time for meetings, parties, or events is no longer a problem. Our innovative
                approach based on mathematical analysis and statistics helps find the most convenient time for all
                participants.
              </p>
              <p style={{ fontWeight: 500, marginTop: 0 }}>Join us today to plan events that suit everyone!</p>
            </>
          )}
          <div className={classes.buttonContainer}>
            <Button className={classes.buttonCreate} variant={"contained"} size={"large"} onClick={onCreateClick}>
              Create Lobby
            </Button>
            <p className={classes.textButton} onClick={onJoinRoom}>
              I have a room ID
            </p>
          </div>
        </div>
        {!isDownMd && <img alt={"img"} src={mascot} />}
      </Container>
    </Container>
  );
};
