import { ReactNode } from 'react';
import { useForm, FormProvider, type SubmitHandler, type UseFormProps } from 'react-hook-form';
import { ZodTypeAny } from 'node_modules/zod/lib';
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';

type Props<T extends ZodTypeAny> = Omit<UseFormProps<T>, 'resolver'> & {
  schema?: T;
  onSubmit?: SubmitHandler<z.infer<T>>;
  children?: ReactNode;
  className?: string;
};

export default function Form<T extends ZodTypeAny>({ schema, onSubmit, children, ...rest }: Props<T>) {
  const methods = useForm({ ...rest, resolver: schema && zodResolver(schema) });
  const formOnSubmit = onSubmit && methods.handleSubmit(onSubmit);

  return (
    <FormProvider {...methods}>
      <form onSubmit={formOnSubmit} {...rest} >
        {children}
      </form>
    </FormProvider>
  );
}
