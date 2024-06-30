import { useEffect, useState } from "react";
import { updateByIdLocalStorage } from "../../utils/localStorage";
import UpdateModal from "../common/Dialog/UpdateModal";

export default function FormUpdateToDo(props) {
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [todoName, setTodoName] = useState("");

  useEffect(() => {
    setTodoName(props.todo.name);
  }, [props.todo]);

  const update = (event) => {
    event.preventDefault();
    const formTodo = new FormData(event.currentTarget);
    const todoEntries = Object.fromEntries(formTodo.entries());
    updateTodo(todoEntries);
  };

  const updateTodo = (todoForm) => {
    const newTodo = { ...props.todo, name: todoForm.name };
    updateByIdLocalStorage("todos", newTodo);
    props.setTodo(newTodo);
    setIsOpenUpdate(true);
  };

  return (
    <>
      <header className="flex justify-center">
        <form onSubmit={update} className="mb-4">
          <label className="mr-2">To Do</label>
          <input
            required
            type="text"
            id="name"
            name="name"
            value={todoName}
            placeholder="To Do"
            onChange={(e) => setTodoName(e.target.value)}
            className="py-2 px-2 border-2 border-gray-100"
          />
        </form>
      </header>
      <UpdateModal
        message="ToDo Actualizado con éxito"
        isOpen={isOpenUpdate}
        setIsOpen={setIsOpenUpdate}
      />
    </>
  );
}
