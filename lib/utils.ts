import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { FileType } from './types';
import { FileText, Image, FileSpreadsheet, Presentation as FilePresentation, FileIcon, Video, Music, Archive, Code, File } from 'lucide-react';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFileIcon(fileType: FileType) {
  switch (fileType) {
    case 'document':
      return FileText;
    case 'image':
      return Image;
    case 'spreadsheet':
      return FileSpreadsheet;
    case 'presentation':
      return FilePresentation;
    case 'pdf':
      return FileIcon;
    case 'video':
      return Video;
    case 'audio':
      return Music;
    case 'archive':
      return Archive;
    case 'code':
      return Code;
    default:
      return File;
  }
}

export function getFileTypeColor(fileType: FileType): string {
  switch (fileType) {
    case 'document':
      return 'text-blue-500 bg-blue-50 dark:bg-blue-950 dark:text-blue-300';
    case 'image':
      return 'text-pink-500 bg-pink-50 dark:bg-pink-950 dark:text-pink-300';
    case 'spreadsheet':
      return 'text-green-500 bg-green-50 dark:bg-green-950 dark:text-green-300';
    case 'presentation':
      return 'text-amber-500 bg-amber-50 dark:bg-amber-950 dark:text-amber-300';
    case 'pdf':
      return 'text-red-500 bg-red-50 dark:bg-red-950 dark:text-red-300';
    case 'video':
      return 'text-purple-500 bg-purple-50 dark:bg-purple-950 dark:text-purple-300';
    case 'audio':
      return 'text-cyan-500 bg-cyan-50 dark:bg-cyan-950 dark:text-cyan-300';
    case 'archive':
      return 'text-stone-500 bg-stone-50 dark:bg-stone-950 dark:text-stone-300';
    case 'code':
      return 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950 dark:text-indigo-300';
    default:
      return 'text-gray-500 bg-gray-50 dark:bg-gray-900 dark:text-gray-300';
  }
}