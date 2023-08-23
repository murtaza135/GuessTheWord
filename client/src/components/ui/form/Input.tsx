import { ReactNode, useRef } from "react";
import { FieldError, FieldErrorsImpl, Merge, useFormContext } from "react-hook-form";
import { useTextField, AriaTextFieldProps } from "react-aria";
import capitalize from 'lodash/capitalize';

type Props = Omit<AriaTextFieldProps, "defaultValue" | "errorMessage" | "name" | "label" | "type"> & {
  name: string;
  label: string;
  type: React.HTMLInputTypeAttribute;
  icon?: ReactNode;
};

function getFormError(
  name: string,
  value: string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined
) {
  if (!value || typeof value === 'string') return value;
  return `${capitalize(name)} invalid`;
}

export default function Input(props: Props) {
  const { name, label, icon } = props;

  const { register, formState } = useFormContext();
  const error = getFormError(name, formState.errors[name]?.message);
  const isError = !!error;

  const ref = useRef(null);
  const { labelProps, inputProps, errorMessageProps } = useTextField({ ...props, errorMessage: error }, ref);

  return (
    <div className='flex flex-col gap-2'>
      <label
        className='font-semibold text-primary-900'
        {...labelProps}>
        {label}
      </label>

      <div className='flex gap-3 px-2 pb-2 border-b-[1px] border-primary-900 text-primary-900'>
        {icon && <i className='flex justify-center items-center text-lg'>{icon}</i>}
        <input
          className='w-full bg-transparent outline-none'
          {...inputProps}
          {...register(name)}
        />
      </div>

      {isError && (
        <p className='text-sm text-red-700' {...errorMessageProps}>
          {error}
        </p>
      )}
    </div>
  );
}
