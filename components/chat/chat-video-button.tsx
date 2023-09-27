'use client';

import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import qs from 'query-string';
import ActionTooltip from '../action-tooltip';
import { Video, VideoOff } from 'lucide-react';

interface ChatVideoButtonProps {}

const ChatVideoButton: React.FC<ChatVideoButtonProps> = ({}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const onClick = () => {
    const url = qs.stringifyUrl(
      {
        url: pathname || '',
        query: {
          video: isVideo ? null : true
        }
      },
      { skipNull: true }
    );

    router.push(url);
  };

  const isVideo = searchParams?.get('video');
  const tooltipLabel = isVideo ? 'End Video Call' : 'Start Video Call';
  const Icon = isVideo ? VideoOff : Video;

  return (
    <ActionTooltip side='bottom' label={tooltipLabel}>
      <button onClick={onClick} className='hover:opacity-75 transition mr-4'>
        <Icon className='h-6 w-6 text-zinc-500 dark:text-zinc-400' />
      </button>
    </ActionTooltip>
  );
};

export default ChatVideoButton;
