import React from "react";
import { Todo } from "../todo.model";

interface TodoListProps {
  items: Todo[];
  onDeleteTodo: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = props => {
  return (
    <ul>
      {props.items.map(item => (
        <li key={item.id}>
          <span>{item.text}</span>
          <button onClick={props.onDeleteTodo.bind(null, item.id)}>
            DELETE
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
