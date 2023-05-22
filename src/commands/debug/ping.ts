import { SlashCommandBuilder } from "discord.js";
import { command } from "../../utils/command";

const meta = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("pinga que te pongo")
  .addStringOption((option) =>
    option
      .setName("message")
      .setDescription("provê ao bot uma messagem para responder")
      .setMinLength(1)
      .setMaxLength(2000)
      .setRequired(false)
  );

export default command(meta, ({ interaction }) => {
  const message = interaction.options.getString("message");

  return interaction.reply({
    ephemeral: true,
    content: message || "pong (seje pongado",
  });
});
