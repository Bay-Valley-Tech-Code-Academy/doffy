import { SidebarProvider, SidebarTrigger } from '~/components/ui/sidebar';
import ProfilePageSideBar from './components/profile-page-sidebar';

export default function ProfilePageLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="h-[calc(100dvh-65px)] w-full">
      <SidebarProvider className="h-full min-h-[calc(100dvh-65px)]" defaultOpen>
        <ProfilePageSideBar />
        <div className="flex h-full w-full flex-col items-center justify-center">
          <SidebarTrigger className="self-start" />
          <div className="container h-full w-full items-center justify-center gap-3 px-2 py-5 sm:w-3/4 md:w-3/5">
            {children}
          </div>
        </div>
      </SidebarProvider>
    </main>
  );
}
