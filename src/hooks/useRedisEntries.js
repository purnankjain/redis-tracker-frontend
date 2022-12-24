import React, { useEffect, useState } from "react";

export const useRedisEntries = (socket) => {
  const [redisEntries, setRedisEntries] = useState(new Map());

  useEffect(() => {
    if (socket === null || socket?.id === undefined) {
      return;
    }
    socket.on("update", ({ key, val }) => {
      setRedisEntries((prev) => {
        const newMap = new Map(prev);
        newMap.set(key, { val, updatedOn: new Date() });
        return newMap;
      });
    });
  }, [socket?.id]);

  return redisEntries;
};
