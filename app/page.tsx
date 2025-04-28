import { Sidebar } from '@/components/Sidebar/Sidebar';
import { MobileNav } from '@/components/MobileNav/MobileNav';
import { FileExplorer } from '@/components/FileExplorer/FileEplorer';

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-background">
      <MobileNav />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main className="flex-1 overflow-y-auto">
          <FileExplorer />
        </main>
      </div>
    </div>
  );
}
