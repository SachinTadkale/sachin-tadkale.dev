/* eslint-disable no-console */
export const logger = {
  info(message: string, ...args: any[]): void {
    console.log(`[INFO] ${new Date().toISOString()}: ${message}`, ...args);
  },

  warn(message: string, ...args: any[]): void {
    console.warn(`[WARN] ${new Date().toISOString()}: ${message}`, ...args);
  },

  error(message: string, error?: unknown, ...args: any[]): void {
    console.error(`[ERROR] ${new Date().toISOString()}: ${message}`, error, ...args);
  },
};
