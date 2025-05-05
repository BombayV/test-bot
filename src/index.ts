import { IntentsBitField } from 'discord.js';
import { BotManager } from 'discordts-decorators';
import Commands from './commands/index';
import EventManager from './events/EventManager';

const intents = new IntentsBitField([
  'Guilds',
  'GuildMembers',
  'GuildMessages',
  'GuildMessageReactions',
  'GuildModeration',
  'GuildPresences',
  'GuildInvites',
  'DirectMessages',
  'DirectMessageReactions',
  'MessageContent'
]);

const DiscordBot = BotManager.getInstance();

DiscordBot.setPrivateData({
  id: process.env.PUBLIC_DISCORD_ID,
  token: process.env.PRIVATE_DISCORD_TOKEN,
  intents,
  name: 'Funny'
}).create(EventManager);

for (const command of Commands) {
  DiscordBot.create(command);
}

await DiscordBot.buildClient();
await DiscordBot.login();
DiscordBot.setPresence('idle', {
  name: 'with your feelings'
});
