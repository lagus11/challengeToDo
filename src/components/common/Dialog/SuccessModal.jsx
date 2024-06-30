import React from "react";

export default function SuccessModal(props) {
  const closeModal = () => {
    props.setIsOpen(false);
  };

  if (!props.isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-100">
      <div className="bg-white p-6 rounded-md shadow-md">
        <div className="flex justify-center my-2">
          <svg
            className="h-16 w-16 text-green-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {" "}
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />{" "}
            <polyline points="22 4 12 14.01 9 11.01" />
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
