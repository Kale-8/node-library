import { Book } from "../models/index";
export const bookController = {
  async list(req:any, res:any){ const books = await Book.findAll(); res.json(books); },
  async get(req:any,res:any){ const id = Number(req.params.id); const book = await Book.findByPk(id); if(!book) return res.status(404).json({message:"Not found"}); res.json(book); },
  async create(req:any,res:any){ const b = await Book.create(req.body); res.status(201).json(b); },
  async update(req:any,res:any){ const id = Number(req.params.id); const book = await Book.findByPk(id); if(!book) return res.status(404).json({message:"Not found"}); const updated = await (book as any).update(req.body); res.json(updated); },
  async remove(req:any,res:any){ const id = Number(req.params.id); const book = await Book.findByPk(id); if(!book) return res.status(404).json({message:"Not found"}); await (book as any).destroy(); res.json({message:"deleted"}); }
};
