import minimist from "minimist";
import { subscribe } from "./core/index.js";

const argv = minimist(process.argv.slice(2));
console.log(argv);

subscribe(argv.delay);
