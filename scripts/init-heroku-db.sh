#!/usr/bin/env bash

file_path=node_modules/sequelize-cli/lib/core/migrator.js
line_number=41

code="    return new Sequelize(config.uri, config);"
sed -i "${line_number}s/.*/${code}/" ${file_path}

yarn sequelize db:migrate:undo:all
yarn sequelize db:migrate
yarn sequelize db:seed:all

original_code="    return new Sequelize(config);"
sed -i "${line_number}s/.*/${original_line}/" ${file_path}
