const { Telegraf, Markup } = require('telegraf')
const bot = new Telegraf(process.env.BOT_TOKEN)

const keyboard = Markup.inlineKeyboard([
  Markup.button.url('❤️', 'http://telegraf.js.org'),
  Markup.button.callback('Delete', 'delete')
])

bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.start(ctx => ctx.reply('Start message'))
bot.help(ctx => ctx.reply('Help'))
bot.on('message', ctx => ctx.copyMessage(ctx.message.chat.id, keyboard))
bot.action('delete', ctx => ctx.deleteMessage())

bot.launch()

// AWS event handler syntax (https://docs.aws.amazon.com/lambda/latest/dg/nodejs-handler.html)
exports.handler = async event => {
  try {
    await bot.handleUpdate(JSON.parse(event.body))
    return { statusCode: 200, body: '' }
  } catch (e) {
    console.error('error in handler:', e)
    return { statusCode: 400, body: 'This endpoint is meant for bot and telegram communication' }
  }
}