'use client';

import Header from '../components/Header';
import Tabs from '../components/Tabs';
import { usePersistentState } from '../lib/hooks/usePersistentState';
import { tasksToday } from '../lib/task';
import { Cadence, Person } from '../lib/models';
import { formatUK } from '../lib/date';

export default function Page() {
  const [cadences] = usePersistentState<Cadence[]>('cadences', []);
  const [people] = usePersistentState<Person[]>('people', []);
  const tasks = tasksToday(people, cadences);

  return (
    <div className="container mx-auto max-w-7xl px-6">
      <Header />
      <Tabs />
      {tasks.length === 0 ? (
        <p>No tasks due today.</p>
      ) : (
        <div className="grid gap-4">
          {tasks.map(task => (
            <div key={`${task.personId}-${task.stepIndex}`} className="p-3 border rounded bg-white">
              <div className="font-medium">{task.stepLabel}</div>
              <div className="text-sm">
                {task.personName} — {task.account}
              </div>
              <div className="text-xs text-gray-500">Due {formatUK(task.dueDate)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
