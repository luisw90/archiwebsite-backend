const express = require("express");
import { Request, Response, Application, NextFunction } from "express";
import {
  getAllItems,
  getItem,
  saveItem,
  updateItem,
  deleteItem,
} from "./db/index";

const app: Application = express();

const checkId = async (req: Request, res: Response, next: NextFunction) => {
  const id = req.params.itemId!.toString();
  if (id) {
    return;
  }
  return res.status(400).json({ message: "Bad request" });
};

//return a list of all
app.get("/api", async (_req: Request, res: Response) => {
  const data = await getAllItems();
  return res.status(200).json(data);
});

//return one puppy in json format
app.get("/api/:itemId", async (req: Request, res: Response) => {
  const id = req.params.itemId!.toString();
  if (id) {
    const data = await getItem(id);
    return res.status(200).json(data);
  }
  return res.status(400).json({ message: "Bad request" });
});

//create and return added puppy
app.post("/api", async (req: Request, res: Response) => {
  const id = req.params.itemId!.toString();
  if (id) {
    const data = await getItem(id);
    return res.status(200).json(data);
  }
  return res.status(400).json({ message: "Bad request" });
});

//Update specifik puppy
app.put("/api/:userId", async (req: Request, res: Response) => {
  const id = req.params.itemId!.toString();
  if (id) {
    const data = await getItem(id);
    return res.status(200).json(data);
  }
  return res.status(400).json({ message: "Bad request" });
});

//Delete puppy
app.put("/api/:userId", async (req: Request, res: Response) => {
  const id = req.params.itemId!.toString();
  if (id) {
    const data = await getItem(id);
    return res.status(200).json(data);
  }
  return res.status(400).json({ message: "Bad request" });
});

export default app;
