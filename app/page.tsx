"use client"
import { FileExplorer } from '@/components/FileExplorer/FileEplorer';
import { getAllItems } from '@/lib/fun';

export default function Home() {
  const driveItems = getAllItems();
  console.log(driveItems)

  return (
    <FileExplorer driveItems={driveItems} />
  );
}
