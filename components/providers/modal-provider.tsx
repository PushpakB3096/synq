'use client';

import { useEffect, useState } from 'react';

import InviteModal from '@/components/modals/invite-modal';

import CreateChannelModal from '../modals/create-channel-modal';
import CreateServerModal from '../modals/create-server-modal';
import DeleteChannelModal from '../modals/delete-channel-modal';
import DeleteMessageModal from '../modals/delete-message-modal';
import DeleteServerModal from '../modals/delete-server-modal';
import EditChannelModal from '../modals/edit-channel-modal';
import EditServerModal from '../modals/edit-server-modal';
import LeaveServerModal from '../modals/leave-server-modal';
import MemberModal from '../modals/members-modal';
import MessageFileModal from '../modals/message-file-modal';

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateServerModal />
      <InviteModal />
      <EditServerModal />
      <MemberModal />
      <CreateChannelModal />
      <LeaveServerModal />
      <DeleteServerModal />
      <DeleteChannelModal />
      <EditChannelModal />
      <MessageFileModal />
      <DeleteMessageModal />
    </>
  );
};
