import { useNavigate } from 'react-router-dom';

export default function LiToDo(props) {
  let navigate = useNavigate();

  const goToUpdateTodo = (todo) => {
    navigate(`/todo/${todo.id}`);
  };

  return (
    <>
      <li>
        <div className="grid grid-cols-12">
          <div
            onClick={() => goToUpdateTodo(props.todo)}
            className="cursor-pointer col-span-11 hover:bg-gray-100 p-2"
          >
            <p className="text-center text-base">{props.todo.name}</p>
          </div>
          <div className="col-span-1">
            <div className="flex justify-center p-2">
              <button
                onClick={() => props.deleteTodo(props.todo.id)}
                className="border-2 border-red-400 text-red-400 w-8 h-8 font-bold rounded-full flex items-center justify-center hover:bg-red-400 hover:text-white "
              >
                X
              </button>
            </div>
          </div>
        </div>
      </li>
    </>
  );
}
