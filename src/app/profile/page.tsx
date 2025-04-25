// ToDo:
// Settings to add - Name, Email, Phone Number, Address, Resume, Skills, Job Preferences

import { SidebarProvider, SidebarTrigger } from '~/components/ui/sidebar';
import ProfilePageSideBar from './components/profile-page-sidebar';

export default function ProfilePage() {
  return (
    <div className="container h-full w-full items-center justify-center gap-3 px-2 py-5 sm:w-3/4 md:w-3/5">
      <h2 className="self-start text-4xl font-extrabold sm:text-5xl">Information</h2>
    </div>
  );
}
