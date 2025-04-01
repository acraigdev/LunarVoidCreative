'use client';

import type { User } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase/clientApp';
import type { Nullable } from '../utils/typeHelpers';

export function useUser({
  initialUser,
}: { initialUser?: Nullable<User> } = {}): Nullable<User> {
  const [user, setUser] = useState<Nullable<User>>(initialUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authUser => {
      setUser(authUser);
    });

    return () => unsubscribe();
  }, []);

  return user;
}
