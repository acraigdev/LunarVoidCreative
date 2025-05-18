'use client';
import type { Key } from 'react';
import React, { useEffect, useState } from 'react';
import { onAuthStateChanged, signOut } from '@/lib/firebase/auth';
import {
  Link,
  Navbar,
  NavbarContent,
  NavbarItem,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownItem,
  DropdownMenu,
} from '@heroui/react';
import { Route } from '@/lib/utils/routes';
import { usePathname } from 'next/navigation';
import { LoginScreen } from './LoginScreen';
import type { Nullable } from '@/lib/utils/typeHelpers';
import type { User } from 'firebase/auth';
import { firebaseConfig } from '@/lib/firebase/config';

function useUserSession(initialUser: Nullable<User>) {
  // The initialUser comes from the server via a server component
  const [user, setUser] = useState(initialUser);

  // Register the service worker that sends auth state back to server
  // The service worker is built with npm run build-service-worker
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      const serializedFirebaseConfig = encodeURIComponent(
        JSON.stringify(firebaseConfig),
      );
      const serviceWorkerUrl = `/auth-service-worker.js?firebaseConfig=${serializedFirebaseConfig}`;

      navigator.serviceWorker
        .register(serviceWorkerUrl)
        .then(registration => console.log('scope is: ', registration.scope))
        .catch(e => console.error(e));
    }
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authUser => {
      setUser(authUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    onAuthStateChanged((authUser?: Nullable<User>) => {
      if (user === undefined) return;

      // refresh when user changed to ease testing
      if (user?.email !== authUser?.email) {
        location.reload();
      }
    });
  }, [user]);

  return user;
}

export default function Header({ initialUser }: { initialUser: string }) {
  const pathname = usePathname();
  const user = useUserSession(JSON.parse(initialUser));

  const handleMenuClick = (key: Key) => {
    switch (key) {
      case 'signOut':
        signOut();
    }
  };

  const navItems = [Route.Home, Route.Create];

  return (
    <Navbar>
      <LoginScreen user={user} />
      <NavbarContent>
        {navItems.map(item => {
          const isActive = pathname === item.path;
          return (
            <NavbarItem key={item.path} isActive={isActive}>
              <Link
                aria-current={isActive ? 'page' : false}
                href={item.path}
                color={isActive ? 'primary' : 'foreground'}
              >
                {item.title}
              </Link>
            </NavbarItem>
          );
        })}
      </NavbarContent>
      {user && (
        <NavbarContent justify="end">
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                src={user?.photoURL ?? '/profile.svg'}
                size="md"
                alt={user.email ?? 'User menu'}
              />
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Profile Actions"
              variant="flat"
              onAction={key => handleMenuClick(key)}
            >
              <DropdownItem key="signOut" color="danger">
                Sign out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>
      )}
    </Navbar>
  );
}
