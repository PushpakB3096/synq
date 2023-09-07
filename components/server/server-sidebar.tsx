import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';
import { redirectToSignIn } from '@clerk/nextjs';
import { ChannelType } from '@prisma/client';
import { redirect } from 'next/navigation';
import ServerHeader from './server-header';

interface ServerSidebarProps {
  serverId: string;
}

const ServerSidebar: React.FC<ServerSidebarProps> = async ({ serverId }) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect('/');
  }

  const server = await db.server.findUnique({
    where: {
      id: serverId
    },
    include: {
      channels: {
        orderBy: {
          createdAt: 'asc'
        }
      },
      members: {
        include: {
          profile: true
        },
        orderBy: {
          role: 'asc' // show admins first -> mods next -> guests
        }
      }
    }
  });

  const textChannels = server?.channels.filter(
    channel => channel.type === ChannelType.TEXT
  );
  const videoChannels = server?.channels.filter(
    channel => channel.type === ChannelType.VIDEO
  );
  const audioChannels = server?.channels.filter(
    channel => channel.type === ChannelType.AUDIO
  );

  // no need to show the logged in user
  const members = server?.members.filter(
    member => member.profileId !== profile.id
  );

  if (!server) {
    return redirect('/');
  }

  const role = server.members.find(
    member => member.profileId === profile.id
  )?.role;

  return (
    <div className='flex flex-col h-full text-primary w-full dark:bg-[#2B2D31] bg-[#F2F3F5]'>
      <ServerHeader server={server} role={role} />
    </div>
  );
};

export default ServerSidebar;
