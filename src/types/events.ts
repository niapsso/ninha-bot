import { ClientEvents, Awaitable, Client } from "discord.js";
import { LoggerFunction } from "./loggerFunction";

export interface EventProps {
  client: Client;
  log: LoggerFunction;
}

export type EventKeys = keyof ClientEvents;

export type EventExec<T extends EventKeys> = (
  pros: EventProps,
  ...args: ClientEvents[T]
) => Awaitable<unknown>;

export interface Event<T extends EventKeys> {
  id: T;
  exec: EventExec<T>;
}
