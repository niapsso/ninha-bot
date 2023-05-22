import { event } from "../utils/event";

export default event("ready", ({ log }, client) => {
  log(`logged in as ${client.user.tag}`);
});
