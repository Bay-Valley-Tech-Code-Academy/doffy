import { SidebarProvider, SidebarTrigger } from '~/components/ui/sidebar';
import ProfilePageSideBar from './components/profile-page-sidebar';

export default function ProfilePageLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="h-[calc(100dvh-65px)] w-full">
      <SidebarProvider className='h-full min-h-[calc(100dvh-65px)]' defaultOpen>
        <ProfilePageSideBar />
        <div className='w-full'>
          <SidebarTrigger />
          {children}
        </div>
      </SidebarProvider>
    </main>
  );
}
