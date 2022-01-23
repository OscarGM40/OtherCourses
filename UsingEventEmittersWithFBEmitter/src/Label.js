import React, { useEffect, useState } from "react";
import { eventEmitter } from "./utils/EventEmitter";

const Label = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const onNewLog = (eventData) => {
      setLogs((prev) => [...prev, eventData]);
    };

    const listener = eventEmitter.addListener("NewLog", onNewLog);

    return () => {
      listener.remove();
    };
  }, []);

  console.log(logs);

  return (
    <div>
      {logs.map((log, index) => (
        <div key={index}>{log.text}</div>
      ))}
    </div>
  );
};

export default Label;
