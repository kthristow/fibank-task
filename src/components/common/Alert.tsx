type AlertProps = {
  variant?: "error" | "info";
  message: string;
};

const variantClasses: Record<NonNullable<AlertProps["variant"]>, string> = {
  error: "bg-red-100 text-red-800 border-red-300",
  info: "bg-blue-100 text-blue-800 border-blue-300",
};

const Alert = ({ variant = "info", message }: AlertProps) => {
  return (
    <div
      className={`mb-4 rounded-md border px-4 py-3 text-sm ${variantClasses[variant]}`}
      role="alert"
    >
      {message}
    </div>
  );
};

export default Alert;
