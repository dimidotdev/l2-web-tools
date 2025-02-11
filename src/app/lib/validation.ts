import { Todo } from '../types/todo';

export function validateTodo(data: Partial<Todo>): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.title?.trim()) {
    errors.push('Title is required');
  }

  if (data.status && !['backlog', 'in_progress', 'done'].includes(data.status)) {
    errors.push('Invalid status');
  }

  if (data.priority && !['low', 'medium', 'high'].includes(data.priority)) {
    errors.push('Invalid priority');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}