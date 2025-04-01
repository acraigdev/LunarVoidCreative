'use client';
import React, { useEffect } from 'react';
import { onAuthStateChanged, signInWithGoogle } from '@/lib/firebase/auth';
import { useRouter } from 'next/navigation';
import { firebaseConfig } from '@/lib/firebase/config';
import {
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from '@heroui/react';
import { useUser } from '@/lib/hooks/useUser';
import type { User } from 'firebase/auth';
import type { Nullable } from '../../lib/utils/typeHelpers';

function useUserSession(initialUser: Nullable<User>) {
  // The initialUser comes from the server via a server component
  const user = useUser({ initialUser });
  const router = useRouter();

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
    onAuthStateChanged((authUser?: Nullable<User>) => {
      if (user === undefined) return;

      // refresh when user changed to ease testing
      if (user?.email !== authUser?.email) {
        router.refresh();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return user;
}

export function LoginScreen({ initialUser }: { initialUser: Nullable<User> }) {
  const user = useUserSession(initialUser);

  if (user) return <></>;

  return (
    <Modal isOpen={true}>
      <ModalContent>
        <ModalHeader>Sign in</ModalHeader>
        <ModalBody>
          This application requires that you login to save your data.
          <a
            href="#"
            onClick={e => {
              e.preventDefault();
              signInWithGoogle();
            }}
          >
            <Image
              src="/googleSignIn.svg"
              width={200}
              height={100}
              alt="Sign in with Google"
            />
          </a>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
