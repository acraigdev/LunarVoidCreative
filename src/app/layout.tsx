import type { Metadata } from 'next';
import { Quicksand, Montserrat } from 'next/font/google';
import '@/lib/utils/globals.css';
import Header from '../components/layout/Header';
import { getAuthenticatedAppForUser } from '../lib/firebase/serverApp';
import { LoginScreen } from '../components/layout/LoginScreen';
import { Providers } from '../components/layout/Providers';
import { Container } from '../components/layout/Container';

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

  return (
    <html lang="en">
      <body
        className={`${quicksandSans.variable} ${montserratSans.variable} antialiased light`}
      >
        <Providers>
          <LoginScreen initialUser={currentUser} />
          <Header />
          <main>
            <Container>{children}</Container>
          </main>
        </Providers>
      </body>
    </html>
  );
}
