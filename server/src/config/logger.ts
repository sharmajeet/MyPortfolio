import winston from "winston";

// Serilog-style console output: [17:54:12 INF] message
const ABBREV: Record<string, string> = { info: "INF", warn: "WRN", error: "ERR", debug: "DBG" };
const COLOR: Record<string, string> = { INF: "\x1b[32m", WRN: "\x1b[33m", ERR: "\x1b[31m", DBG: "\x1b[90m" };
const RESET = "\x1b[0m";
const DIM = "\x1b[90m";

const lineFormat = winston.format.printf(({ timestamp, level, message }) => {
  const abbr = ABBREV[level] ?? level.slice(0, 3).toUpperCase();
  const color = COLOR[abbr] ?? "";
  return `${DIM}[${timestamp as string} ${color}${abbr}${DIM}]${RESET} ${message as string}`;
});

export const logger = winston.createLogger({
  level: "debug",
  format: winston.format.combine(winston.format.timestamp({ format: "HH:mm:ss" }), lineFormat),
  transports: [new winston.transports.Console()],
});
