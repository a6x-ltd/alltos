// app/checkout/address/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import { useCheckout, Address } from '../CheckoutContext';

const inputClass =
  'w-full px-4 py-3 rounded-none border-0 border-b-2 border-black/15 bg-transparent focus:outline-none focus:border-black transition';

const EMPTY_ADDRESS: Address = {
  firstName: '',
  lastName: '',
  email: '',
  address: '',
  city: '',
  postcode: '',
  country: 'United Kingdom',
};

export default function CheckoutAddressPage() {
  const router = useRouter();
  const { address, setAddress } = useCheckout();
  const [form, setForm] = useState<Address>(address ?? EMPTY_ADDRESS);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAddress(form);
    router.push('/checkout/delivery');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-black/50">
        Shipping address
      </h2>

      <div className="grid grid-cols-2 gap-x-4 gap-y-6">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5">
            First name
          </label>
          <input
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            className={inputClass}
            required
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5">
            Last name
          </label>
          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            className={inputClass}
            required
          />
        </div>

        <div className="col-span-2">
          <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5">
            Email address
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className={inputClass}
            required
          />
        </div>

        <div className="col-span-2">
          <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            className={inputClass}
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5">
            City
          </label>
          <input
            type="text"
            name="city"
            value={form.city}
            onChange={handleChange}
            className={inputClass}
            required
          />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5">
            Postcode
          </label>
          <input
            type="text"
            name="postcode"
            value={form.postcode}
            onChange={handleChange}
            className={inputClass}
            required
          />
        </div>

        <div className="col-span-2">
          <label className="block text-xs font-semibold uppercase tracking-wide mb-1.5">
            Country
          </label>
          <select
            name="country"
            value={form.country}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="United Kingdom">United Kingdom</option>
            <option value="Ireland">Ireland</option>
          </select>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full !bg-black !text-white !rounded-full hover:!bg-black/85"
        size="lg"
      >
        Continue to delivery
      </Button>
    </form>
  );
}