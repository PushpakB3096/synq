"use client";

import { useState } from "react";

import axios from "axios";
import { useRouter } from "next/navigation";
import qs from "query-string";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/useModalStore";

interface DeleteChannelModalProps {}

const DeleteChannelModal: React.FC<DeleteChannelModalProps> = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    isOpen,
    onClose,
    type,
    data: { server, channel }
  } = useModal();
  const router = useRouter();

  const onClick = async () => {
    try {
      setIsLoading(true);

      const url = qs.stringifyUrl({
        url: `/api/channels/${channel?.id}`,
        query: {
          serverId: server?.id
        }
      });

      await axios.delete(url);
      router.refresh();
      onClose();
      router.push(`/servers/${server?.id}`);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const isModalOpen = isOpen && type === "deleteChannel";

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden bg-white p-0 text-black">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-center text-2xl font-bold">
            Delete Channel
          </DialogTitle>

          <DialogDescription className="text-center text-zinc-500">
            Are you sure you want to do this? <br />
            <span className="font-semibold text-indigo-500">
              #{channel?.name}{" "}
            </span>{" "}
            will be permanently deleted.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex w-full items-center justify-between">
            <Button disabled={isLoading} variant={"ghost"} onClick={onClose}>
              Cancel
            </Button>
            <Button disabled={isLoading} variant={"primary"} onClick={onClick}>
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteChannelModal;
