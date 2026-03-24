import { VendorPageShell } from "@/components/vendor";
import { Button } from "@/components/ui";
import { LogIn } from "lucide-react";

export default function LoginPage() {
  return (
    <VendorPageShell
      title="Sign In"
      description="Sign in with your Shiekh email to access the Terms Workbench."
    >
      <div className="mx-auto max-w-sm">
        <div className="mb-4">
          <label
            htmlFor="email"
            className="mb-1 block text-sm font-medium text-gray-700"
          >
            Email Address
          </label>
          <input
            id="email"
            type="email"
            disabled
            placeholder="you@shiekhshoes.org"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-60"
          />
        </div>

        <Button className="w-full" disabled>
          <LogIn className="h-4 w-4" />
          Continue
        </Button>

        {/* TODO: implement Firebase Auth sign-in (email link or email/password) */}
        {/* TODO: auto-provision internal admins for @shiekhshoes.org domain */}
        {/* TODO: allowlist checks for other internal emails/domains */}

        <p className="mt-6 text-center text-xs text-gray-500">
          Vendor? Use the secure link provided to you by Shiekh Shoes.
        </p>
      </div>
    </VendorPageShell>
  );
}
