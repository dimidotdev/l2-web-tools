import TodoBoard from '@/app/components/TodoBoard';

export default function TodosPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl px-4 font-bold mb-6">Task Management</h1>
      <TodoBoard />
    </div>
  );
}