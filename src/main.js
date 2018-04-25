'use strict';

const server = require('./lib/server');
const logger = require('./lib/logger');

server.start(process.env.PORT, () => logger.log(logger.INFO, `Listening on port ${process.env.PORT}`));