import React, { useEffect, useState } from "react";
import WidgetBot from "@widgetbot/react-embed";

function Discord() {
  const [hasWindow, setHasWindow] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") setHasWindow(true);
  }, []);

  return (
    <div>
      {hasWindow && (
        <>
          <h1 className="text-3xl text-center font-bold my-5 dark:text-white">
            Try our Discord bot!
          </h1>
          <WidgetBot
            server="1100044656244428891"
            channel="1100044656244428894"
            height={"600px"}
            className="w-full"
            data-testid="DiscordWidget"
          />
        </>
      )}
    </div>
  );
}

export default Discord;
