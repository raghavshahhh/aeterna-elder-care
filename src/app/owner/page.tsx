import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifySessionToken } from '@/lib/auth';

export default async function OwnerIndexPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('sl_owner_session')?.value;
  const user = verifySessionToken(token);

  if (user) {
    redirect('/owner/documents');
  } else {
    redirect('/owner/login');
  }
}
