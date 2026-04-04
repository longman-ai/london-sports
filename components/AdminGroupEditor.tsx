'use client';

import { useState } from 'react';

interface AdminGroupEditorProps {
  groupId: string;
  initialContact: string;
  initialSourceUrl: string | null;
  initialName: string;
  initialVenue: string;
  initialDescription: string;
  initialLevel: string;
}

export default function AdminGroupEditor({
  groupId,
  initialContact,
  initialSourceUrl,
  initialName,
  initialVenue,
  initialDescription,
  initialLevel,
}: AdminGroupEditorProps) {
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [contact, setContact] = useState(initialContact);
  const [sourceUrl, setSourceUrl] = useState(initialSourceUrl || '');
  const [name, setName] = useState(initialName);
  const [venue, setVenue] = useState(initialVenue);
  const [description, setDescription] = useState(initialDescription);
  const [level, setLevel] = useState(initialLevel);

  const handleSave = async () => {
    setSaving(true);
    setMessage('');

    try {
      const res = await fetch(`/api/admin/groups/${groupId}/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contact, sourceUrl, name, venue, description, level }),
      });

      if (res.ok) {
        setMessage('✅ Saved successfully');
        setEditing(false);
      } else {
        const data = await res.json();
        setMessage(`❌ Error: ${data.error || 'Failed to save'}`);
      }
    } catch {
      setMessage('❌ Network error');
    } finally {
      setSaving(false);
    }
  };

  if (!editing) {
    return (
      <div className="mt-4 pt-4 border-t border-gray-200">
        <button
          onClick={() => setEditing(true)}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Edit Group
        </button>
        {message && <p className="mt-2 text-sm">{message}</p>}
      </div>
    );
  }

  return (
    <div className="mt-4 pt-4 border-t border-gray-200 space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Edit Group</h3>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Venue</label>
        <input
          type="text"
          value={venue}
          onChange={(e) => setVenue(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Level</label>
        <input
          type="text"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Contact URL</label>
        <input
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Source URL</label>
        <input
          type="text"
          value={sourceUrl}
          onChange={(e) => setSourceUrl(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
        <button
          onClick={() => {
            setEditing(false);
            setContact(initialContact);
            setSourceUrl(initialSourceUrl || '');
            setName(initialName);
            setVenue(initialVenue);
            setDescription(initialDescription);
            setLevel(initialLevel);
          }}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
        >
          Cancel
        </button>
      </div>

      {message && <p className="text-sm">{message}</p>}
    </div>
  );
}
