// app/account/page.tsx — redirects the bare /account route
import { redirect } from 'next/navigation';

export default function AccountIndexPage() {
  redirect('/account/overview');
}