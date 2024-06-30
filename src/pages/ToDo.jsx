import FormToDo from "../components/todo/FormToDo";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  deleteIdlocalStorage,
  getAllByIdParentLocalStorage,
  getByIdLocalStorage,
  saveLocalStorage,
} from "../utils/localStorage";
import ButtonBack from "../components/common/ButtonBack";
import LiToDo from "../components/todo/LiToDo";
import Pagination from "../components/pagination/Pagination";
import generateIdToDo from "../utils/generateIdToDo";
import { isObjectEmpty } from "../utils/methods";
import FormUpdateToDo from "../components/todo/FormUpdateToDo";
import SuccessModal from "../components/common/Dialog/SuccessModal";
import DeleteModal from "../components/common/Dialog/DeleteModal";

export default function ToDo() {
  const [todo, setTodo] = useState({});
  const [todoList, setTodoList] = useState([]);
  const [recordToDo, setRecordToDo] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenSuccess, setIsOpenSuccess] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  let { id } = useParams();

  useEffect(() => {
    getTodo();
  }, [id]);

  useEffect(() => {
    setTodoList([]);
    getSubToDos();
  }, [id]);

  const getTodo = () => {
    const todoResult = getByIdLocalStorage(id, "todos");
    if (!isObjectEmpty(todoResult)) {
      setTodo(todoResult);
    }
  };

  const registerTodoInList = (todo) => {
    const newTodo = {
      id: generateIdToDo("todos"),
      name: todo.name,
      parentId: id,
    };
    const addAllTodo = [...todoList, newTodo];
    setTodoList(addAllTodo);
    saveLocalStorage("todos", newTodo);
    setIsOpenSuccess(true);
  };

  const getSubToDos = () => {
    setIsLoading(true);
    const storedTodos = getAllByIdParentLocalStorage(id, "todos");
    setTimeout(() => {
      if (storedTodos) {
        setTodoList(storedTodos);
      }
      setIsLoading(false);
    }, 600);
  };

  const deleteTodo = (id) => {
    const todos = todoList.filter((todo) => todo.id !== id);
    setTodoList(todos);
    setIsOpenDelete(true);
    deleteIdlocalStorage(id, "todos");
  };

  return (
    <>
      <ButtonBack />
      {!isObjectEmpty(todo) ? (
        <>
          <FormUpdateToDo todo={todo} setTodo={setTodo} />
          <div className="container mx-auto">
            <div className="w-full grid grid-cols-12">
              <div className="col-span-12 md:col-span-8 md:col-start-3">
                <FormToDo
                  action="add"
                  todo={todo}
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
                  <h1 className="mt-8 text-center text-xl">
                    Cargando ToDo......
                  </h1>
                ) : (
                  <h1 className="mt-8 text-center text-xl">
                    Sin To Do registrados
                  </h1>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <h2 className="mt-8 text-center text-xl">
          No se encontro ningun ToDo con ese registro
        </h2>
      )}

      <SuccessModal
        message="Registro del SubToDo con éxito"
        isOpen={isOpenSuccess}
        setIsOpen={setIsOpenSuccess}
      />

      <DeleteModal
        isOpen={isOpenDelete}
        setIsOpen={setIsOpenDelete}
        message="Se ha elimnado el ToDo con éxito"
      />
    </>
  );
}
