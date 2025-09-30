import { loanService } from "../services/loanService";
export const loanController = {
  async list(req:any,res:any){ const loans = await loanService.listAll(); res.json(loans); },
  async create(req:any,res:any){ const loan = await loanService.create(req.body); res.status(201).json(loan); }
};
