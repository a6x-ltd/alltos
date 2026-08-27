// app/checkout/page.tsx — redirects the bare /checkout route to the first step
import { redirect } from 'next/navigation';

export default function CheckoutIndexPage() {
  redirect('/checkout/address');
}