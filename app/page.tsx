import { Sidebar } from '@/components/Sidebar/Sidebar';
import { MobileNav } from '@/components/MobileNav/MobileNav';

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-background">
      <MobileNav />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
      </div>
    </div>
  );
}
