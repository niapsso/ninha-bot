import "dotenv/config";

import { REST, Routes, APIUser } from "discord.js";
import commands from "../commands";

const body = commands
  .map(({ commands }) => commands.map(({ meta }) => meta))
  .flat();

const rest = new REST({ version: "10" }).setToken(
  process.env.CLIENT_TOKEN as string
);

(async () => {
  const currentUser = (await rest.get(Routes.user())) as APIUser;

  const endpoint =
    process.env.NODE_ENV === "prod"
      ? Routes.applicationCommands(currentUser.id)
      : Routes.applicationGuildCommands(
          currentUser.id,
          process.env.TEST_GUILD as string
        );

  await rest.put(endpoint, { body });

  return currentUser;
})()
  .then((user) => {
    const tag = `${user.username}#${user.discriminator}`;

    const response =
      process.env.NODE_ENV === "prod"
        ? `succesfully realesed commands in production as ${tag}`
        : `succesfully realesed commands for development in ${process.env.TEST_GUILD} as ${tag}`;

    console.log(response);
  })
  .catch();
