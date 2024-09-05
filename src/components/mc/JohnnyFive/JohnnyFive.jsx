import { useEffect, useState } from "react";
import socket from "../../../services/socket";

const JohnnyFive = () => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const onConnect = () => {
      setIsConnected(true);
    };

    const onDisconnect = () => {
      setIsConnected(false);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  const blinkJohnny = () => {
    socket.emit("blink", { delay: 200 });
  };

  const turnOn = () => {
    socket.emit("turnOn");
  };

  const turnOff = () => {
    socket.emit("turnOff");
  };

  const startFade = () => {
    socket.emit("startFade");
  };

  const stopFade = () => {
    socket.emit("stopFade");
  };

  return (
    <div className={"center-page"}>
      <h1>
        <span className={"highlight-word"}>Johnny</span> is{" "}
        {isConnected ? "connected" : "disconnected"}
      </h1>

      <button className={"blink-johnny"} onClick={blinkJohnny}>
        Blink Johnny
      </button>
      <button className={"turn-on"} onClick={turnOn}>
        ON
      </button>
      <button className={"turn-off"} onClick={turnOff}>
        OFF
      </button>
      <button className={"fade-on"} onClick={startFade}>
        Start Fade
      </button>
      <button className={"fade-off"} onClick={stopFade}>
        Stop Fade
      </button>
    </div>
  );
};

export default JohnnyFive;
