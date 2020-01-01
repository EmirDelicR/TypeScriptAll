import React, { useState } from "react";
import TodoList from "./components/TodoList";
import NewTodo from "./components/NewTodo";
import { Todo } from "./todo.model";

const App: React.FC = () => {
  const [todoItems, setTodoItems] = useState<Todo[]>([]);

  const todoAddHandler = (text: string) => {
    // Pass function to update previous state
    setTodoItems(previousTodoItems => [
      ...previousTodoItems,
      { id: Math.random().toString(), text: text }
    ]);
  };

  const todoDeleteHandler = (id: string) => {
    setTodoItems(previousTodoItems => {
      return previousTodoItems.filter(item => item.id !== id);
    });
  };

  return (
    <div className="App">
      <NewTodo onAddTodo={todoAddHandler} />
      <TodoList onDeleteTodo={todoDeleteHandler} items={todoItems} />
    </div>
  );
};

export default App;
