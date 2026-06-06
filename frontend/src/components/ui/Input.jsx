// export default function Input({ className = "", error, ...props }) {
//   return (
//     <div className="w-full">
//       <input
//         {...props}
//         className={`
//           w-full
//           rounded-xl
//           border
//           border-white/[0.08]
//           bg-white/[0.05]
//           px-4
//           py-3
//           text-sm
//           text-white
//           placeholder:text-slate-500
//           focus:border-cyan-500/60
//           focus:outline-none
//           focus:ring-2
//           focus:ring-cyan-500/20
//           transition
//           duration-200
//           ${error ? "border-red-500/50 focus:border-red-500/60 focus:ring-red-500/20" : ""}
//           ${className}
//         `}
//       />
//       {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
//     </div>
//   );
// }