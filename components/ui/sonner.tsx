'use client';

import { useTheme } from 'next-themes';
import { Toaster as Sonner, ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            'bg-background border-border text-foreground shadow-lg backdrop-blur-sm rounded-xl',
          title: 'text-foreground font-medium',
          description: 'text-muted-foreground',
          actionButton: 'bg-primary text-primary-foreground',
          cancelButton: 'bg-muted text-muted-foreground',
          error: 'bg-destructive text-destructive-foreground border-destructive',
          success: 'bg-primary/10 text-foreground border-primary/20',
          warning: 'bg-amber-500/10 text-foreground border-amber-500/20',
          info: 'bg-blue-500/10 text-foreground border-blue-500/20',
        },
        style: {
          padding: '16px',
          fontSize: '15px',
          minHeight: '60px',
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
