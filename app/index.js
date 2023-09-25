import minimist from "minimist";
import { subscribe } from "./win_api.js";

const argv = minimist(process.argv.slice(2));
console.log(argv);

subscribe(argv.delay);
