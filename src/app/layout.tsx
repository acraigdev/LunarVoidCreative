import type { Metadata } from 'next';
import { Quicksand, Montserrat } from 'next/font/google';
import '@/lib/utils/style/globals.css';
import Header from '../components/layout/Header';
import { getAuthenticatedAppForUser } from '../lib/firebase/serverApp';
import { Providers } from '../components/layout/Providers';

const quicksandSans = Quicksand({
  variable: '--font-quick-sans',
  subsets: ['latin'],
});

const montserratSans = Montserrat({
  variable: '--font-montserrat-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Lunar Void Creative',
  description: 'A universal tracking app',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { currentUser } = await getAuthenticatedAppForUser();

  // const pathname = usePathname();
  // const title = Object.values(Route).find(
  //   route => route.path === pathname,
  // )?.title;

  return (
    <html lang="en">
      <body
        className={`${quicksandSans.variable} ${montserratSans.variable} antialiased light`}
      >
        <Providers>
          <Header initialUser={JSON.stringify(currentUser)} />
          <main>
            {/* <div className="w-full sm:w-3/4 m-auto bg-white rounded-lg shadow-sm p-4 md:p-15"> */}
            {children}
            {/* </div> */}
          </main>
        </Providers>
      </body>
    </html>
  );
}
