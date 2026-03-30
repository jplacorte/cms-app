export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-sm font-semibold text-slate-800 border-b pb-2 mt-4">
      {children}
    </h3>
  );
}