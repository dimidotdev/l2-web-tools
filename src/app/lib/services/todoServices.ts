import { Todo } from '../../types/todo';
import { connectDB } from '@/app/api/db';

export async function getTodos() {
  try {
    
    const { db } = await connectDB();
    
    const todos = await db
      .collection('todos')
      .find({})
      .sort({ updatedAt: -1 })
      .toArray();

    return { todos };
  } catch (error) {
    console.error('Error fetching todos:', error);
    return { todos: [] };
  }
}

export async function addTodo(todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>) {
  try {
    const { db } = await connectDB();
    
    const newTodo = {
      ...todo,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.collection('todos').insertOne(newTodo);
    return { todo: newTodo };
  } catch (error) {
    console.error('Error adding todo:', error);
    return null;
  }
}

export async function updateTodo(todoId: string, updates: Partial<Todo>) {
  try {
    const { db } = await connectDB();
    
    await db.collection('todos').updateOne(
      { id: todoId },
      { 
        $set: { 
          ...updates,
          updatedAt: new Date()
        } 
      }
    );

    return true;
  } catch (error) {
    console.error('Error updating todo:', error);
    return false;
  }
}

export async function deleteTodo(todoId: string) {
  try {
    const { db } = await connectDB();
    
    await db.collection('todos').deleteOne({ id: todoId });
    return true;
  } catch (error) {
    console.error('Error deleting todo:', error);
    return false;
  }
}