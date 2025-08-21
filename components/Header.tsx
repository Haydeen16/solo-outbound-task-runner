'use client';

import React, { useRef } from 'react';
import { Download, Upload, Play } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleExport() {
    const data = {
      cadences: JSON.parse(localStorage.getItem('cadences') || '[]'),
      people: JSON.parse(localStorage.getItem('people') || '[]'),
      accounts: JSON.parse(localStorage.getItem('accounts') || '[]'),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const date = new Date();
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    a.download = `solo-runner-${y}-${m}-${d}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleImport(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result as string);
        if (parsed.cadences) {
          localStorage.setItem('cadences', JSON.stringify(parsed.cadences));
        }
        if (parsed.people) {
          localStorage.setItem('people', JSON.stringify(parsed.people));
        }
        if (parsed.accounts) {
          localStorage.setItem('accounts', JSON.stringify(parsed.accounts));
        }
        alert('Import complete');
      } catch {
        alert('Failed to import');
      }
    };
    reader.readAsText(file);
  }

  return (
    <header className="flex items-center justify-between py-4 border-b border-gray-200 mb-4">
      <h1 className="text-xl font-semibold">Solo Outbound Task Runner</h1>
      <div className="flex gap-2">
        <button onClick={handleExport} className="px-3 py-1 border rounded flex items-center gap-1">
          <Download size={16} /> Export
        </button>
        <label className="px-3 py-1 border rounded flex items-center gap-1 cursor-pointer">
          <Upload size={16} /> Import
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json"
            onChange={handleImport}
            className="hidden"
          />
        </label>
        <Link href="/">
          <button className="px-3 py-1 border rounded flex items-center gap-1">
            <Play size={16} /> Start runner
          </button>
        </Link>
      </div>
    </header>
  );
}
