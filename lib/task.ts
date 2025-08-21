import { Person, Cadence, Task } from './models';
import { addDays } from './date';

const typeOrder: Array<Task['type']> = ['call', 'email', 'linkedin', 'task'];

export function buildTasks(people: Person[], cadences: Cadence[]): Task[] {
  const tasks: Task[] = [];
  people.forEach((person) => {
    if (!person.active) return;
    const cadence = cadences.find((c) => c.id === person.cadenceId);
    if (!cadence) return;
    const step = cadence.steps[person.stepIndex];
    if (!step) return;
    // compute due date: startDate + offsets up to current step
    let accumulatedDate = person.startDate;
    for (let i = 0; i <= person.stepIndex; i++) {
      const s = cadence.steps[i];
      if (i === 0) {
        accumulatedDate = addDays(person.startDate, s.offsetDays);
      } else {
        accumulatedDate = addDays(accumulatedDate, s.offsetDays);
      }
    }
    let dueDate = accumulatedDate;
    if (person.nextDueOverride) {
      dueDate = person.nextDueOverride;
    }
    tasks.push({
      personId: person.id,
      personName: person.name,
      account: person.account,
      cadenceId: person.cadenceId,
      stepId: step.id,
      stepIndex: person.stepIndex,
      stepLabel: step.label,
      type: step.type,
      dueDate,
    });
  });
  tasks.sort((a, b) => {
    if (a.dueDate === b.dueDate) {
      return typeOrder.indexOf(a.type) - typeOrder.indexOf(b.type);
    }
    return a.dueDate.localeCompare(b.dueDate);
  });
  return tasks;
}

export function tasksToday(tasks: Task[], today: string): Task[] {
  return tasks.filter((t) => t.dueDate === today);
}
