import { currentProfile } from '@/lib/current-profile';
import { db } from '@/lib/db';
import { redirectToSignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

interface InviteCodePageProps {
  params: {
    inviteCode: string;
  };
}

const InviteCodePage: React.FC<InviteCodePageProps> = async ({
  params: { inviteCode }
}) => {
  const profile = await currentProfile();

  if (!profile) {
    redirectToSignIn();
  }

  if (!inviteCode) {
    redirect('/');
  }

  // checking if the user is already a part of this server
  const existingServer = await db.server.findFirst({
    where: {
      inviteCode,
      members: {
        some: {
          profileId: profile?.id
        }
      }
    }
  });

  if (existingServer) {
    return redirect(`/servers/${existingServer.id}`);
  }

  const server = await db.server.update({
    where: {
      inviteCode
    },
    data: {
      members: {
        create: [{ profileId: profile?.id! }]
      }
    }
  });

  if (server) {
    redirect(`/servers/${server.id}`);
  }

  return null;
};

export default InviteCodePage;
