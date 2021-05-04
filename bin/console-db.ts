// TypeStrong/ts-node
// Top-level await support in REPL #245
// https://github.com/TypeStrong/ts-node/issues/245#issuecomment-704456156
// https://github.com/TypeStrong/ts-node/issues/245#issuecomment-785523446

import repl from 'repl';
import db from '../src/lib/db';
import models from '../src/models';

const dbConsole = repl.start('> ');

dbConsole.context.db = db;
dbConsole.context.models = models;

Object.entries(models).forEach(([modelName, model]) => {
  dbConsole.context[modelName] = model;
});
