"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
const item_1 = require("../models/item");
const ITEMS = [];
exports.createItem = (req, res, next) => {
    const id = Math.random().toString();
    /** Cast type here to request or make interface */
    const text = req.body.text;
    const newItem = new item_1.Item(id, text);
    ITEMS.push(newItem);
    res.status(201).json({ message: "Item was created.", item: newItem });
};
exports.getItems = (req, res, next) => {
    res.json({ items: ITEMS });
};
exports.updateItem = (req, res, next) => {
    const id = req.params.id;
    const newText = req.body.text;
    let item = ITEMS.find(item => item.id === id);
    if (!item) {
        res.json({ message: "Item was not find!", item: null });
        return;
    }
    item.text = newText;
    res.json({ message: "Item was updated!", item: item });
};
exports.deleteItem = (req, res, next) => {
    const id = req.params.id;
    let itemIndex = ITEMS.findIndex(item => item.id === id);
    if (itemIndex < 0) {
        res.json({ message: "Item was not find!", item: null });
        return;
    }
    ITEMS.splice(itemIndex, 1);
    res.json({ message: "Item was deleted!", itemId: id });
};
