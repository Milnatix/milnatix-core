import React, { ReactNode, useEffect } from 'react';
import Card from '@/components/atom/Card';
import Header from '@/components/atom/Header';
import Button from '@/components/atom/Button';

interface FormTemplateProps {
  title: string;
  onCancel?: () => void;
  onSubmit: () => void | Promise<void>;
  isSubmitting?: boolean;
  children: ReactNode;
}

const FormTemplate: React.FC<FormTemplateProps> = ({
  title,
  onCancel,
  onSubmit,
  isSubmitting = false,
  children,
}) => {
  useEffect(() => {
    if (!isSubmitting) return;

    const handlePopState = (e: PopStateEvent) => {
      window.history.pushState(null, document.title, window.location.href);
      alert('Não é possível voltar enquanto o formulário está sendo enviado.');
    };

    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isSubmitting]);

  return (
    <div className="bg-gradient-app h-[100dvh] w-screen flex flex-col">
      <Header title={title} disableBack={isSubmitting} />
      <div className="flex flex-1 justify-center items-center px-2 py-4">
        <Card className="h-full max-w-md w-full">
          <form
            onSubmit={e => {
              e.preventDefault();
              onSubmit();
            }}
            className="flex flex-col h-full"
          >
            <div className="flex flex-col flex-1 gap-2">{children}</div>

            <div className="flex justify-end gap-2 mt-4">
              {onCancel && (
                <Button type="button" disabled={isSubmitting} className="flex-1" onClick={onCancel}>
                  Cancelar
                </Button>
              )}
              <Button type="submit" variant="primary" loading={isSubmitting} className="flex-1">
                Salvar
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default FormTemplate;
