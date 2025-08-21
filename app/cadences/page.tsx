'use client'

import { useState } from 'react';
import Header from '../../components/Header';
import Tabs from '../../components/Tabs';
import { usePersistentState } from '../../lib/hooks/usePersistentState';
import { Cadence } from '../../lib/models';

export default function CadencesPage() {
  const [cadences, setCadences] = usePersistentState<Cadence[]>('cadences', []);
  const [name, setName] = useState('');

  const addCadence = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    const newCadence: Cadence = {
      id: Date.now().toString(),
      name: trimmed,
      steps: [],
    };
    setCadences([...cadences, newCadence]);
    setName('');
  };

  const removeCadence = (id: string) => {
    setCadences(cadences.filter((c) => c.id !== id));
  };

  return (
    <div className="min-h-screen">
      <Header />
      <Tabs />
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4">Cadences</h1>
        <div className="mb-4 space-y-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Cadence name"
            className="border border-gray-300 rounded px-3 py-2 w-full"
          />
          <button
            onClick={addCadence}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Add cadence
          </button>
        </div>
        {cadences.length === 0 ? (
          <p>No cadences.</p>
        ) : (
          <table className="w-full table-auto border-t border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2">Name</th>
                <th className="p-2">Steps</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {cadences.map((c) => (
                <tr key={c.id} className="border-t border-gray-200">
                  <td className="p-2 align-top">{c.name}</td>
                  <td className="p-2 align-top">{c.steps ? c.steps.length : 0}</td>
                  <td className="p-2 align-top">
                    <button
                      onClick={() => removeCadence(c.id)}
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
