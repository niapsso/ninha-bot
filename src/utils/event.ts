import { Client } from "discord.js";
import { Event, EventExec, EventKeys } from "../types/events";

export function event<T extends EventKeys>(
  id: T,
  exec: EventExec<T>
): Event<T> {
  return {
    id,
    exec,
  };
}

export function registerEvents(client: Client, events: Event<any>[]) {
  for (const event of events) {
    client.on(event.id, async (...args) => {
      const props = {
        client,
        log: (...args: unknown[]) => console.log(`${event.id}`, ...args),
      };

      try {
        await event.exec(props, ...args);
      } catch (error) {
        props.log("uncaught error", error);
      }
    });
  }
}
