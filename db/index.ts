import db from "./db";
import { ArchiItem } from "../Types";

const getAllItems = async () => {
  const getitems = await db.getAllItemsDb();
  return getitems;
};

const getItem = async (id: string) => {
  const getitem = await db.getItemDb(id);
  return getitem;
};

const saveItem = async (item: ArchiItem) => {
  const saveitem = await db.saveItemDb(item);
  return saveitem;
};

const updateItem = async (id: string, item: ArchiItem) => {
  const updateitem = await db.updateItemDb(id, item);
  return updateitem;
};

const deleteItem = async (id: string) => {
  const deleteitem = await db.deleteItemDb(id);
  return deleteitem;
};

export { getAllItems, getItem, saveItem, updateItem, deleteItem };
