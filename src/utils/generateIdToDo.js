import { getAllLocalStorage } from "./localStorage";

  const generateIdToDo = (name) => {
    const allData = getAllLocalStorage(name);
    if(allData.length === 0) return 1;
    const ultimateId = allData[allData.length - 1];
    return ultimateId.id + 1;
  };

  export default generateIdToDo;