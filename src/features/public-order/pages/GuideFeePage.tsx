import type { ReactNode } from "react";
import { Camera } from "lucide-react";
const stores = [
  'Shopee', 'SHEIN', 'Lazada', 'TikTok Shop', 'LINE Shopping', 'GMMTV Shop',
  'Big C', '7-Eleven', 'Tofu', 'EveandBoy', 'Moshi Moshi', 'Navori', 'After You',
];

const included = [
  'Harga produk',
  'Biaya checkout / transfer baht',
  'Fee jastip',
  'Biaya warehouse dan handcarry',
];

const paperbased = {
  headers: ['Jumlah', 'Satuan', 'Set isi 10', 'Set isi 20', 'Set isi 35'],
  rows: [
    ['1–25', '5.000', '10.000', '15.000', '20.000'],
    ['26–50', '4.000', '8.000', '13.000', '18.000'],
    ['>50', '3.500', '7.000', '12.000', '17.000'],
  ],
};

const prints = {
  headers: ['Jumlah', 'A6', 'A5', 'A4'],
  rows: [
    ['1–10', '7.000', '10.000', '15.000'],
    ['>10', '6.000', '8.000', '13.000'],
  ],
};


function SectionHeader({
  no,
  title,
  desc,
}: {
  no: string;
  title: string;
  desc: ReactNode;
}) {
  return (
    <header className="mb-6">
      <p className="text-[11px] font-bold tracking-[0.2em] text-pink-500">
        {no}
      </p>
      <h2 className="mt-1 text-xl font-bold tracking-tight text-slate-800">
        {title}
      </h2>
      <p className="mt-1 text-sm text-slate-500">{desc}</p>
    </header>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex min-w-0 flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3">
      <dt className="min-w-0 break-words text-slate-600">{label}</dt>
      <dd className="min-w-0 break-words font-medium text-slate-900 tabular-nums">{value}</dd>
    </div>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5 text-slate-600">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span className="mt-2.5 size-1 shrink-0 rounded-full bg-pink-400" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function PriceTable({
  title,
  headers,
  rows,
}: {
  title: string;
  headers: string[];
  rows: string[][];
}) {
  const lastIndex = rows.length - 1;

  return (
    <div>
      <h3 className="font-medium text-slate-900">{title}</h3>
      <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full min-w-120 text-left">
          <thead className="bg-pink-50/70 text-sm text-slate-500">
            <tr>
              {headers.map((h, i) => (
                <th
                  key={h}
                  className={`px-4 py-3 font-medium ${i > 0 ? 'text-right' : ''}`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row, r) => (
              <tr key={row[0]}>
                {row.map((cell, i) => (
                  <td
                    key={i}
                    className={`px-4 py-3.5 tabular-nums ${
                      i === 0
                        ? 'font-medium text-slate-900'
                        : `text-right ${r === lastIndex ? 'font-semibold text-pink-600' : 'text-slate-700'}`
                    }`}
                  >
                    {i === 0 ? cell : `Rp${cell}`}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const GuidelinesAndFeePage = () => {
  return (
    <>
      <section className="w-full min-w-0 divide-y divide-slate-100 rounded-2xl border border-pink-100 bg-white px-5 sm:px-8">
        {/* 01 PERSONAL ORDER */}
        <div className="py-7 sm:py-8">
          <SectionHeader
            no="01"
            title="Personal Order"
            desc={
              <>
                Toko yang bisa dititip dan apa saja yang{" "}
                <mark className="rounded bg-pink-100 px-1 font-medium text-pink-700">
                  sudah termasuk di harga
                </mark>
                .
              </>
            }
          />

          <div className="flex flex-wrap gap-2">
            {stores.map((s) => (
              <span
                key={s}
                className="rounded-full bg-sky-50 px-3 py-1.5 text-sm font-medium text-sky-800 ring-1 ring-sky-100"
              >
                {s}
              </span>
            ))}
          </div>
          <p className="mt-3 text-sm text-slate-500">
            Toko atau produk lain?{" "}
            <span className="font-semibold text-pink-600">Hubungi admin</span>
          </p>

          {/* Included box */}
          <div className="mt-6 rounded-2xl bg-pink-50 p-5">
            <h3 className="font-semibold text-slate-900">
              Harga nett <span className="text-pink-600">sudah termasuk</span>
            </h3>
            <ul className="mt-3 space-y-2.5">
              {included.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-slate-800">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-pink-500 text-[11px] font-bold text-white">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Kurs callout */}
          <div className="mt-3 flex items-start gap-2.5">
            <span className="text-base leading-5 text-red-500">*</span>
            <p className="text-sm text-red-500">
              Kurs baht <b>mengikuti kurs harian</b>.
            </p>
          </div>
        </div>

        {/* 02 WAREHOUSE */}
        
        <div className="py-7 sm:py-8">
          <SectionHeader
            no="02"
            title="Biaya Warehouse"
            desc={
              <>
                Dihitung{" "}
                <mark className="rounded bg-pink-100 px-1 font-medium text-pink-700">
                  per resi
                </mark>{" "}
                yang tiba di warehouse.
              </>
            }
          />

          {/* Main pricing */}
          <div className="mt-7 grid grid-cols-2 gap-6">
            {[
              { label: "SMALL", price: "7.000" },
              { label: "BIG", price: "10.000" },
            ].map((item) => (
              <div key={item.label} className="space-y-2">
                <p className="text-[11px] font-bold text-slate-800">
                  {item.label}
                </p>
                <p className="font-4xl font-serif font-bold text-slate-800">
                  Rp.{item.price} <span>/ Resi</span>
                </p>
              </div>
            ))}
          </div>

          {/* Additional services */}
          <div className="mt-8 border-t border-slate-200 pt-5">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
                Layanan tambahan
              </p>
              <span className="text-[10px] font-medium tracking-wider text-pink-500">
                OPTIONAL
              </span>
            </div>

            <div className="space-y-4">
              {[
                { label: "Video unboxing", value: "+Rp5.000", unit: "/ resi" },
                {
                  label: "Unsealed / take inclusion",
                  value: "+Rp5.000",
                  unit: "/ barang",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between gap-3"
                >
                  <span className="text-sm font-medium text-slate-700">
                    {item.label}
                  </span>
                  <span className="shrink-0 text-sm font-bold tabular-nums text-pink-600">
                    {item.value}
                    <span className="ml-1 text-xs font-normal text-slate-400">
                      {item.unit}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Included service */}
          <div className="mt-6 flex items-center gap-2">
            <span className="text-pink-500">
              <Camera className="size-4" />
            </span>
            <p className="text-xs leading-relaxed text-slate-500">
              <span className="font-semibold text-slate-800">
                Foto barang tiba sudah termasuk.
              </span>{" "}
              Foto berjajar tersedia jika diminta.
            </p>
          </div>
        </div>


        {/* 03 HANDCARRY */}
        <div className="py-7 sm:py-8">
          <SectionHeader
            no="03"
            title="Biaya Handcarry"
            desc="Dihitung berdasarkan berat barang."
          />

          <p className="text-2xl font-bold tabular-nums text-slate-900 sm:text-3xl">Rp135.000</p>
          <p className="text-sm text-slate-500">per kg</p>

          <dl className="mt-5 divide-y divide-slate-100 border-t border-slate-100">
            <Row label="Barang bulky (P × L × T)" value="Rp6.000" />
          </dl>

          <h3 className="mt-6 font-medium text-slate-900">Perhitungan berat</h3>
          <div className="mt-3">
            <Bullets
              items={[
                'Minimal perhitungan 500 gram.',
                'Berat di bawah 100 gram dibulatkan ke 100 gram.',
                'Berat mulai 100 gram dibulatkan ke atas per 500 gram.',
                'Paperbased dan beberapa merchandise dihitung per pcs.',
              ]}
            />
          </div>
        </div>

        <div className="py-7 sm:py-8">
          <SectionHeader
            no="04"
            title="Harga Paperbased"
            desc="Makin banyak jumlahnya, makin murah satuannya."
          />

          <div className="space-y-8">
            <PriceTable title="PC / CC / Pola / 4-cut Photo" {...paperbased} />
            <PriceTable title="Postcard / Artprint / Poster" {...prints} />
          </div>

          <p className="mt-6 text-sm text-red-500">
            * Harga dalam rupiah. Pastikan detail produk dan jumlah pesanan sudah sesuai
            sebelum checkout.
          </p>
        </div>

      </section>
    </>
  );
};

export default GuidelinesAndFeePage;