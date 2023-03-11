import { Telegraf, Markup } from 'telegraf'
import { getStartMessage } from './utils/getStartMessage'
import { getHelpMessage } from './utils/getHelpMessage'

import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config()

const { BOT_TOKEN } = process.env
if (!BOT_TOKEN) throw new Error('"BOT_TOKEN" env var is required!')
const bot = new Telegraf(BOT_TOKEN)

const keyboard = Markup.inlineKeyboard([
  Markup.button.url('❤️', 'http://telegraf.js.org'),
  Markup.button.callback('Delete', 'delete'),
])

bot.start(ctx => ctx.reply(getStartMessage()))
bot.help(ctx => ctx.reply(getHelpMessage()))
bot.on('message', ctx => ctx.copyMessage(ctx.message.chat.id, keyboard))
bot.action('delete', ctx => ctx.deleteMessage())

export default bot