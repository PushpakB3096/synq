'use client';

import { useState } from 'react';

import axios from 'axios';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { useModal } from '@/hooks/useModalStore';


interface DeleteServerModalProps {}

const DeleteServerModal: React.FC<DeleteServerModalProps> = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    isOpen,
    onClose,
    type,
    data: { server }
  } = useModal();
  const router = useRouter();

  const onClick = async () => {
    try {
      setIsLoading(true);

      await axios.delete(`/api/servers/${server?.id}`);
      router.refresh();
      router.push('/');
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const isModalOpen = isOpen && type === 'deleteServer';

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className='bg-white text-black p-0 overflow-hidden'>
        <DialogHeader className='pt-8 px-6'>
          <DialogTitle className='text-2xl text-center font-bold'>
            Delete Server
          </DialogTitle>

          <DialogDescription className='text-center text-zinc-500'>
            Are you sure you want to do this? <br />
            <span className='text-indigo-500 font-semibold'>
              {server?.name}{' '}
            </span>{' '}
            will be permanently deleted.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className='bg-gray-100 px-6 py-4'>
          <div className='flex items-center justify-between w-full'>
            <Button disabled={isLoading} variant={'ghost'} onClick={onClose}>
              Cancel
            </Button>
            <Button disabled={isLoading} variant={'primary'} onClick={onClick}>
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteServerModal;
