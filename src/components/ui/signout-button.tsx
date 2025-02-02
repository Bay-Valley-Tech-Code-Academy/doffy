'use client';
import { useRouter } from 'next/navigation';
import { Button } from './button';

export function SignOutButton({ href }: { href: string }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(href);
  };
  return <Button onClick={handleClick}>Sign Out</Button>;
}
