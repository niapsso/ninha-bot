import { Client, GatewayIntentBits } from "discord.js";
import { registerEvents } from "../utils/event";
import events from "../events";

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});

registerEvents(client, events);

client.login(process.env.CLIENT_TOKEN).catch((err) => {
  console.error("[login error]", err);
  process.exit(1);
});
