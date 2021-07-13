import { matchedData } from 'express-validator';
import { StatusCodes } from 'http-status-codes';

import type { Controller } from '../lib/controller';
import db from '../lib/db';
import { User } from '../models';
import { checkBodySchema, runAllValidations } from '../util/express-validator';
import { shouldExist, shouldNotBeEmpty } from '../util/express-validator/custom-param-schemas';
import { docWithData } from '../util/json-api';

const FontController: Controller = class FontController {
  // display a list of all fonts
  static index = async (req, res, next) => {
    try {
      const user = await User.getById(req.params.userId);
      const fonts = await user.getFonts();
      const dataResponse = fonts.map((font) => font.convert());

      res.send(docWithData(dataResponse));
    } catch (error) {
      next(error);
    }
  }

  // create a new font
  static create = async (req, res, next) => {
    try {
      const user = await User.getById(req.params.userId);

      const validations = checkBodySchema({
        character: {
          ...shouldExist,
          ...shouldNotBeEmpty,
        },
        data: {
          ...shouldExist,
          ...shouldNotBeEmpty,
        },
        formatVersion: {
          ...shouldExist,
          ...shouldNotBeEmpty,
        },
      });

      await runAllValidations(validations, req);

      const validatedFontData = matchedData(req);
      const { character, data, formatVersion } = validatedFontData;

      const font = await db.transaction((t) => (
        user.createFont({ character, data, formatVersion }, { transaction: t })
      ));
      const dataResponse = font.convert();

      res.status(StatusCodes.CREATED).send(docWithData(dataResponse));
    } catch (error) {
      next(error);
    }
  }
};

export default FontController;
