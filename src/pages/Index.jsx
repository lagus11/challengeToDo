import { useEffect, useState } from "react";
import LiToDo from "../components/todo/LiToDo";
import FormToDo from "../components/todo/FormToDo";
import Header from "../components/header/Header";
import Pagination from "../components/pagination/Pagination";
import {
  deleteIdlocalStorage,
  getLocalStorage,
  saveLocalStorage,
} from "../utils/localStorage";
import generateIdToDo from "../utils/generateIdToDo";
import SuccessModal from "../components/common/Dialog/SuccessModal";
import DeleteModal from "../components/common/Dialog/DeleteModal";

export default function Index() {
  const [todoList, setTodoList] = useState([]);
  const [recordToDo, setRecordToDo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenSuccess, setIsOpenSuccess] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  useEffect(() => {
    getToDos();
  }, []);

  const getToDos = () => {
    setIsLoading(true);
    const storedTodos = getLocalStorage("todos");
    setTimeout(() => {
      if (storedTodos) {
        setTodoList(storedTodos);
      }
      setIsLoading(false);
    }, 600);
  };

  const registerTodoInList = (todo) => {
    const newTodo = {
      id: generateIdToDo("todos"),
      name: todo.name,
      parentId: null,
    };
    const addAllTodo = [...todoList, newTodo];
    setTodoList(addAllTodo);
    saveLocalStorage("todos", newTodo);
    setIsOpenSuccess(true);
  };

  const deleteTodo = (id) => {
    const todos = todoList.filter((todo) => todo.id !== id);
    setTodoList(todos);
    setIsOpenDelete(true);
    deleteIdlocalStorage(id, "todos");
  };

  return (
    <>
      <Header title="To Do List" />
      <div className="container mx-auto">
        <div className="w-full grid grid-cols-12">
          <div className="col-span-12 md:col-span-8 md:col-start-3">
            <FormToDo
              action="add"
              registerOrUpdateTodoInList={registerTodoInList}
            />

            {todoList.length > 0 ? (
              <>
                <div className="flex flex-wrap justify-center my-8">
                  <div className="w-full sm:w-full">
                    <ul className="border-2 border-gray-300 rounded-md divide-y">
                      {recordToDo.map((todo, i) => (
                        <LiToDo
                          key={i}
                          todoList={todoList}
                          setTodoList={setTodoList}
                          todo={todo}
                          deleteTodo={deleteTodo}
                        />
                      ))}
                    </ul>
                  </div>
                </div>

                <Pagination
                  setRecordToDo={setRecordToDo}
                  data={todoList}
                  pageTotal={10}
                />
              </>
            ) : isLoading ? (
              <h1 className="mt-8 text-center text-xl">Cargando ToDo......</h1>
            ) : (
              <h1 className="mt-8 text-center text-xl">
                Sin To Do registrados
              </h1>
            )}
          </div>
        </div>
      </div>

      <SuccessModal
        isOpen={isOpenSuccess}
        setIsOpen={setIsOpenSuccess}
        message="Registro del ToDo con éxito."
      />

      <DeleteModal
        isOpen={isOpenDelete}
        setIsOpen={setIsOpenDelete}
        message="Se ha elimnado el ToDo con éxito"
      />
    </>
  );
}
