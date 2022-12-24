import "./App.css";
import { useSocket } from "./hooks/useSocket";
import { Box, Grid } from "@mui/material";
import { useRedisEntries } from "./hooks/useRedisEntries";
import ReactTimeAgo from "react-time-ago";
import { useEffect, useState } from "react";

function App() {
  const socket = useSocket();
  const redisEntries = useRedisEntries(socket);
  const entries = Array.from(redisEntries.entries());
  console.log({ entries });
  return (
    <div>
      {entries
        .sort((a, b) => b[1].updatedOn.valueOf() - a[1].updatedOn.valueOf())
        .map((entry, index) => (
          <RedisEntry
            key={entry[0]}
            keyVal={entry[0]}
            values={entry[1].val}
            updatedOn={entry[1].updatedOn}
            color={index % 2}
          />
        ))}
    </div>
  );
}

const RedisEntry = ({ keyVal, values, updatedOn, color }) => {
  const backgroundColor = color === 1 ? "white" : "lightgrey";
  return (
    <Grid container p={2} style={{ background: backgroundColor }}>
      <Grid item xs={4}>
        <Box style={{ overflow: "hidden" }}>{keyVal}</Box>
      </Grid>
      <Grid item xs={4}>
        {values}
      </Grid>
      <Grid item xs={2}>
        <TimeAgo updatedOn={updatedOn} />
      </Grid>
    </Grid>
  );
};

const TimeAgo = ({ updatedOn }) => {
  // const [time, setTime] = useState(0);
  // useEffect(() => {
  //   const timer = setTim;
  // }, []);
  return <ReactTimeAgo date={updatedOn} locale="en-US" updateInterval={1} />;
};

export default App;
