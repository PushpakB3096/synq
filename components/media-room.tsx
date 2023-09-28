'use client';

import { useEffect, useState } from 'react';

import { useUser } from '@clerk/nextjs';
import { LiveKitRoom, VideoConference } from '@livekit/components-react';
import { Loader2 } from 'lucide-react';

import '@livekit/components-styles';

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
  const [token, setToken] = useState<string>('');
  const { user } = useUser();

  useEffect(() => {
    if (!user?.firstName || !user?.lastName) return;

    const name = `${user.firstName} ${user.lastName}`;

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

  if (token === '') {
    return (
      <div className='flex flex-col flex-1 justify-center items-center'>
        <Loader2 className='h-7 w-7 text-zinc-500 animate-spin my-4' />
        <p className='text-xs text-zinc-500 dark:text-zinc-400'>Loading...</p>
      </div>
    );
  }

  return (
    <LiveKitRoom
      data-lk-theme='default'
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
