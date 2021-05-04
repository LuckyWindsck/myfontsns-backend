import { StatusCodes } from 'http-status-codes';

import { Controller } from '../lib/controller';
import { User } from '../models';

const UserController: Controller = class UserController {
  // display a list of all users
  static index = async (req, res) => {
    const users = await User.findAll();

    res.send(users);
  }

  // create a new user
  static create = async (req, res) => {
    const user = await User.create(req.body);

    res.status(StatusCodes.CREATED).send(user);
  }

  // display a specific user
  static show = async (req, res) => {
    const user = await User.findByPk(req.params.id);

    res.send(user);
  }

  // update a specific user
  static update = async (req, res) => {
    const user = await User.findByPk(req.params.id);

    await user?.update(req.body);

    res.send(user);
  }

  // delete a specific user
  static destroy = async (req, res) => {
    const user = await User.findByPk(req.params.id);

    await user?.destroy();

    res.send(user);
  }
};

export default UserController;
