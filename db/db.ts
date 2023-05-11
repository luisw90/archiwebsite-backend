import * as mongoDB from "mongodb";
require("dotenv").config();
import { ArchiItem } from "../Types";
import { v4 } from "uuid";
import { ObjectId } from "mongodb";

const database = process.env.DATABASE;
const itemCollection = process.env.ITEMCOLLECTION;
const teamCollection = process.env.TEAMCOLLECTION;

const password = process.env.PASSWORD;
const username = process.env.USERNAME;

const dbPath = `mongodb+srv://${username}:${password}@myowncluster.yq33qsd.mongodb.net/?retryWrites=true&w=majority`;

const getAllTeamDb = async () => {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(dbPath);
  await client.connect();
  const db: mongoDB.Db = client.db(`${database}`);
  const col: mongoDB.Collection = db.collection(`${teamCollection}`);
  const data = await col.find().toArray();
  await client.close();
  return data;
};

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
  const data = await col.find({ _id: new ObjectId(`${id}`) }).toArray();
  await client.close();
  return data[0];
};

const saveItemDb = async (item: ArchiItem) => {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(dbPath);
  await client.connect();
  const db: mongoDB.Db = client.db(`${database}`);
  const col: mongoDB.Collection = db.collection(`${itemCollection}`);
  const createItem: ArchiItem = {
    title: item.title,
    description: item.description,
    date: item.date,
    image: item.image,
  };
  const data = (await col.insertOne(createItem)).insertedId;
  await client.close();
  return data;
};

const updateItemDb = async (id: string, item: ArchiItem) => {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(dbPath);
  await client.connect();
  const db: mongoDB.Db = client.db(`${database}`);
  const col: mongoDB.Collection = db.collection(`${itemCollection}`);
  const updateItem: ArchiItem = {
    title: item.title,
    description: item.description,
    image: item.image,
  };
  const data = await col.updateOne(
    { _id: new ObjectId(`${id}`) },
    {
      $set: {
        title: item.title,
        description: item.description,
        image: item.image,
      },
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
  const data = await col.deleteOne({ _id: new ObjectId(`${id}`) });
  await client.close();
  return data;
};

export default {
  getAllItemsDb,
  getItemDb,
  saveItemDb,
  updateItemDb,
  deleteItemDb,
  getAllTeamDb,
};
