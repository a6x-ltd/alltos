// app/legal/page.tsx — redirects the bare /legal route
import { redirect } from 'next/navigation';

export default function LegalIndexPage() {
  redirect('/legal/privacy');
}