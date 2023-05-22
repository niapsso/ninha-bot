import commands from "../../commands";
import { Command } from "../../types/commands";
import { EditReply, Reply } from "../../utils/replies";
import { event } from "../../utils/event";

const allCommands = commands.map(({ commands }) => commands).flat();

const allCommandsMap = new Map<string, Command>(
  allCommands.map((command) => [command.meta.name, command])
);

export default event(
  "interactionCreate",
  async ({ log, client }, interaction) => {
    if (!interaction.isChatInputCommand()) return;

    try {
      const commandName = interaction.commandName;
      const command = allCommandsMap.get(commandName);

      if (!command) throw new Error("command not found");

      await command.exec({
        client,
        interaction,
        log(...args) {
          log(`[${command.meta.name}]`, args);
        },
      });
    } catch (error) {
      log(`[command error]`, error);

      if (interaction.deferred)
        return interaction.editReply(EditReply.error("deu ruim clan .."));

      return interaction.reply(Reply.error("deu ruim dimaise clan .."));
    }
  }
);
