'use client'

import { Button, ButtonProps } from "./ui/button"

interface RedirectButtonProps extends ButtonProps {
  url: string
}

export function RedirectButton({
  variant,
  children,
  url
}: RedirectButtonProps) {
  return <Button
    onClick={() => window.open(url, '_blank', 'noopener,noreferrer')}
    variant={variant}
  > {children}</Button >
}