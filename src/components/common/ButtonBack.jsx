import { useNavigate } from "react-router-dom";

export default function ButtonBack(props) {
  let navigate = useNavigate();

  const backPage = () => {
    navigate(-1);
  }

  return (
    <div className="w-full grid grid-cols-12 p-4">
      <div className="col-span-12">
        <button onClick={backPage} className="bg-cyan-600 rounded-lg p-2 hover:bg-cyan-800 transition ease-in-out duration-1000">
          <svg
            className="h-8 w-8 text-white"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {" "}
            <path stroke="none" d="M0 0h24v24H0z" />{" "}
            <line x1="5" y1="12" x2="19" y2="12" />{" "}
            <line x1="5" y1="12" x2="11" y2="18" />{" "}
            <line x1="5" y1="12" x2="11" y2="6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
