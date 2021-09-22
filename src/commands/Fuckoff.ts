import {MessageEmbed, VoiceConnection} from "discord.js";
import {Controller} from "../lib/controls/Controller";
import {Disconnect} from "./Disconnect";

export class Fuckoff extends Disconnect{
  getNamespace(): string | null {
    return "fuckoff"
  }
}
