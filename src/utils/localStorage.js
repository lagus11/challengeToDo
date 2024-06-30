const getLocalStorage = (name) => {
  if (!name) return [];
  const result = JSON.parse(localStorage.getItem(name));
  return result ? result.filter(f => f.parentId === null): [];
};

const getAllLocalStorage = (name) => {
  if (!name) return [];
  const result = JSON.parse(localStorage.getItem(name))
  return result ? result: [];
};

const getByIdLocalStorage = (id, name) => {
  const result = getAllLocalStorage(name);
  if (!result) return {};
  const find = result.find((r) => r.id == id);
  return find ? find : {};
};

const getAllByIdParentLocalStorage = (id, name) => {
  const result = getAllLocalStorage(name);
  if (!result) return [];
  const find = result.filter((r) => r.parentId == id);

  return find ? find : [];
}

const saveLocalStorage = (name, data) => {
  if (!name) return;
  const allData = getAllLocalStorage(name);
  localStorage.setItem(name, JSON.stringify([...allData, data]));
};

const updateByIdLocalStorage = (name, data) => {
  let allData = getAllLocalStorage(name);
  if (allData) {
    let updateData = allData.map((d) => {
      if (data.id == d.id) {
        return data; 
      }
        return d
      });
      localStorage.setItem(name, JSON.stringify(updateData));
  }
};

const deleteIdlocalStorage = (id, name) => {
  const result = getAllLocalStorage(name);
  const data = result.filter((r) => r.id !== id);
  localStorage.setItem(name, JSON.stringify(data));
  deleteChildrenIdParentRecursiveLocalStorage(id, name);
}

const deleteChildrenIdParentRecursiveLocalStorage = (id, name) => {
  const allChildren = getAllByIdParentLocalStorage(id, name);
  if(allChildren.length === 0) return;

  allChildren.forEach(ac => {
    deleteChildrenIdParentRecursiveLocalStorage(ac.id == id);
    deleteIdlocalStorage(ac.id, name);
  });

}

export { getLocalStorage, saveLocalStorage, getByIdLocalStorage, updateByIdLocalStorage, getAllByIdParentLocalStorage, getAllLocalStorage, deleteIdlocalStorage };
