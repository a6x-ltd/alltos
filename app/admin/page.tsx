// app/admin/page.tsx — redirects the bare /admin route to the dashboard
import { redirect } from 'next/navigation';

export default function AdminIndexPage() {
  redirect('/admin/dashboard');
}