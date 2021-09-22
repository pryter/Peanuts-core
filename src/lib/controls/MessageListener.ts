import {Message} from "discord.js";
import {Controller} from "./Controller";

export type MessageListener = ((message: Message, content: string) => void) | ((message: Message, content: string) => Promise<void>)
