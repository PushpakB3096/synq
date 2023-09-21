'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { useModal } from '@/hooks/useModalStore';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import qs, { StringifiableRecord } from 'query-string';

interface DeleteMessageModalProps {}

const DeleteMessageModal: React.FC<DeleteMessageModalProps> = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    isOpen,
    onClose,
    type,
    data: { apiUrl, query }
  } = useModal();

  const onClick = async () => {
    try {
      setIsLoading(true);

      const url = qs.stringifyUrl({
        url: apiUrl || '',
        query: query as StringifiableRecord
      });

      await axios.delete(url);

      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const isModalOpen = isOpen && type === 'deleteMessage';

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className='bg-white text-black p-0 overflow-hidden'>
        <DialogHeader className='pt-8 px-6'>
          <DialogTitle className='text-2xl text-center font-bold'>
            Delete Message
          </DialogTitle>

          <DialogDescription className='text-center text-zinc-500'>
            Are you sure you want to do this? <br />
            The message will be permanently deleted.
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

export default DeleteMessageModal;