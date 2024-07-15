/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

import { TodoList } from './components/TodoList';
import { TodoFilter } from './components/TodoFilter';
import { TodoModal } from './components/TodoModal';
import { Loader } from './components/Loader';
import { Todo } from './types/Todo';
import { getTodos } from './api';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [completedStatus, setCompletedStatus] = useState('all');
  const [query, setQuery] = useState('');

  let filteredTodos = todos;

  if (todos) {
    const filterByStatus = todos.filter(todo => {
      switch (completedStatus) {
        case 'active':
          return !todo.completed;

        case 'completed':
          return todo.completed;

        default:
          return true;
      }
    });

    filteredTodos = filterByStatus.filter(todo =>
      todo.title.toLowerCase().includes(query.toLowerCase()),
    );
  }

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter
                completedStatus={completedStatus}
                query={query}
                setCompletedStatus={setCompletedStatus}
                setQuery={setQuery}
              />
            </div>

            <div className="block">
              {!filteredTodos ? (
                <Loader />
              ) : (
                <TodoList
                  todos={filteredTodos}
                  selectedTodo={selectedTodo}
                  setSelectedTodo={setSelectedTodo}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedTodo && (
        <TodoModal
          selectedTodo={selectedTodo}
          setSelectedTodo={setSelectedTodo}
        />
      )}
    </>
  );
};
