import { VendorPageShell } from "@/components/vendor";
import { Loader2 } from "lucide-react";

export default async function VendorAccessPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  return (
    <VendorPageShell
      title="Secure Access"
      description="Validating your secure access link…"
    >
      <div className="flex flex-col items-center py-8 text-center">
        <Loader2 className="mb-4 h-8 w-8 animate-spin text-brand-600" />
        <p className="text-sm text-gray-600">
          Verifying your access credentials. You will be redirected shortly.
        </p>
        <p className="mt-4 text-xs text-gray-400">
          Token: {token.slice(0, 8)}…
        </p>
      </div>

      {/* TODO: validate token from accessLinks collection */}
      {/* TODO: check link expiration, status, and scope */}
      {/* TODO: redirect to appropriate review page based on link type */}
    </VendorPageShell>
  );
}
