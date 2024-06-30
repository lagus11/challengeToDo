import React from "react";

export default function UpdateModal(props) {

  const closeModal = () => {
        props.setIsOpen(false);
  }

  if (!props.isOpen) return null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
      <div className="bg-white p-6 rounded-md shadow-md">
        <div className="flex justify-center my-2">
          <svg
            className="h-16 w-16 text-blue-500"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {" "}
            <path stroke="none" d="M0 0h24v24H0z" />{" "}
            <path d="M9 7 h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />{" "}
            <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />{" "}
            <line x1="16" y1="5" x2="19" y2="8" />
          </svg>

        </div>
        <h2 className="text-2xl font-semibold mb-4">{props.message}</h2>
        <div className="flex justify-end">
          <button
            className="bg-cyan-600 text-white px-4 py-2 rounded-md hover:bg-cyan-800"
            onClick={closeModal}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
