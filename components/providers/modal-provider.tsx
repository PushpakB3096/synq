'use client';

import InviteModal from '@/components/modals/invite-modal';
import { useEffect, useState } from 'react';
import CreateServerModal from '../modals/create-server-modal';
import EditServerModal from '../modals/edit-server-modal';

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
      <InviteModal />
      <CreateServerModal />
      <EditServerModal />
    </>
  );
};
