'use client';

import Header from '../../components/Header';
import Tabs from '../../components/Tabs';
import { usePersistentState } from '../../lib/hooks/usePersistentState';
import { Cadence, Person } from '../../lib/models';
import { todayLocalISO } from '../../lib/date';
import { useState } from 'react';

export default function PeoplePage() {
  const [cadences] = usePersistentState<Cadence[]>('cadences', []);
  const [people, setPeople] = usePersistentState<Person[]>('people', []);
  const [form, setForm] = useState({ name: '', account: '', email: '', phone: '', cadenceId: '' });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.account.trim()) return;
    const id = Date.now().toString();
    const cadenceId = form.cadenceId || (cadences[0]?.id || '');
    const newPerson: Person = {
      id,
      name: form.name.trim(),
      account: form.account.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      cadenceId,
      startDate: todayLocalISO(),
      stepIndex: 0,
      active: true,
      history: [],
    };
    setPeople([...people, newPerson]);
    setForm({ name: '', account: '', email: '', phone: '', cadenceId: '' });
  }

  function handleRemove(id: string) {
    setPeople(people.filter(p => p.id !== id));
  }

  return (
    <div className="container mx-auto max-w-7xl px-6">
      <Header />
      <Tabs />
      <h2 className="text-lg font-medium mb-2">Add person</h2>
      <form onSubmit={handleSubmit} className="mb-4 grid gap-2 max-w-md">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="border p-1" required />
        <input name="account" value={form.account} onChange={handleChange} placeholder="Account" className="border p-1" required />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="border p-1" />
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="border p-1" />
        <select name="cadenceId" value={form.cadenceId} onChange={handleChange} className="border p-1">
          <option value="">Select cadence</option>
          {cadences.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <button type="submit" className="border px-3 py-1">Add person</button>
      </form>
      <h2 className="text-lg font-medium mb-2">People</h2>
      {people.length === 0 ? <p>No people.</p> : (
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1 text-left">Name</th>
              <th className="border px-2 py-1 text-left">Account</th>
              <th className="border px-2 py-1 text-left">Cadence</th>
              <th className="border px-2 py-1"></th>
            </tr>
          </thead>
          <tbody>
            {people.map(p => {
              const cad = cadences.find(c => c.id === p.cadenceId);
              return (
                <tr key={p.id}>
                  <td className="border px-2 py-1">{p.name}</td>
                  <td className="border px-2 py-1">{p.account}</td>
                  <td className="border px-2 py-1">{cad?.name || ''}</td>
                  <td className="border px-2 py-1">
                    <button onClick={() => handleRemove(p.id)} className="text-red-600">Remove</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
