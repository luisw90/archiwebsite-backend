import db from "./db";

const getAllItems = async () => {
  const getitems = await db.getAllItemsDb();
  return getitems;
};

const getItem = async (id: string) => {
  const getitem = await db.getItemDb(id);
  return getitem;
};

const saveItem = async () => {
  const saveitem = await db.saveItemDb();
  return saveitem;
};

const updateItem = async (id: string) => {
  const updateitem = await db.updateItemDb(id);
  return updateitem;
};

const deleteItem = async (id: string) => {
  const deleteitem = await db.deleteItemDb(id);
  return deleteitem;
};

export { getAllItems, getItem, saveItem, updateItem, deleteItem };
