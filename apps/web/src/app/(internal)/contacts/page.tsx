import { PageHeader, Card } from "@/components/shell";
import { EmptyState } from "@/components/ui";
import { Users } from "lucide-react";

export default function ContactsPage() {
  return (
    <div>
      <PageHeader
        title="Contacts"
        description="Manage vendor and brand contacts across all accounts."
      />
      <Card>
        <EmptyState
          icon={<Users className="h-8 w-8" />}
          title="No contacts yet"
          description="Contacts will appear here once vendors and brands are created."
        />
        {/* TODO: fetch contacts from Firestore, implement search and filters */}
      </Card>
    </div>
  );
}
