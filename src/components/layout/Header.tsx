'use client';
import type { Key } from 'react';
import React from 'react';
import { signOut } from '@/lib/firebase/auth';
import { useUser } from '@/lib/hooks/useUser';
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

export default function Header({ initialUser }: { initialUser: string }) {
  const pathname = usePathname();
  const user = useUser({ initialUser: JSON.parse(initialUser) });

  const handleMenuClick = (key: Key) => {
    switch (key) {
      case 'signOut':
        signOut();
    }
  };

  const navItems = [Route.Home, Route.Create];

  return (
    <Navbar>
      <LoginScreen initialUser={initialUser} />
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
