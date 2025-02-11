'use client';

import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Todo } from '../types/todo';
import EditTodoModal from './EditTodoModal';
import 'dotenv/config';

export const dynamic = 'force-dynamic';

export default function TodoBoard() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newTodo, setNewTodo] = useState('');
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const columns = [
    { id: 'backlog', title: 'Backlog', color: 'bg-gray-100' },
    { id: 'in_progress', title: 'Em Progresso', color: 'bg-blue-50' },
    { id: 'done', title: 'Concluído', color: 'bg-green-50' },
  ];

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/v1/todos`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      
      if (Array.isArray(data.todos)) {
        setTodos(data.todos);
      } else {
        console.error('Invalid todos data format:', data);
        setTodos([]);
      }
    } catch (error) {
      console.error('Error loading todos:', error);
      setTodos([]);
      alert('Erro ao carregar tarefas. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTodo = async () => {
    if (!newTodo.trim()) return;
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/v1/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newTodo,
          status: 'backlog',
          priority: 'medium',
          description: '',
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      
      if (data.todo) {
        setTodos(prevTodos => [...prevTodos, data.todo]);
        setNewTodo('');
        setIsAdding(false);
      } else {
        console.error('Invalid response format:', data);
      }
    } catch (error) {
      console.error('Error adding todo:', error);
      alert('Erro ao adicionar tarefa. Tente novamente.');
    }
  };

  const handleUpdateTodo = async (todoId: string, updates: Partial<Todo>) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/v1/todos/${todoId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });

      if (response.ok) {
        setTodos(todos.map(todo => 
          todo.id === todoId ? { ...todo, ...updates } : todo
        ));
        setEditingTodo(null);
      }
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleDeleteTodo = async (todoId: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/v1/todos/${todoId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTodos(todos.filter(todo => todo.id !== todoId));
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const onDragEnd = async (result: any) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;
    
    if (source.droppableId === destination.droppableId) {
      const newTodos = Array.from(todos);
      const [removed] = newTodos.splice(source.index, 1);
      newTodos.splice(destination.index, 0, removed);
      setTodos(newTodos);
    } else {
      const todoId = draggableId;
      const newStatus = destination.droppableId;
      
      try {
        await handleUpdateTodo(todoId, { status: newStatus as Todo['status'] });
      } catch (error) {
        console.error('Error updating todo status:', error);
      }
    }
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Backlog de Desenvolvimento</h2>
        <button
          onClick={() => setIsAdding(true)}
          className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 flex items-center gap-2"
        >
          <PlusIcon className="h-4 w-4" />
          Nova Tarefa
        </button>
      </div>

      {isAdding && (
        <div className="mb-4 flex gap-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Digite uma nova tarefa..."
            className="flex-1 p-2 border rounded-md"
            onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
          />
          <button
            onClick={handleAddTodo}
            className="bg-green-500 text-white px-4 rounded-md hover:bg-green-600"
          >
            Adicionar
          </button>
          <button
            onClick={() => setIsAdding(false)}
            className="bg-gray-500 text-white px-4 rounded-md hover:bg-gray-600"
          >
            Cancelar
          </button>
        </div>
      )}

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {columns.map(column => (
            <div 
              key={column.id}
              className={`${column.color} p-4 rounded-lg shadow-sm`}
            >
              <h3 className="font-bold mb-3">{column.title}</h3>
              <Droppable droppableId={column.id}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="space-y-2 min-h-[100px]"
                  >
                    {todos
                      .filter(todo => todo.status === column.id)
                      .map((todo, index) => (
                        <Draggable
                          key={todo.id}
                          draggableId={todo.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="bg-white p-3 rounded-md shadow-sm"
                            >
                              <div className="flex justify-between items-start">
                                <p className="font-medium">{todo.title}</p>
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => setEditingTodo(todo)}
                                    className="text-blue-500 hover:text-blue-700"
                                  >
                                    <PencilIcon className="h-4 w-4" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteTodo(todo.id)}
                                    className="text-red-500 hover:text-red-700"
                                  >
                                    <TrashIcon className="h-4 w-4" />
                                  </button>
                                </div>
                              </div>
                              {todo.description && (
                                <p className="text-sm text-gray-600 mt-1">
                                  {todo.description}
                                </p>
                              )}
                              <div className="mt-2">
                                <span className={`text-xs px-2 py-1 rounded ${
                                  todo.priority === 'high' ? 'bg-red-100 text-red-800' :
                                  todo.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-green-100 text-green-800'
                                }`}>
                                  {todo.priority === 'high' ? 'Alta' :
                                   todo.priority === 'medium' ? 'Média' : 'Baixa'}
                                </span>
                              </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>

      {editingTodo && (
        <EditTodoModal
          todo={editingTodo}
          isOpen={!!editingTodo}
          onClose={() => setEditingTodo(null)}
          onSave={(updates) => handleUpdateTodo(editingTodo.id, updates)}
        />
      )}
    </div>
  );
}