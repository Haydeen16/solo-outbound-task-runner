'use client'

import { useState } from 'react';
import Header from '../../components/Header';
import Tabs from '../../components/Tabs';
import { usePersistentState } from '../../lib/hooks/usePersistentState';
import { Account } from '../../lib/models';

export default function AccountsPage() {
  const [accounts, setAccounts] = usePersistentState<Account[]>('accounts', []);
  const [form, setForm] = useState({ account: '', domain: '', phone: '', notes: '' });

  const addAccount = () => {
    if (!form.account.trim()) return;
    const newAccount: Account = {
      id: Date.now().toString(),
      account: form.account.trim(),
      domain: form.domain.trim(),
      phone: form.phone.trim(),
      notes: form.notes.trim(),
    };
    setAccounts([...accounts, newAccount]);
    setForm({ account: '', domain: '', phone: '', notes: '' });
  };

  const removeAccount = (id: string) => {
    setAccounts(accounts.filter((a) => a.id !== id));
  };

  return (
    <div className="min-h-screen">
      <Header />
      <Tabs />
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4">Accounts</h1>
        <div className="mb-4 space-y-2">
          <input
            value={form.account}
            onChange={(e) => setForm({ ...form, account: e.target.value })}
            placeholder="Account"
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
          <input
            value={form.domain}
            onChange={(e) => setForm({ ...form, domain: e.target.value })}
            placeholder="Domain"
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
          <input
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="Phone"
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
          <input
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            placeholder="Notes"
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
          <button
            onClick={addAccount}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add account
          </button>
        </div>
        {accounts.length === 0 ? (
          <p>No accounts.</p>
        ) : (
          <table className="w-full table-auto border-t border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2">Account</th>
                <th className="p-2">Domain</th>
                <th className="p-2">Phone</th>
                <th className="p-2">Notes</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((a) => (
                <tr key={a.id} className="border-t border-gray-200">
                  <td className="p-2 align-top">{a.account}</td>
                  <td className="p-2 align-top">{a.domain}</td>
                  <td className="p-2 align-top">{a.phone}</td>
                  <td className="p-2 align-top">{a.notes}</td>
                  <td className="p-2 align-top">
                    <button
                      onClick={() => removeAccount(a.id)}
                      className="text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
