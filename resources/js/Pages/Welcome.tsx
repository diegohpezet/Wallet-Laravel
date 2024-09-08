import { Link, Head } from '@inertiajs/react';
import { PageProps } from '@/types';

export default function Welcome({ auth }: PageProps<{}>) {
  return (
    <>
      <Head title="Welcome" />
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <header className="px-3 py-3 bg-white dark:bg-gray-900">
          <nav className="mx-3 flex flex-1 justify-end">
            {auth.user ? (
              <Link
                href={route('dashboard')}
                className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href={route('login')}
                  className="rounded-md px-3 py-2 text-black dark:text-white focus:text-blue-500"
                >
                  Log in
                </Link>
                <Link
                  href={route('register')}
                  className="rounded-md px-3 py-2 bg-blue-500 text-white"
                >
                  Register
                </Link>
              </>
            )}
          </nav>
        </header>

        <div className="relative flex flex-col items-center justify-center">
          <main>
            <div className="grid grid-cols-1 sm:grid-cols-2 mx-5 sm:mx-10 md:mx-15 lg:mx-20">
              <div className="flex justify-center lg:justify-end order-last sm:order-first">
                <img src="./img/online-payment.png" alt="Online payment" className="dark:brightness-95"/>
              </div>
              <div className="pt-10 sm:pt-14 lg:pt-24 2xl:pt-32">
                <h1 className="font-extrabold text-4xl lg:text-5xl xl:text-7xl text-center text-black dark:text-slate-100">Take Control of Your Finances Effortlessly</h1>
                <p className="mt-5 text-xl lg:text-2xl xl:text-3xl text-center text-black dark:text-slate-100">
                  Manage your transactions in one place. Our intuitive interface
                  allows you to budget with just a few taps—giving you complete control over
                  your financial health.
                </p>
                <div className="mt-10 text-center">
                  <Link
                    href={route('register')}
                    className="rounded-md px-8 py-3 text-md md:text-lg lg:text-xl text-white bg-blue-500"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </div>


            <div className="grid grid-cols-1 mx-20 sm:mx-24 md:mx-32 lg:mx-48">
              <div className="flex justify-center order-last">
                <img src="./img/financial-activity.png" alt="Financial activity" className="size-80 dark:brightness-95" />
              </div>
              <div className="pt-10 sm:pt-14 lg:pt-24 2xl:pt-32">
                <h2 className="font-extrabold text-3xl lg:text-4xl xl:text-6xl text-center text-black dark:text-slate-100">Keep track of your activity</h2>
                <p className="mt-5 text-lg lg:text-xl xl:text-2xl text-center text-black dark:text-slate-100">
                  Stay updated on your spending habits and incoming transactions with detailed reports and notifications.
                  Whether it's daily purchases or monthly bills, track every penny and make smarter financial decisions.
                </p>
              </div>
            </div>
          </main>

          <footer className="text-center text-sm text-black dark:text-white/70">
            diegohpezet @2024
          </footer>
        </div>
      </div>
    </>
  );
}
