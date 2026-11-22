import { Link } from "react-router-dom";
import { ShoppingBag, PackageSearch, ArrowRight } from "lucide-react";

const MENUS = [
  {
    to: "/order-form",
    icon: ShoppingBag,
    title: "Order Form",
    desc: "Titip beli barang dari Thailand. Isi form.",
    cta: "Mulai order",
    tone: {
      card: "border-pastel-pink-dark/30 hover:border-pastel-pink-dark hover:shadow-pink-200/60",
      tile: "bg-pastel-pink-soft text-pastel-pink-text",
      cta: "text-pastel-pink-text",
      arrow: "bg-pastel-pink-text text-white",
      ring: "focus-visible:ring-pastel-pink-dark",
    },
  },
  {
    to: "/track",
    icon: PackageSearch,
    title: "Tracking Order",
    desc: "Cek status pesananmu pakai kode tracking.",
    cta: "Lacak pesanan",
    tone: {
      card: "border-pastel-blue-dark/30 hover:border-pastel-blue-dark hover:shadow-blue-200/60",
      tile: "bg-pastel-blue-soft text-pastel-blue-text",
      cta: "text-pastel-blue-text",
      arrow: "bg-pastel-blue-text text-white",
      ring: "focus-visible:ring-pastel-blue-dark",
    },
  },
];

const PublicHomePage = () => (
  <div className="space-y-8">
    <section className="space-y-1">
      <p className="text-xs font-semibold uppercase tracking-widest text-pastel-pink-text">
        Jastip Thailand → Indonesia
      </p>

      <h1 className="text-2xl font-bold tracking-tight text-stone-800">
        Mau ngapain hari ini?
      </h1>
    </section>

    <section className="grid gap-4 sm:grid-cols-2">
      {MENUS.map(({ to, icon: Icon, title, desc, cta, tone}) => (
        <Link
          key={to}
          to={to}
         className={`group flex flex-col gap-4 rounded-2xl border bg-white p-5 shadow-sm transition
            hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.99]
            focus-visible:outline-none focus-visible:ring-2 ${tone.card} ${tone.ring}`}
        >
          <span
            className={`flex h-12 w-12 items-center justify-center rounded-xl ${tone.tile}`}
          >
            <Icon className="h-6 w-6" strokeWidth={2} />
          </span>
           <div className="flex-1 space-y-1">
            <h2 className="text-lg font-bold text-stone-800">{title}</h2>
            <p className="text-sm leading-relaxed text-stone-600">{desc}</p>
          </div>
         <div className="flex items-center justify-between">
          <span className={`text-sm font-semibold ${tone.cta}`}>{cta}</span>
          <span
            className={`flex h-8 w-8 items-center justify-center rounded-full transition group-hover:translate-x-0.5 ${tone.arrow}`}
          >
            <ArrowRight className="h-4 w-4" />
          </span>
          </div>
        </Link>
      ))}
    </section>
  </div>
);

export default PublicHomePage;