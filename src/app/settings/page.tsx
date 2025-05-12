import Link from 'next/link';
import { LogOut, User } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { Separator } from '~/components/ui/separator';
import { SignOutButton } from '~/components/client/signout-button';

export default function SettingsPage() {
  interface AccountSettingsData {
    accountType: string;
    email: string;
    phone: string;
  }

  const sampleData: AccountSettingsData = {
    accountType: 'Job Seeker',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
  };

  return (
    <main>
      <div className="flex h-[calc(100vh-4rem)] items-start justify-center p-3">
        <div className="flex flex-1 flex-col justify-center p-4">
          <nav className="text-[2.25rem] font-bold leading-[1.25]">
            <h1>Settings</h1>
            {/* TODO: Substitute Link tag here but dont know how routing works */}
            <div className="flex flex-col items-center justify-center">
              {/* I want this to be an unordered list because this will be the sidebar and well add more things to it along the way */}
              <ul>
                <li>
                  <a className="flex flex-row" href="">
                    <div className="self-center">
                      <User />
                    </div>
                    <div className="flex flex-col gap-2 p-4 text-lg">
                      <h2 className="font-bold">Account Information</h2>
                      <p>Your Contact Information</p>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
        <div className="flex h-full flex-[2] flex-col p-11">
          <div className="flex flex-col justify-around gap-11">
            <h1 className="text-2xl font-bold">Account Settings</h1>

            <div className="flex flex-row justify-between">
              <div>
                <h3 className="font-bold">Account Type:</h3>
                <p>{sampleData.accountType}</p>
              </div>
              <div>
                <Button>Change account type</Button>
              </div>
            </div>
            <Separator />
            <div className="flex flex-row justify-between">
              <div>
                <h3 className="font-bold">Email:</h3>
                <p>{sampleData.email}</p>
              </div>
              <div>
                <div className="flex flex-col gap-2">
                  <Button>Change email address</Button>
                </div>
              </div>
            </div>
            <Separator />
            <div className="flex flex-row justify-between">
              <div>
                <h3 className="font-bold">Phone Number:</h3>
                <p>{sampleData.phone}</p>
              </div>
              <div>
                <Button>Change Phone Number</Button>
              </div>
            </div>
            <Separator />
            <div className="flex flex-row justify-between">
              <div>
                <h3 className="text-gray-400">markescosura24bvt@gmail.com</h3>
              </div>

              <div>
                <SignOutButton href="/" />
              </div>
            </div>
            <Separator />
          </div>
        </div>
      </div>
    </main>
  );
}
