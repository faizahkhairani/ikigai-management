import { Outlet, Link } from "react-router-dom";

const PublicLayout = () => (
  <div className="min-h-screen bg-pink-50 text-stone-800 antialiased">
    <header className="sticky top-0 z-20 border-b border-stone-200/70 bg-pink-50 backdrop-blur-md">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4 sm:px-6">
        <Link to="/" className="flex min-w-0 items-baseline gap-3">
          <span  
            style={{
            fontFamily: "'Playfair Display Variable', sans-serif",
            }} 
            className="text-xl text-pastel-blue-text font-extrabold tracking-wide"
            >
              Ikigai
            <span className="text-pastel-pink-text"> Carry</span>
          </span>
          <span className="hidden h-3 w-px bg-stone-300 sm:block" />
          <span className="hidden text-[11px] font-medium uppercase tracking-[0.18em] text-stone-700 sm:block">
            Sharing Bagasi
          </span>
        </Link>
      </div>
    </header>

    <main className="mx-auto w-full max-w-3xl px-4 py-6 sm:px-6 sm:py-10">
      <Outlet />
    </main>
  </div>
);

export default PublicLayout;