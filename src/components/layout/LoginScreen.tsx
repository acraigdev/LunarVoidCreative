'use client';
import React from 'react';
import { signInWithGoogle } from '@/lib/firebase/auth';
import {
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from '@heroui/react';
import type { User } from 'firebase/auth';
import type { Nullable } from '../../lib/utils/typeHelpers';

// TODO: Add trial
export function LoginScreen({ user }: { user: Nullable<User> }) {
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
