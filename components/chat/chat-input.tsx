"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import qs, { StringifiableRecord } from "query-string";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { useModal } from "@/hooks/useModalStore";

import EmojiPicker from "../emoji-picker";
import { Input } from "../ui/input";

interface ChatInputProps {
  apiUrl: string;
  query: Record<PropertyKey, unknown>;
  name: string;
  type: "conversation" | "channel";
}

const formSchema = z.object({
  content: z.string().min(1)
});

const ChatInput: React.FC<ChatInputProps> = ({ apiUrl, name, query, type }) => {
  const { onOpen } = useModal();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      content: ""
    },
    resolver: zodResolver(formSchema)
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: apiUrl,
        query: query as StringifiableRecord
      });

      await axios.post(url, values);
      form.reset();
      router.refresh();
    } catch (error) {}
  };

  const isLoading = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative p-4 pb-6">
                  <button
                    type="button"
                    className="absolute left-8 top-7 flex h-[24px] w-[24px] items-center justify-center rounded-full bg-zinc-500 p-1 transition hover:bg-zinc-600 dark:bg-zinc-400 dark:hover:bg-zinc-300"
                    onClick={() => onOpen("messageFile", { apiUrl, query })}
                  >
                    <Plus className="text-white dark:text-[#313338]" />
                  </button>

                  <Input
                    disabled={isLoading}
                    className="border-0 border-none bg-zinc-200/90 px-14 py-6 text-zinc-600 focus-visible:ring-0 focus-visible:ring-offset-0 dark:bg-zinc-700/75 dark:text-zinc-200"
                    placeholder={`Message ${
                      type === "conversation" ? name : `#${name}`
                    }`}
                    {...field}
                  />

                  <div className="absolute right-8 top-7">
                    <EmojiPicker
                      onChange={(emoji) =>
                        field.onChange(`${field.value} ${emoji}`)
                      }
                    />
                  </div>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default ChatInput;
