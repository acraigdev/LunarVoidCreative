"use client";

import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase/clientApp";
import { Maybe } from "../utils/typeHelpers";

export function useUser({
  initialUser,
}: { initialUser?: Maybe<User> } = {}): Maybe<User> {
  const [user, setUser] = useState<Maybe<User>>(initialUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      setUser(authUser);
    });

    return () => unsubscribe();
  }, []);

  return user;
}
