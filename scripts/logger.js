import  log4js  from "log4js";


log4js.configure({
    appenders: {
        console: { type: "console"},
        fileWarn: { type: "file", filename: "warn.log"},
        fileError: { type: "file", filename: "error.log"},

        consoleLog: { type: "logLevelFilter", appender: "console", level: "info" },
        fileLogWarn: { type: "logLevelFilter", appender: "fileWarn", level: "warn" },
        fileLogError: { type: "logLevelFilter", appender: "fileError", level: "error" }
    },
    categories: {
        default: { appenders: [ "consoleLog", "fileLogWarn", "fileLogError" ], level: "all"}
    }
})


const logConsola = log4js.getLogger("consoleLog");
const logWarn = log4js.getLogger("fileWarn");
const logError = log4js.getLogger("fileError");



export { logConsola, logWarn, logError };