import {
  UseFormRegister,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";

interface TextFieldProps<T extends FieldValues> {
  type?: string;
  label: string;
  name: Path<T>;
  errors: FieldErrors<T>;
  register: UseFormRegister<T>;
  validationShema?: Record<string, any>;
  isRequired: boolean;
}

function RHFTextField<T extends FieldValues>({
  type = "text",
  label,
  name,
  errors,
  register,
  isRequired,
  validationShema = {},
  ...rest
}: TextFieldProps<T>) {
  const errorMessages = errors?.[name];
  const hasError = !!(errorMessages && errors);

  return (
    <div
      className={`textField relative ${hasError ? "textField--invalid" : ""}`}
    >
      <label htmlFor="name" className="mb-2 block text-secondary-800">
        {label}
        {isRequired && <span className="text-error">*</span>}
      </label>
      <input
        autoComplete="off"
        type={type}
        id={name}
        className="w-full py-3 px-4 rounded-xl text-secondary-900 border border-secondary-100 bg-secondary-100 hover:border-primary-500 focus:border-primary-500 focus:bg-secondary-0 transition-all duration-300 ease-out focus:shadow-lg focus:shadow-primary-200 dark:focus:shadow-secondary-200"
        {...register(name, validationShema)}
        {...rest}
      />
      {errors && errors[name] && (
        <span className="text-red-600 block text-xs mt-2">
          {errors[name]?.message?.toString()}
        </span>
      )}
    </div>
  );
}

export default RHFTextField;
