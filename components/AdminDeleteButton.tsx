'use client';

import { useState } from 'react';

export default function AdminDeleteButton({ groupId, groupName }: { groupId: string; groupName: string }) {
  const [confirming, setConfirming] = useState(false);

  if (!confirming) {
    return (
      <button
        onClick={() => setConfirming(true)}
        className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-md hover:bg-red-100"
      >
        Delete Group
      </button>
    );
  }

  return (
    <div className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-md">
      <p className="text-sm text-red-700">Delete &quot;{groupName}&quot; permanently?</p>
      <form action={`/api/admin/groups/${groupId}/delete`} method="POST">
        <button
          type="submit"
          className="px-3 py-1.5 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
        >
          Yes, delete
        </button>
      </form>
      <button
        onClick={() => setConfirming(false)}
        className="px-3 py-1.5 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
      >
        Cancel
      </button>
    </div>
  );
}
