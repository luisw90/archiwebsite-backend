import * as mongoDB from "mongodb";
require("dotenv").config();
import { ArchiItem } from "../Types";

const database = process.env.DATABASE;
const itemCollection = process.env.COLLECTION;

const password = process.env.PASSWORD;
const username = process.env.USERNAME;

const dbPath = `mongodb+srv://${username}:${password}@myowncluster.yq33qsd.mongodb.net/?retryWrites=true&w=majority`;

const getAllItemsDb = async () => {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(dbPath);
  await client.connect();
  const db: mongoDB.Db = client.db(`${database}`);
  const col: mongoDB.Collection = db.collection(`${itemCollection}`);
  const data = await col.find().toArray();
  await client.close();
  return data;
};

const getItemDb = async (id: string) => {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(dbPath);
  await client.connect();
  const db: mongoDB.Db = client.db(`${database}`);
  const col: mongoDB.Collection = db.collection(`${itemCollection}`);
  const data = await col.find({ id: `${id}` }).toArray();
  await client.close();
  return data[0];
};
const saveItemDb = async (item: ArchiItem) => {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(dbPath);
  await client.connect();
  const db: mongoDB.Db = client.db(`${database}`);
  const col: mongoDB.Collection = db.collection(`${itemCollection}`);
  const data = await col.insertOne({
    id: item.id,
    title: item.title,
    architect: item.architect,
    description: item.description,
    image: item.image,
  });
  await client.close();
  return data;
};

const updateItemDb = async (id: string, item: ArchiItem) => {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(dbPath);
  await client.connect();
  const db: mongoDB.Db = client.db(`${database}`);
  const col: mongoDB.Collection = db.collection(`${itemCollection}`);
  const data = await col.updateOne(
    { id: `${id}` },
    {
      id: item.id,
      title: item.title,
      architect: item.architect,
      description: item.description,
      image: item.image,
    }
  );
  await client.close();
  return data;
};

const deleteItemDb = async (id: string) => {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(dbPath);
  await client.connect();
  const db: mongoDB.Db = client.db(`${database}`);
  const col: mongoDB.Collection = db.collection(`${itemCollection}`);
  const data = await col.deleteOne({ id: `${id}` });
  await client.close();
  return data;
};

export default {
  getAllItemsDb,
  getItemDb,
  saveItemDb,
  updateItemDb,
  deleteItemDb,
};
