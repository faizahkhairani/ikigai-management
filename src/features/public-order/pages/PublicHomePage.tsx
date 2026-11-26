import { Link } from "react-router-dom";
import {
  ShoppingBag,
  PackageSearch,
  ArrowRight,
  BadgeQuestionMark,
} from "lucide-react";

const MENUS = [
  {
    to: "/order-form",
    icon: ShoppingBag,
    title: "Order Form",
    desc: "Titip beli barang dari Thailand. Isi form.",
    cta: "Mulai order",
    tone: {
      card: "border-pink-100 hover:border-pink-200 hover:bg-white hover:shadow-pink-200/40",
      tile: "bg-pink-100 text-pink-600",
      cta: "text-pink-700",
      arrow:
        "bg-pink-100 text-pink-700 group-hover:bg-pink-600 group-hover:text-white",
      ring: "focus-visible:ring-pink-300",
    },
  },
  {
    to: "/track",
    icon: PackageSearch,
    title: "Tracking Order",
    desc: "Cek status pesananmu pakai kode tracking.",
    cta: "Lacak pesanan",
    tone: {
      card: "border-sky-100 hover:border-pastel-blue-dark hover:shadow-blue-200/60",
      tile: "bg-pastel-blue-soft text-pastel-blue-text",
      cta: "text-pastel-blue-text",
      arrow: "bg-blue-100 text-blue-700 group-hover:bg-blue-600 group-hover:text-white",
      ring: "focus-visible:ring-sky-300",
    },
  },
  {
    to: "/guidelines",
    icon: BadgeQuestionMark,
    title: "Guidelines and Fee",
    desc: "Baca panduan dan rincian biayanya.",
    cta: "Baca disini",
    tone: {
      card: "border-pastel-purple-dark/30 hover:border-pastel-purple-dark hover:shadow-purple-200/60",
      tile: "bg-pastel-purple-soft text-pastel-purple-text",
      cta: "text-pastel-purple-text",
      arrow: "bg-pastel-purple-soft text-pastel-purple-text group-hover:bg-pastel-purple-dark group-hover:text-white",
      ring: "focus-visible:ring-pastel-purple-dark",
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
      {MENUS.map(({ to, icon: Icon, title, desc, cta, tone }) => (
        <Link
          key={to}
          to={to}
          className={`group flex flex-col gap-4 rounded-2xl border bg-white/80 p-5 shadow-sm backdrop-blur-sm transition-all duration-200
          hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.99]
          focus-visible:outline-none focus-visible:ring-2 ${tone.card} ${tone.ring}`}
        >
          <span
            className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-colors ${tone.tile}`}
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