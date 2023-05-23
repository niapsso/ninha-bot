import { GuildMember, SlashCommandBuilder } from "discord.js";
import {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
} from "@discordjs/voice";
import ytdl from "ytdl-core";
import { command } from "../../utils/command";

const meta = new SlashCommandBuilder()
  .setName("play")
  .setDescription("tocar um sonzin kk")
  .addStringOption((option) =>
    option
      .setName("link-do-youtube")
      .setDescription("som que o bot vai tocar ne kk")
      .setMinLength(1)
      .setMaxLength(2000)
      .setRequired(true)
  );

export default command(meta, ({ interaction }) => {
  const ytURL = interaction.options.getString("link-do-youtube") as string;

  if (!ytdl.validateURL(ytURL)) {
    return interaction.reply({
      content: "essa url ae ta fudida man (temq ser do yt em",
    });
  }

  if (!interaction.guild) {
    return interaction.reply({
      content: "algum erro ocorreu man kk..",
    });
  }

  if (!(interaction.member instanceof GuildMember)) {
    return interaction.reply({
      content: "vishh.. deu ruim",
    });
  }

  if (!interaction.member.voice.channelId) {
    return interaction.reply({
      content: "tu temq tá num canal de voz ne '-'",
    });
  }

  const voiceConnection = joinVoiceChannel({
    guildId: interaction.guild.id,
    channelId: interaction.member.voice.channelId,
    adapterCreator: interaction.guild.voiceAdapterCreator,
    selfDeaf: true,
  });

  const stream = ytdl(ytURL, { filter: "audioonly" });

  const player = createAudioPlayer();

  player.play(createAudioResource(stream));

  voiceConnection.subscribe(player);

  return interaction.reply({
    content: `tocando agora esta somzera kk`,
  });
});
