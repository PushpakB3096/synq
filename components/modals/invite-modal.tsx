"use client";

import { useState } from "react";

import axios from "axios";
import { Check, Copy, RefreshCw } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/useModalStore";
import { useOrigin } from "@/hooks/useOrigin";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface InviteModalProps {}

const InviteModal: React.FC<InviteModalProps> = ({}) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { isOpen, onClose, onOpen, type, data } = useModal();
  const origin = useOrigin();

  const onCopy = () => {
    navigator.clipboard.writeText(inviteUrl);

    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  const handleNewLink = async () => {
    try {
      setIsLoading(true);
      const response = await axios.patch(
        `/api/servers/${data.server?.id}/invite-code`
      );

      onOpen("invite", { server: response.data });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const isModalOpen = isOpen && type === "invite";
  const inviteUrl = `${origin}/invite/${data.server?.inviteCode}`;

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-hidden bg-white p-0 text-black">
        <DialogHeader className="px-6 pt-8">
          <DialogTitle className="text-center text-2xl font-bold">
            Invite Friends
          </DialogTitle>
        </DialogHeader>

        <div className="p-6">
          <Label className="text-xs font-bold uppercase text-zinc-500 dark:text-secondary/70">
            Server invite link
          </Label>

          <div className="item-center mt-2 flex gap-x-2">
            <Input
              className="border-0 bg-zinc-300/50 text-black focus-visible:ring-0 focus-visible:ring-offset-0"
              value={inviteUrl}
              disabled={isLoading}
            />

            <Button size="icon" onClick={onCopy} disabled={isLoading}>
              {isCopied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>

          <Button
            variant="link"
            size="sm"
            className="mt-4 text-xs text-zinc-500"
            disabled={isLoading}
            onClick={handleNewLink}
          >
            Generate a new link
            <RefreshCw className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InviteModal;
