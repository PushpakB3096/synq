'use client';

import { UploadDropzone } from '@/lib/uploadthing';
import { X } from 'lucide-react';
import Image from 'next/image';

import '@uploadthing/react/styles.css';

interface FileUploadProps {
  endpoint: 'messageFile' | 'serverImage';
  value: string;
  onChange: (url?: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({
  endpoint,
  onChange,
  value
}) => {
  const fileType = value?.split('.').pop();

  if (value && fileType !== 'pdf') {
    return (
      <div className='relative h-20 w-20'>
        <Image fill src={value} alt='Upload' className='rounded-full' />
        <button
          className='absolute bg-rose-500 text-white p-1 rounded-full top-0 right-0 shadow-sm'
          onClick={() => onChange('')}
          type='button'
        >
          <X className='h-4 w-4' />
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={res => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        console.error(error);
      }}
    />
  );
};

export default FileUpload;
