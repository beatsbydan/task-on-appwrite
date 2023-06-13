import app from './app';
import logger from './common/logger';
import config from './config';

app.listen(config.port, () => logger.info(`
    🚀 Server ready at: http://${config.host}:${config.port}${config.api.prefix}
`));
