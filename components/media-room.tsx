"use client";

import { useEffect, useState } from "react";

import { useUser } from "@clerk/nextjs";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import { Loader2 } from "lucide-react";

import "@livekit/components-styles";

interface MediaRoomProps {
  chatId: string;
  video?: boolean;
  audio?: boolean;
}

const MediaRoom: React.FC<MediaRoomProps> = ({
  audio = false,
  chatId,
  video = false
}) => {
  const [token, setToken] = useState<string>("");
  const { user } = useUser();

  const random4DigitNumber = () => {
    // Generate a random number between 1000 and 9999 (inclusive)
    return Math.floor(Math.random() * 9000) + 1000;
  };

  useEffect(() => {
    if (
      typeof user?.firstName == "undefined" ||
      typeof user?.lastName == "undefined"
    )
      return;

    const name = `${user.firstName ?? ""} ${
      user.lastName ?? ""
    } - ${random4DigitNumber()}`;
    // adding random4DigitNumber to prevent disconnected livekit if 2 person have same name

    (async () => {
      try {
        const response = await fetch(
          `/api/livekit?room=${chatId}&username=${name}`
        );
        const data = await response.json();
        setToken(data.token);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [chatId, user?.firstName, user?.lastName]);

  if (token === "") {
    return (
      <div className="flex flex-1 flex-col items-center justify-center">
        <Loader2 className="my-4 h-7 w-7 animate-spin text-zinc-500" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">Loading...</p>
      </div>
    );
  }

  return (
    <LiveKitRoom
      data-lk-theme="default"
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      token={token}
      connect
      video={video}
      audio={audio}
    >
      <VideoConference />
    </LiveKitRoom>
  );
};

export default MediaRoom;
