const express = require("express");
const cors = require("cors");
const { json } = require("express");
import { Request, Response, Application, NextFunction } from "express";
import {
  getAllItems,
  getItem,
  saveItem,
  updateItem,
  deleteItem,
  getAllTeam,
} from "./db/index";

const app: Application = express();

app.use(cors());
app.use(json());

const checkId = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.itemId!.toString();
  if (id) {
    return;
  }
  return res.status(400).json({ message: "Bad request" });
};

//return a list of all members
app.get("/api/team", async (_req: Request, res: Response) => {
  const data = await getAllTeam();
  return res.status(200).json(data);
});

//return a list of all
app.get("/api/arch", async (_req: Request, res: Response) => {
  const data = await getAllItems();
  return res.status(200).json(data);
});

//return one puppy in json format
app.get("/api/arch/:id", async (req: Request, res: Response) => {
  const id = req.params.id!.toString();
  if (id) {
    const data = await getItem(id);
    return res.status(200).json(data);
  }
  return res.status(400).json({ message: "Bad request" });
});

//create and return added puppy
app.post("/api/arch", async (req: Request, res: Response) => {
  const item = req.body;
  const data = await saveItem(item);
  return res.status(200).json(data);
});

//Update specifik puppy
app.put("/api/arch/:id", async (req: Request, res: Response) => {
  const id = req.params.id!.toString();
  const item = req.body;
  if (id && item) {
    const data = await updateItem(id, item);
    return res.status(200).json(data);
  }
  return res.status(400).json({ message: "Bad request" });
});

//Delete puppy
app.delete("/api/arch/:id", async (req: Request, res: Response) => {
  const id = req.params.id!.toString();
  if (id) {
    const data = await deleteItem(id);
    return res.status(200).json(data);
  }
  return res.status(400).json({ message: "Bad request" });
});

export default app;
