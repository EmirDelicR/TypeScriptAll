/*
Doing this is same as code belows
import { Request, Response, NextFunction } from "express";

export const createItem = (
  req: Request,
  res: Response,
  next: NextFunction
) => {

};
*/

import { RequestHandler } from "express";
import { Item } from "../models/item";

const ITEMS: Item[] = [];

export const createItem: RequestHandler = (req, res, next) => {
  const id = Math.random().toString();
  /** Cast type here to request or make interface */
  const text = (req.body as { text: string }).text;
  const newItem = new Item(id, text);

  ITEMS.push(newItem);

  res.status(201).json({ message: "Item was created.", item: newItem });
};

export const getItems: RequestHandler = (req, res, next) => {
  res.json({ items: ITEMS });
};

export const updateItem: RequestHandler<{ id: string }> = (req, res, next) => {
  const id = req.params.id;
  const newText = (req.body as { text: string }).text;

  let item = ITEMS.find(item => item.id === id);

  if (!item) {
    res.json({ message: "Item was not find!", item: null });
    return;
  }

  item.text = newText;
  res.json({ message: "Item was updated!", item: item });
};

export const deleteItem: RequestHandler<{ id: string }> = (req, res, next) => {
  const id = req.params.id;

  let itemIndex = ITEMS.findIndex(item => item.id === id);

  if (itemIndex < 0) {
    res.json({ message: "Item was not find!", item: null });
    return;
  }

  ITEMS.splice(itemIndex, 1);
  res.json({ message: "Item was deleted!", itemId: id });
};
