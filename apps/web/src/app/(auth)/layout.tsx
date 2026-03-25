export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-lg font-semibold text-gray-900">Terms Workbench</h1>
          <p className="mt-1 text-sm text-gray-500">Shiekh Shoes — Internal</p>
        </div>
        {children}
      </div>
    </div>
  );
}
