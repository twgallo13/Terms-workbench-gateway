"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Globe, Pencil, Plus } from "lucide-react";
import { SiteStatus } from "@twg/shared";
import type { Site } from "@twg/shared";
import { Button } from "@/components/ui";
import { Card, StatusPill } from "@/components/shell";
import { SiteForm } from "./site-form";
import { createSite, updateSite } from "./actions";

interface SitesTableProps {
  sites: Site[];
  canManage: boolean;
}

export function SitesTable({ sites, canManage }: SitesTableProps) {
  const router = useRouter();
  const [showCreate, setShowCreate] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  return (
    <>
      {/* Create form drawer */}
      {showCreate && canManage && (
        <Card className="mb-6">
          <h3 className="mb-4 text-sm font-semibold text-gray-900">
            New Site
          </h3>
          <SiteForm
            action={createSite}
            onSuccess={() => {
              setShowCreate(false);
              router.refresh();
            }}
            onCancel={() => setShowCreate(false)}
          />
        </Card>
      )}

      <Card padding={false}>
        {/* Table header with action */}
        {canManage && !showCreate && (
          <div className="flex items-center justify-end border-b border-gray-200 px-5 py-3">
            <Button size="sm" onClick={() => setShowCreate(true)}>
              <Plus className="h-4 w-4" />
              New Site
            </Button>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-5 py-3 font-medium text-gray-600">
                  Site Name
                </th>
                <th className="px-5 py-3 font-medium text-gray-600">Domain</th>
                <th className="px-5 py-3 font-medium text-gray-600">Status</th>
                <th className="px-5 py-3 font-medium text-gray-600">
                  Sort Order
                </th>
                {canManage && (
                  <th className="px-5 py-3 font-medium text-gray-600">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {sites.map((site) => (
                <tr key={site.id}>
                  {editingId === site.id ? (
                    <td colSpan={canManage ? 5 : 4} className="px-5 py-4">
                      <SiteForm
                        site={site}
                        action={(formData) => updateSite(site.id, formData)}
                        onSuccess={() => {
                          setEditingId(null);
                          router.refresh();
                        }}
                        onCancel={() => setEditingId(null)}
                      />
                    </td>
                  ) : (
                    <>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-100">
                            <Globe className="h-4 w-4 text-gray-500" />
                          </div>
                          <span className="font-medium text-gray-900">
                            {site.displayLabel}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-gray-700">
                        {site.domain}
                      </td>
                      <td className="px-5 py-3.5">
                        <StatusPill
                          label={
                            site.status === SiteStatus.Active
                              ? "Active"
                              : "Inactive"
                          }
                          variant={
                            site.status === SiteStatus.Active ? "green" : "gray"
                          }
                        />
                      </td>
                      <td className="px-5 py-3.5 text-gray-500">
                        {site.sortOrder}
                      </td>
                      {canManage && (
                        <td className="px-5 py-3.5">
                          <button
                            type="button"
                            onClick={() => setEditingId(site.id)}
                            className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
                            aria-label={`Edit ${site.displayLabel}`}
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                        </td>
                      )}
                    </>
                  )}
                </tr>
              ))}

              {sites.length === 0 && (
                <tr>
                  <td
                    colSpan={canManage ? 5 : 4}
                    className="px-5 py-12 text-center"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Globe className="h-8 w-8 text-gray-300" />
                      <p className="text-sm font-medium text-gray-900">
                        No sites yet
                      </p>
                      <p className="text-sm text-gray-500">
                        Create your first site to get started.
                      </p>
                      {canManage && (
                        <Button
                          size="sm"
                          className="mt-2"
                          onClick={() => setShowCreate(true)}
                        >
                          <Plus className="h-4 w-4" />
                          New Site
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}
