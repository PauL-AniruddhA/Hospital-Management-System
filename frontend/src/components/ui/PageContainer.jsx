export default function Input({
  className = "",
  ...props
}) {
  return (
    <input
      {...props}
      className={`
        w-full
        px-4
        py-3
        border
        border-slate-200
        rounded-xl
        bg-white
        focus:outline-none
        focus:ring-2
        focus:ring-blue-500
        focus:border-blue-500
        transition
        ${className}
      `}
    />
  );
}