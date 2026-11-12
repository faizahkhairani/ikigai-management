import LoginForm from '@/features/auth/components/LoginForm';

const illustration = '/login-illustration.png';

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#faf8f5] font-sans text-[#2a2140]">
      <div className="mx-auto grid min-h-screen max-w-360 grid-cols-1 items-center gap-10 px-6 py-10 sm:px-12 lg:grid-cols-2 lg:gap-0 lg:px-[72px]">
        <section className="flex flex-col self-stretch lg:py-6">

          <div className="mt-12 lg:mt-14">
            <p className="text-xs font-medium uppercase tracking-wide text-[#bf5c8f]">
              Ikigai Management System
            </p>
            <h1 className="mt-3 max-w-120 text-3xl font-bold tracking-tight sm:text-[44px]">
              Sign in to access your Workspace
            </h1>
            <p className="mt-4 text-base text-[#806473]">
             Keep track of tasks, priorities, and daily progress.
            </p>
          </div>

          <div className="relative mt-6 hidden w-180 flex-1 items-end sm:flex">
            <div className="relative w-full">
              <img
                src={illustration}
                alt="Illustration"
                className="ikigai-float relative z-10 w-full mix-blend-multiply select-none"
                draggable={false}
              />
              <div className="ikigai-shadow absolute bottom-[6%] left-[12%] right-[12%] h-4 rounded-[50%] bg-[#b08aa0] blur-md" />
            </div>
          </div>
        </section>

        <section className="flex justify-center lg:justify-end">
          <LoginForm />
        </section>
      </div>
    </main>
  );
}
