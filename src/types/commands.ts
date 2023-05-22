import {
  Awaitable,
  Client,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from "discord.js";
import { LoggerFunction } from "./loggerFunction";

export interface CommandProps {
  interaction: ChatInputCommandInteraction;
  client: Client;
  log: LoggerFunction;
}

export type CommandExec = (props: CommandProps) => Awaitable<unknown>;

export type CommandMeta =
  | SlashCommandBuilder
  | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;

export interface Command {
  meta: CommandMeta;
  exec: CommandExec;
}

export interface CommandCategory {
  name: string;
  commands: Command[];
}
