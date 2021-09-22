import {Bot} from "./lib/controls/Bot";
import {Controller} from "./lib/controls/Controller";
import dotenv from 'dotenv'
import {Fuckoff} from "./commands/Fuckoff";
import {Play} from "./commands/Play";
import {Disconnect} from "./commands/Disconnect";
import {Skip} from "./commands/Skip";
import {Clear} from "./commands/Clear";
import {Shuffle} from "./commands/Shuffle";

dotenv.config()

const peanuts = new Bot()

peanuts.register(
  new Play(),
  new Disconnect(),
  new Skip(),
  new Clear(),
  new Shuffle(),
  new Fuckoff()
)

peanuts.init(process.env.DEBUG_TOKEN)
