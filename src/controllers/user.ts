import { StatusCodes } from 'http-status-codes';

import { Controller } from '../lib/controller';
import { User } from '../models';

const UserController: Controller = class UserController {
  // display a list of all users
  static index = async (req, res) => {
    res.send();
  }

  // create a new user
  static create = async (req, res) => {
    const user = await User.create(req.body);

    res.status(StatusCodes.CREATED).send(user);
  }

  // display a specific user
  static show = async (req, res) => {
    res.send();
  }

  // update a specific user
  static update = async (req, res) => {
    res.send();
  }

  // delete a specific user
  static destroy = async (req, res) => {
    res.send();
  }
};

export default UserController;
