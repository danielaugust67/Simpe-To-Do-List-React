import React, { useState } from 'react';
import { PlusCircle, Trash2, CheckCircle, Circle, ListTodo } from 'lucide-react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim() === '') return;
    
    setTodos([...todos, {
      id: Date.now(),
      text: newTodo.trim(),
      completed: false
    }]);
    setNewTodo('');
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 py-12 px-4">
      <div className="max-w-md mx-auto">
        <div className="bg-white/10 backdrop-blur-lg rounded-t-2xl p-6 shadow-xl">
          <div className="flex items-center justify-center gap-3 mb-8">
            <ListTodo className="text-white" size={32} />
            <h1 className="text-4xl font-bold text-white">Todo List</h1>
          </div>
          
          <form onSubmit={addTodo} className="flex gap-2 mb-6">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="What needs to be done?"
              className="flex-1 px-4 py-3 bg-white/20 text-white placeholder-white/60 border-2 border-white/20 rounded-xl focus:outline-none focus:border-white/40 transition-colors duration-200"
            />
            <button
              type="submit"
              className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl transition-all duration-200 flex items-center gap-2 border-2 border-white/20 hover:border-white/40 active:scale-95"
            >
              <PlusCircle size={20} />
              Add
            </button>
          </form>
        </div>

        <div className="bg-white rounded-b-2xl shadow-xl divide-y divide-gray-100">
          <div className="space-y-1">
            {todos.map(todo => (
              <div
                key={todo.id}
                className="flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors duration-200 group"
              >
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className="text-gray-400 hover:text-purple-500 transition-colors duration-200"
                >
                  {todo.completed ? (
                    <CheckCircle className="text-green-500" size={24} />
                  ) : (
                    <Circle className="hover:text-indigo-500" size={24} />
                  )}
                </button>
                
                <span 
                  className={`flex-1 text-lg ${
                    todo.completed 
                      ? 'line-through text-gray-400' 
                      : 'text-gray-700'
                  }`}
                >
                  {todo.text}
                </span>
                
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors duration-200 opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
          
          {todos.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-gray-500">
              <ListTodo size={48} className="mb-4 text-gray-400" />
              <p className="text-lg">
                Your todo list is empty
              </p>
              <p className="text-sm text-gray-400">
                Add a new todo to get started
              </p>
            </div>
          )}
          
          {todos.length > 0 && (
            <div className="px-4 py-3 bg-gray-50 rounded-b-2xl text-sm text-gray-500 flex justify-between items-center">
              <span>
                {todos.filter(t => t.completed).length} of {todos.length} completed
              </span>
              <span>
                {todos.filter(t => !t.completed).length} remaining
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;