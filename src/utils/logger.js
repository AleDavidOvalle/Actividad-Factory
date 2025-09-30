// Logger básico para no complicarnos (se puede cambiar por winston/pino)
const logger = {
  info: (msg) => console.log(`[INFO] ${new Date().toISOString()} - ${msg}`),
  error: (msg) => console.error(`[ERROR] ${new Date().toISOString()} - ${msg}`),
};
module.exports = { logger };
