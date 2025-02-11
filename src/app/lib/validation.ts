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

export function validateSuggestion(content: string) {
  if (!content?.trim()) {
    return {
      isValid: false,
      error: 'O conteúdo da sugestão é obrigatório'
    };
  }

  if (content.length > 280) {
    return {
      isValid: false,
      error: 'A sugestão deve ter no máximo 280 caracteres'
    };
  }

  return {
    isValid: true,
    error: null
  };
}