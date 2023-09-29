import { redirectToSignIn } from "@clerk/nextjs";
import { ChannelType } from "@prisma/client";
import { redirect } from "next/navigation";

import ChatHeader from "@/components/chat/chat-header";
import ChatInput from "@/components/chat/chat-input";
import ChatMessages from "@/components/chat/chat-messages";
import MediaRoom from "@/components/media-room";
import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

interface ChannelIdPageProps {
  params: {
    serverId: string;
    channelId: string;
  };
}

const ChannelIdPage: React.FC<ChannelIdPageProps> = async ({
  params: { channelId, serverId }
}) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const channel = await db.channel.findUnique({
    where: {
      id: channelId
    }
  });

  const member = await db.member.findFirst({
    where: {
      serverId: serverId,
      profileId: profile.id
    }
  });

  if (!channel || !member) {
    redirect("/");
  }

  return (
    <div className="flex h-full flex-col bg-white dark:bg-[#313338]">
      <ChatHeader
        name={channel.name}
        serverId={channel.serverId}
        type="channel"
      />

      {channel.type === ChannelType.TEXT && (
        <>
          <ChatMessages
            member={member}
            name={channel.name}
            chatId={channel.id}
            type="channel"
            apiUrl="/api/messages"
            socketUrl="/api/socket/messages"
            socketQuery={{
              channelId: channel.id,
              serverId: channel.serverId
            }}
            paramKey="channelId"
            paramValue={channel.id}
          />
          <ChatInput
            apiUrl="/api/socket/messages"
            name={channel.name}
            type="channel"
            query={{
              channelId: channel.id,
              serverId: channel.serverId
            }}
          />
        </>
      )}

      {channel.type === ChannelType.AUDIO && (
        <MediaRoom chatId={channel.id} audio />
      )}

      {channel.type === ChannelType.VIDEO && (
        <MediaRoom chatId={channel.id} video />
      )}
    </div>
  );
};

export default ChannelIdPage;
