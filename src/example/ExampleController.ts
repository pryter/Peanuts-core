import {Controller} from "../lib/controls/Controller";
import {Queue} from "../lib/controls/Queue";
import {Storage} from "../lib/storage/Storage";
import {Player} from "../lib/controls/Player";
import {ExamplePlayer} from "./ExamplePlayer";

export class ExampleController extends Controller {

  // Create commands from a custom Controller to apply these registered Queue or Player instance

  constructor() {
    super();
  }

  // Override custom Queue and Player

  protected getQueueInstance(): Queue {
    return new Queue(new Storage("example_queue"))
  }

  protected getPlayerInstance(): Player {
    return new ExamplePlayer(this)
  }

}
