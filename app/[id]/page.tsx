
import { FileExplorer } from '@/components/FileExplorer/FileEplorer';
import { getItemById } from '@/lib/fun';

type PageProps = {
  params: { id: string };
};

export default function Home({ params }: PageProps) {
  const { id } = params;
  const driveItems = getItemById(id)

  return (
    <FileExplorer driveItems={driveItems?.child} />
  );
}
