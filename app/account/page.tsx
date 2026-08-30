// app/account/page.tsx — Nike.com-inspired theme
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Anton, Inter } from "next/font/google";
import {
  Package,
  MapPin,
  Heart,
  Settings,
  LogOut,
  ChevronRight,
  Plus,
  Trash2,
} from "lucide-react";
import { formatCurrency } from "@/utils/currency";

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body",
});

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "orders", label: "Orders" },
  { id: "addresses", label: "Addresses" },
  { id: "settings", label: "Settings" },
];

// TODO (Phase 7): replace with real order data from /api/account/orders.
// Orders tab is expected to be empty for real accounts until then.
const ORDERS = [
  {
    id: "#WB-10482",
    date: "12 Aug 2026",
    status: "Delivered",
    total: 61.4,
    items: 2,
  },
  {
    id: "#WB-10367",
    date: "28 Jun 2026",
    status: "Delivered",
    total: 24.9,
    items: 1,
  },
  {
    id: "#WB-10201",
    date: "03 Apr 2026",
    status: "Processing",
    total: 52.1,
    items: 3,
  },
];

const STATUS_STYLE: Record<string, string> = {
  Delivered: "bg-black text-white",
  Processing: "bg-[#F5F5F5] text-black border border-black/20",
  Cancelled: "bg-transparent text-red-600 border border-red-600",
};

type SessionUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
};

type Address = {
  id: string;
  label: string | null;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  city: string;
  postcode: string;
  country: string;
};

type SessionStatus = "loading" | "anon" | "authed";
type AuthView = "login" | "register" | "check-email";

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [sessionStatus, setSessionStatus] = useState<SessionStatus>("loading");
  const [user, setUser] = useState<SessionUser | null>(null);
  const [authView, setAuthView] = useState<AuthView>("login");

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [addressesLoaded, setAddressesLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        if (data.user) {
          setUser(data.user);
          setSessionStatus("authed");
        } else {
          setSessionStatus("anon");
        }
      })
      .catch(() => {
        if (!cancelled) setSessionStatus("anon");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (sessionStatus !== "authed") return;
    let cancelled = false;
    fetch("/api/account/addresses")
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        setAddresses(data.addresses || []);
        setAddressesLoaded(true);
      })
      .catch(() => {
        if (!cancelled) setAddressesLoaded(true);
      });
    return () => {
      cancelled = true;
    };
  }, [sessionStatus]);

  async function handleSignOut() {
    await fetch("/api/auth/logout", { method: "POST" }).catch(() => {});
    setUser(null);
    setSessionStatus("anon");
    setAuthView("login");
    setActiveTab("overview");
    setAddresses([]);
    setAddressesLoaded(false);
  }

  async function handleDeleteAddress(id: string) {
    const previous = addresses;
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    try {
      const res = await fetch(`/api/account/addresses/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        setAddresses(previous);
      }
    } catch {
      setAddresses(previous);
    }
  }

  function handleAddressAdded(address: Address) {
    setAddresses((prev) => [...prev, address]);
  }

  if (sessionStatus === "loading") {
    return (
      <div
        className={`${anton.variable} ${inter.variable} font-[family-name:var(--font-body)] bg-white text-black min-h-screen`}
      >
        <div className="max-w-5xl mx-auto px-6 md:px-10 py-16 text-sm text-black/50">
          Loading account…
        </div>
      </div>
    );
  }

  if (sessionStatus === "anon") {
    return (
      <AuthGate
        view={authView}
        setView={setAuthView}
        onLoggedIn={(u) => {
          setUser(u);
          setSessionStatus("authed");
        }}
      />
    );
  }

  // sessionStatus === 'authed' — user is guaranteed non-null here
  return (
    <div
      className={`${anton.variable} ${inter.variable} font-[family-name:var(--font-body)] bg-white text-black min-h-screen`}
    >
      <div className="max-w-5xl mx-auto px-6 md:px-10 py-12 md:py-16">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-black/50">
          {user!.email}
        </span>
        <h1 className="font-[family-name:var(--font-display)] uppercase text-3xl md:text-4xl mt-2">
          Welcome back, {user!.firstName}
        </h1>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mt-8 border-b border-black/10 pb-6">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold uppercase tracking-wide transition ${
                activeTab === tab.id
                  ? "bg-black text-white"
                  : "text-black/60 hover:text-black hover:bg-black/5"
              }`}
            >
              {tab.label}
            </button>
          ))}
          <Link
            href="/wishlist"
            className="ml-auto hidden sm:inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-black/60 hover:text-black transition"
          >
            <Heart className="w-4 h-4" />
            Wishlist
          </Link>
        </div>

        {activeTab === "overview" && (
          <div className="mt-8 space-y-10">
            {/* Summary cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {[
                { label: "Total orders", value: ORDERS.length, icon: Package },
                {
                  label: "Saved addresses",
                  value: addressesLoaded ? addresses.length : "–",
                  icon: MapPin,
                },
              ].map(({ label, value, icon: Icon }) => (
                <div
                  key={label}
                  className="border border-black/10 rounded-2xl p-5"
                >
                  <Icon
                    className="w-5 h-5 text-black/40 mb-3"
                    strokeWidth={2}
                  />
                  <p className="font-[family-name:var(--font-display)] text-3xl">
                    {value}
                  </p>
                  <p className="text-xs font-semibold uppercase tracking-wide text-black/50 mt-1">
                    {label}
                  </p>
                </div>
              ))}
            </div>
            {/* Recent orders */}
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-[0.15em] text-black/50 mb-4">
                Recent orders
              </h2>
              <div className="divide-y divide-black/10 border-t border-b border-black/10">
                {ORDERS.map((order) => (
                  <button
                    key={order.id}
                    className="w-full flex items-center justify-between gap-4 py-4 text-left hover:bg-[#FAFAFA] transition px-1"
                  >
                    <div>
                      <p className="text-sm font-semibold">{order.id}</p>
                      <p className="text-xs text-black/50 mt-0.5">
                        {order.date} · {order.items} item
                        {order.items > 1 ? "s" : ""}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span
                        className={`px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide ${STATUS_STYLE[order.status]}`}
                      >
                        {order.status}
                      </span>
                      <span className="font-[family-name:var(--font-display)] text-lg w-16 text-right">
                        {formatCurrency(order.total)}
                      </span>
                      <ChevronRight className="w-4 h-4 text-black/30" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "orders" && (
          <div className="mt-8 divide-y divide-black/10 border-t border-b border-black/10">
            {ORDERS.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between gap-4 py-4"
              >
                <div>
                  <p className="text-sm font-semibold">{order.id}</p>
                  <p className="text-xs text-black/50 mt-0.5">{order.date}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide ${STATUS_STYLE[order.status]}`}
                >
                  {order.status}
                </span>
                <span className="font-[family-name:var(--font-display)] text-lg">
                  {formatCurrency(order.total)}
                </span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "addresses" && (
          <AddressesTab
            addresses={addresses}
            loaded={addressesLoaded}
            onDelete={handleDeleteAddress}
            onAdded={handleAddressAdded}
          />
        )}

        {activeTab === "settings" && (
          <div className="mt-8 max-w-md space-y-4">
            <div className="flex items-center gap-3 text-sm font-medium py-3 border-b border-black/10">
              <Settings className="w-4 h-4 text-black/40" />
              Account preferences
            </div>
            <button
              type="button"
              onClick={handleSignOut}
              className="flex items-center gap-3 text-sm font-medium text-red-600 py-3"
            >
              <LogOut className="w-4 h-4" />
              Sign out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function AddressesTab({
  addresses,
  loaded,
  onDelete,
  onAdded,
}: {
  addresses: Address[];
  loaded: boolean;
  onDelete: (id: string) => void;
  onAdded: (address: Address) => void;
}) {
  const [showForm, setShowForm] = useState(false);

  if (!loaded) {
    return <div className="mt-8 text-sm text-black/50">Loading addresses…</div>;
  }

  return (
    <div className="mt-8 space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        {addresses.length === 0 && !showForm && (
          <p className="text-sm text-black/50 sm:col-span-2">
            No saved addresses yet.
          </p>
        )}
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className="border border-black/10 rounded-2xl p-5 relative"
          >
            <button
              type="button"
              onClick={() => onDelete(addr.id)}
              aria-label="Delete address"
              className="absolute top-4 right-4 text-black/30 hover:text-red-600 transition"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-black/40" />
              <span className="text-sm font-semibold">
                {addr.label || "Address"}
              </span>
            </div>
            <p className="text-sm text-black/60 leading-relaxed pr-6">
              {addr.firstName} {addr.lastName}
              <br />
              {addr.address}
              <br />
              {addr.city}, {addr.postcode}
              <br />
              {addr.country}
            </p>
          </div>
        ))}
      </div>

      {showForm ? (
        <NewAddressForm
          onCancel={() => setShowForm(false)}
          onSaved={(addr) => {
            onAdded(addr);
            setShowForm(false);
          }}
        />
      ) : (
        <button
          type="button"
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide border border-black/15 rounded-full px-5 py-2.5 hover:bg-black hover:text-white transition"
        >
          <Plus className="w-4 h-4" />
          Add address
        </button>
      )}
    </div>
  );
}

function NewAddressForm({
  onCancel,
  onSaved,
}: {
  onCancel: () => void;
  onSaved: (address: Address) => void;
}) {
  const [label, setLabel] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postcode, setPostcode] = useState("");
  const [country, setCountry] = useState("United Kingdom");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setFieldErrors({});
    setSubmitting(true);
    try {
      const res = await fetch("/api/account/addresses", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          label: label || undefined,
          firstName,
          lastName,
          email,
          address,
          city,
          postcode,
          country,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setFieldErrors(data.details || {});
        return;
      }
      onSaved(data.address);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-black/10 rounded-2xl p-5 max-w-lg space-y-4"
    >
      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {error}
        </p>
      )}
      <Field
        label="Label (optional)"
        value={label}
        onChange={setLabel}
        errors={fieldErrors.label}
      />
      <div className="grid grid-cols-2 gap-3">
        <Field
          label="First name"
          value={firstName}
          onChange={setFirstName}
          required
          errors={fieldErrors.firstName}
        />
        <Field
          label="Last name"
          value={lastName}
          onChange={setLastName}
          required
          errors={fieldErrors.lastName}
        />
      </div>
      <Field
        label="Email"
        type="email"
        value={email}
        onChange={setEmail}
        required
        errors={fieldErrors.email}
      />
      <Field
        label="Address"
        value={address}
        onChange={setAddress}
        required
        errors={fieldErrors.address}
      />
      <div className="grid grid-cols-2 gap-3">
        <Field
          label="City"
          value={city}
          onChange={setCity}
          required
          errors={fieldErrors.city}
        />
        <Field
          label="Postcode"
          value={postcode}
          onChange={setPostcode}
          required
          errors={fieldErrors.postcode}
        />
      </div>
      <Field
        label="Country"
        value={country}
        onChange={setCountry}
        required
        errors={fieldErrors.country}
      />
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="bg-black text-white rounded-full px-6 py-2.5 text-sm font-semibold uppercase tracking-wide disabled:opacity-50"
        >
          {submitting ? "Saving…" : "Save address"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="text-sm font-semibold uppercase tracking-wide text-black/50 hover:text-black transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

function AuthGate({
  view,
  setView,
  onLoggedIn,
}: {
  view: AuthView;
  setView: (v: AuthView) => void;
  onLoggedIn: (user: SessionUser) => void;
}) {
  return (
    <div
      className={`${anton.variable} ${inter.variable} font-[family-name:var(--font-body)] bg-white text-black min-h-screen`}
    >
      <div className="max-w-md mx-auto px-6 py-16 md:py-24">
        <h1 className="font-[family-name:var(--font-display)] uppercase text-3xl md:text-4xl mb-8">
          {view === "register"
            ? "Create account"
            : view === "check-email"
              ? "Check your inbox"
              : "Sign in"}
        </h1>

        {view === "login" && <LoginForm onLoggedIn={onLoggedIn} />}
        {view === "register" && (
          <RegisterForm onRegistered={() => setView("check-email")} />
        )}
        {view === "check-email" && (
          <div className="text-sm text-black/70 leading-relaxed">
            We&apos;ve sent a verification link to your email. Click it, then
            come back and sign in.
            <button
              type="button"
              onClick={() => setView("login")}
              className="block mt-6 text-sm font-semibold uppercase tracking-wide underline"
            >
              Back to sign in
            </button>
          </div>
        )}

        {view !== "check-email" && (
          <p className="mt-8 text-sm text-black/60">
            {view === "login"
              ? "Don't have an account? "
              : "Already have an account? "}
            <button
              type="button"
              onClick={() => setView(view === "login" ? "register" : "login")}
              className="font-semibold text-black underline"
            >
              {view === "login" ? "Create one" : "Sign in"}
            </button>
          </p>
        )}
      </div>
    </div>
  );
}

function LoginForm({
  onLoggedIn,
}: {
  onLoggedIn: (user: SessionUser) => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }
      onLoggedIn(data.user);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {error}
        </p>
      )}
      <Field
        label="Email"
        type="email"
        value={email}
        onChange={setEmail}
        required
        autoComplete="email"
      />
      <Field
        label="Password"
        type="password"
        value={password}
        onChange={setPassword}
        required
        autoComplete="current-password"
      />
      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-black text-white rounded-full py-3.5 text-sm font-semibold uppercase tracking-wide disabled:opacity-50"
      >
        {submitting ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}

function RegisterForm({ onRegistered }: { onRegistered: () => void }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setFieldErrors({});
    setSubmitting(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setFieldErrors(data.details || {});
        return;
      }
      onRegistered();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {error}
        </p>
      )}
      <div className="grid grid-cols-2 gap-3">
        <Field
          label="First name"
          value={firstName}
          onChange={setFirstName}
          required
          errors={fieldErrors.firstName}
        />
        <Field
          label="Last name"
          value={lastName}
          onChange={setLastName}
          required
          errors={fieldErrors.lastName}
        />
      </div>
      <Field
        label="Email"
        type="email"
        value={email}
        onChange={setEmail}
        required
        autoComplete="email"
        errors={fieldErrors.email}
      />
      <Field
        label="Password"
        type="password"
        value={password}
        onChange={setPassword}
        required
        autoComplete="new-password"
        hint="At least 8 characters, with an uppercase letter, lowercase letter, and number."
        errors={fieldErrors.password}
      />
      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-black text-white rounded-full py-3.5 text-sm font-semibold uppercase tracking-wide disabled:opacity-50"
      >
        {submitting ? "Creating account…" : "Create account"}
      </button>
    </form>
  );
}

function Field({
  label,
  type = "text",
  value,
  onChange,
  required,
  autoComplete,
  hint,
  errors,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  autoComplete?: string;
  hint?: string;
  errors?: string[];
}) {
  return (
    <label className="block">
      <span className="block text-xs font-semibold uppercase tracking-wide text-black/50 mb-1.5">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        autoComplete={autoComplete}
        className="w-full border border-black/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition"
      />
      {hint && !errors && (
        <span className="block text-xs text-black/40 mt-1">{hint}</span>
      )}
      {errors?.map((msg) => (
        <span key={msg} className="block text-xs text-red-600 mt-1">
          {msg}
        </span>
      ))}
    </label>
  );
}
