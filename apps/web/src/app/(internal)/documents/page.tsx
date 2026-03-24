import { PageHeader, Card } from "@/components/shell";
import { EmptyState } from "@/components/ui";
import { FolderOpen } from "lucide-react";

export default function DocumentsPage() {
  return (
    <div>
      <PageHeader
        title="Documents"
        description="View and manage uploaded documents across vendors, quotes, and agreements."
      />
      <Card>
        <EmptyState
          icon={<FolderOpen className="h-8 w-8" />}
          title="No documents uploaded"
          description="Documents will appear here once they are attached to vendors, quotes, or agreements."
        />
        {/* TODO: fetch documents from Firestore, implement category filters */}
      </Card>
    </div>
  );
}
