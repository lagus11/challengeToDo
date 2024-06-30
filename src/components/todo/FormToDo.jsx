import { useRef } from "react";

export default function FormToDo(props) {
  const todoNameRef = useRef(null);

  const registerTodoInList = (event) => {
    event.preventDefault();
    const formTodo = new FormData(event.currentTarget);
    const todo = Object.fromEntries(formTodo.entries());
    todoNameRef.current.value = "";
    props.registerOrUpdateTodoInList(todo);
  };

  return (
    <>
    <form onSubmit={registerTodoInList}>
      <div className="w-full grid grid-cols-12">
        <div className="col-span-10 mr-2">
          <input
            required
            type="text"
            id="name"
            ref={todoNameRef}
            name="name"
            defaultValue={props.action == "update" ? props.todo?.name : ""}
            placeholder="To Do"
            className="py-2 px-2 w-full border-2 border-gray-300"
          />
        </div>
        <div className="col-span-2">
          <button
            type="submit"
            className="bg-cyan-600 py-2 px-4 w-full rounded text-white transition ease-in-out hover:bg-cyan-800 duration-1000"
          >
            Crear
          </button>
        </div>
      </div>
    </form>
  
    </>
  );
}
