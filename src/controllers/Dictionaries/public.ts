import { Request, Response } from "express";

import { ACCOUNT_TYPES, RESTRICTIONS } from "../../models/Accounts";

export default class PublicDictionariesController {
  public static async accountTypes(req: Request, res: Response) {
   const types = Object.entries(ACCOUNT_TYPES).map(([name, value]) => ({
     name,
     value,
   }));

   res.json(types);
  }

  public static async accountRestrictions(req: Request, res: Response) {
   const types = Object.entries(RESTRICTIONS).map(([name, value]) => ({
     name,
     value,
   }));

   res.json(types);
  }

}
