'use client';
import type { ButtonProps } from '@heroui/button';
import { Button } from '@heroui/button';
import type { ReactNode } from 'react';
import { useFormStatus } from 'react-dom';
import { Spinner } from '@heroui/spinner';

interface SubmitButtonProps extends ButtonProps {
  children: ReactNode;
}

export function SubmitButton({
  children,
  color = 'primary',
  size = 'lg',
  ...props
}: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button
      color={color}
      type="submit"
      size={size}
      {...props}
      isDisabled={pending}
    >
      {pending ? <Spinner size="sm" /> : children}
    </Button>
  );
}
