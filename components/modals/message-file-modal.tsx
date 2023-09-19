'use client';

import { useForm } from 'react-hook-form';
import * as z from 'zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import FileUpload from '@/components/file-upload';
import { useModal } from '@/hooks/useModalStore';
import qs, { StringifiableRecord } from 'query-string';

interface MessageFileModalProps {}

const formSchema = z.object({
  fileUrl: z.string().min(1, {
    message: 'Attachment is required'
  })
});

const MessageFileModal: React.FC<MessageFileModalProps> = ({}) => {
  const {
    isOpen,
    onClose,
    type,
    data: { apiUrl, query }
  } = useModal();
  const router = useRouter();

  const isModalOpen = isOpen && type === 'messageFile';

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fileUrl: ''
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: apiUrl || '',
        query: query as StringifiableRecord
      });
      await axios.post(url, {
        ...values,
        content: values.fileUrl
      });

      form.reset();
      router.refresh();
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const isLoading = form.formState.isSubmitting;

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className='bg-white text-black p-0 overflow-hidden'>
        <DialogHeader className='pt-8 px-6'>
          <DialogTitle className='text-2xl text-center font-bold'>
            Add an attachment
          </DialogTitle>
          <DialogDescription className='text-center text-zinc-500'>
            Send a file as a message
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form className='space-y-8' onSubmit={form.handleSubmit(onSubmit)}>
            <div className='space-y-8 px-6'>
              <div className='flex items-center justify-center text-center'>
                <FormField
                  control={form.control}
                  name='fileUrl'
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <FileUpload
                          endpoint='messageFile'
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <DialogFooter className='bg-gray-100 px-6 py-4'>
              <Button disabled={isLoading} variant={'primary'}>
                Send
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default MessageFileModal;
