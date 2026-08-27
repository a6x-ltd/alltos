// app/about/page.tsx — Nike.com-inspired theme
import Link from 'next/link';
import Image from 'next/image';
import { Anton, Inter } from 'next/font/google';
import { Leaf, ShieldCheck, Users, ArrowRight } from 'lucide-react';

const anton = Anton({ subsets: ['latin'], weight: '400', variable: '--font-display' });
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
});

const STATS = [
  { value: '2019', label: 'Founded' },
  { value: '50K+', label: 'Customers' },
  { value: '120+', label: 'Products' },
  { value: '0', label: 'Compromises' },
];

const VALUES = [
  {
    icon: ShieldCheck,
    title: 'Third-party tested',
    description: 'Every batch is independently verified for purity and potency before it reaches you.',
  },
  {
    icon: Leaf,
    title: 'Responsibly sourced',
    description: 'Ingredients are traced back to origin, and packaging is carbon-neutral shipped.',
  },
  {
    icon: Users,
    title: 'Built with our community',
    description: 'Formulas are shaped by feedback from the people who actually take them daily.',
  },
];

export default function AboutPage() {
  return (
    <div className={`${anton.variable} ${inter.variable} font-[family-name:var(--font-body)] bg-white text-black`}>
      {/* Hero */}
      <section className="relative min-h-[60vh] md:min-h-[75vh] overflow-hidden">
        <Image
          src="/images/yoga.jpg"
          alt="The team behind the brand"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="relative h-full min-h-[60vh] md:min-h-[75vh] flex flex-col justify-end px-6 md:px-12 pb-14 md:pb-20">
          <span className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.25em] text-white/70">
            Our Heritage
          </span>
          <h1 className="font-[family-name:var(--font-display)] uppercase text-white leading-[0.9] text-[2.75rem] sm:text-[4rem] md:text-[5.5rem] mt-3 max-w-3xl">
            Over a decade of wellness
          </h1>
        </div>
      </section>

      {/* Statement */}
      <section className="py-20 md:py-28 px-6 md:px-12">
        <p className="domaine font-(family-name:--font-display)  text-2xl md:text-3xl leading-6 max-w-3xl mx-auto text-center leading-[1.15]">
          Rooted in the legacy of Allied Chemists—founded by the late Chief Daniel Adebayo Ogunyemi, ALLTOS continues a proud tradition of quality, integrity, and care. As the consumer health brand of Allied Tosola Pharmaceutical Industries Ltd., 
          <br></br>we carry forward a commitment to trusted wellness for every generation
        </p>
      </section>

      {/* Stats */}
      <section className="border-y border-black/10">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-black/10">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center py-10 px-4">
              <p className="font-[family-name:var(--font-display)] text-4xl md:text-5xl">
                {stat.value}
              </p>
              <p className="text-xs font-semibold uppercase tracking-wide text-black/50 mt-2">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Split image + copy */}
      <section className="py-20 md:py-28 px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center max-w-6xl mx-auto">
          <div className="relative aspect-[4/5] rounded-2xl overflow-hidden order-2 md:order-1">
            <Image src="/images/pill-stash.jpg" alt="Formulation lab" fill className="object-cover" />
          </div>
          <div className="order-1 md:order-2">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-black/50">
              Our process
            </span>
            <h2 className="font-[family-name:var(--font-display)] uppercase text-3xl md:text-4xl mt-3 leading-tight">
              From lab bench to your bathroom cabinet.
            </h2>
            <p className="text-sm md:text-base text-black/60 mt-5 leading-relaxed">
              Every formula starts with a clinical study, not a trend. We work
              with nutritionists and food scientists to land on doses that
              actually do something — then we send every batch to an
              independent lab before it ships.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 mt-7 text-sm font-semibold uppercase tracking-wide border-b border-black pb-0.5 hover:opacity-60 transition"
            >
              Shop the range
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 md:py-28 px-6 md:px-12 bg-[#F5F5F5]">
        <h2 className="font-[family-name:var(--font-display)] uppercase text-2xl md:text-3xl text-center mb-12">
          What we stand for
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {VALUES.map(({ icon: Icon, title, description }) => (
            <div key={title} className="bg-white rounded-2xl p-7">
              <div className="w-11 h-11 rounded-full bg-black text-white flex items-center justify-center mb-5">
                <Icon className="w-5 h-5" strokeWidth={2.25} />
              </div>
              <h3 className="font-semibold text-base">{title}</h3>
              <p className="text-sm text-black/60 mt-2 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA banner */}
      <section className="relative py-24 md:py-32 px-6 md:px-12 overflow-hidden">
        <Image src="/images/old-couple.jpg" alt="" fill className="object-cover" aria-hidden="true" />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative max-w-xl">
          <h2 className="font-[family-name:var(--font-display)] uppercase text-white text-4xl md:text-5xl leading-[0.9]">
            See it for yourself.
          </h2>
          <p className="text-white/80 text-sm md:text-base mt-4">
            Explore the full range and find the routine that fits your life.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-white text-black px-8 py-3.5 rounded-full text-sm font-semibold mt-8 hover:bg-white/90 transition"
          >
            Shop all
          </Link>
        </div>
      </section>
    </div>
  );
}