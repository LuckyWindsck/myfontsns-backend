import type { ParamSchema } from 'express-validator';

const shouldExist: ParamSchema = {
  exists: {
    errorMessage: 'Should exist',
  },
};

const shouldNotBeEmpty: ParamSchema = {
  notEmpty: {
    errorMessage: 'Should not be empty',
  },
};

const shouldBeEmail: ParamSchema = {
  isEmail: {
    errorMessage: 'Should an email',
  },
};

const shouldBeStrongPassword: ParamSchema = {
  isStrongPassword: {
    errorMessage: 'Should have at least 8 characters, 1 lowercase alphabet, 1 uppercase alphabet, 1 number, and 1 symbol.',
  },
};

export {
  shouldExist,
  shouldNotBeEmpty,
  shouldBeEmail,
  shouldBeStrongPassword,
};
