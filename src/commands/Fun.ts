import { Injections } from "discordts-decorators";
import {AutocompleteInteraction, CommandInteraction} from "discord.js";

const { Discord, Command, Autocomplete } = Injections();

@Discord
export class Fun {
  // Read the documention for more information
  // on how to use integration_types and context
  // https://discord.com/developers/docs/interactions/application-commands#interaction-contexts
  public static integration_types = [0, 1];
  public static context = [0, 1, 2];

  @Command('Ping the bot')
  public static async ping(interaction: CommandInteraction) {
    const { createdTimestamp } = interaction;
    const reply = await interaction.editReply('Pinging...');
    const messagePing = reply.createdTimestamp - createdTimestamp;
    const websocketPing = interaction.client.ws.ping;

    await interaction.editReply(`Pong!\n**Message Ping:** ${messagePing}ms\n**Websocket Ping:** ${websocketPing}ms`);
  }

  @Command('Autocomplete test', 10, true)
  @Autocomplete('test', 'Test autocomplete', true)
  public static async autocompletetest(interaction: CommandInteraction | AutocompleteInteraction) {
    if (interaction.isAutocomplete()) {
      // @ts-ignore
      await interaction.respond([
        {
          name: 'Test 1',
          value: 'test1'
        },
        {
          name: 'Test 2',
          value: 'test2'
        }
      ]);
    }
  }
}