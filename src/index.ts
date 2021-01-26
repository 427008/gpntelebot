import { Context, Markup, session, Telegraf } from 'telegraf';
import { ID, TOKEN } from './config';

const token = `${ID}:${TOKEN}`;
const bot = new Telegraf(token)

bot.use(Telegraf.log())

bot.command('start', ({ reply }) =>
    reply('One time keyboard', Markup
        .keyboard(['/simple', '/inline', '/pyramid'])
        .oneTime()
        .resize()
    )
)

bot.command('caption', (ctx) => {
    return ctx.replyWithPhoto({ url: 'https://picsum.photos/200/300/?random' },
        {
            caption: 'Caption',
            parse_mode: 'Markdown',
            ...Markup.inlineKeyboard([
                Markup.button.callback('Plain', 'plain'),
                Markup.button.callback('Italic', 'italic')
            ])
        }
    )
})

bot.hears(/\/wrap (\d+)/, (ctx) => {
    return ctx.reply(
        'Keyboard wrap',
        Markup.keyboard(['one', 'two', 'three', 'four', 'five', 'six'], {
            columns: parseInt(ctx.match[1])
        })
    )
})


bot.action('italic', async (ctx) => {
    await ctx.editMessageCaption('_Caption_', {
        parse_mode: 'Markdown',
        ...Markup.inlineKeyboard([
            Markup.button.callback('Plain', 'plain'),
            Markup.button.callback('* Italic *', 'italic')
        ])
    })
})

bot.action(/.+/, (ctx) => {
    return ctx.answerCbQuery(`Oh, ${ctx.match[0]}! Great choice`)
})

bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))

/*
bot.command('special', (ctx) => {
    return ctx.reply(
        'Special buttons keyboard',
        Markup.keyboard([
            Markup.button.contactRequest('Send contact'),
            Markup.button.locationRequest('Send location')
        ]).resize()
    )
})

bot.command('pyramid', (ctx) => {
    return ctx.reply(
        'Keyboard wrap',
        Markup.keyboard(['one', 'two', 'three', 'four', 'five', 'six'], {
            wrap: (btn, index, currentRow) => currentRow.length >= (index + 1) / 2
        })
    )
})

bot.command('simple', (ctx) => {
    return ctx.replyWithHTML(
        '<b>Coke</b> or <i>Pepsi?</i>',
        Markup.keyboard(['Coke', 'Pepsi'])
    )
})

bot.command('inline', (ctx) => {
    return ctx.reply('<b>Coke</b> or <i>Pepsi?</i>', {
        parse_mode: 'HTML',
        ...Markup.inlineKeyboard([
            Markup.button.callback('Coke', 'Coke'),
            Markup.button.callback('Pepsi', 'Pepsi')
        ])
    })
})

bot.command('random', (ctx) => {
    return ctx.reply(
        'random example',
        Markup.inlineKeyboard([
            Markup.button.callback('Coke', 'Coke'),
            Markup.button.callback('Dr Pepper', 'Dr Pepper', Math.random() > 0.5),
            Markup.button.callback('Pepsi', 'Pepsi')
        ])
    )
})

* */
