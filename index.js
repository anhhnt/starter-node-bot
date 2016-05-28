var Botkit = require('botkit')

// Expect a SLACK_TOKEN environment variable
var slackToken = process.env.SLACK_TOKEN
if (!slackToken) {
  console.error('SLACK_TOKEN is required!')
  process.exit(1)
}

var controller = Botkit.slackbot()
var bot = controller.spawn({
  token: slackToken
})

var slackWrapi = require('slack-wrapi');
// A wrapped client from https://github.com/wrapi/slack that let us access advanced data API https://api.slack.com/methods
var client = new slackWrapi(slackToken);

var Watcher = require 'rss-watcher'
var feedUrl = 'http://xkcn.info/rss'

var watcher = new Watcher(feedUrl)

client.channels.list({exclude_archived:1}, function(err, data) {
  if (!err) {
    //console.log(data);
  } 
});



bot.startRTM(function (err, bot, payload) {
  if (err) {
    throw new Error('Could not connect to Slack')
  }
})
watcher.on('new article', function (article) {
  console.log(article);
})

controller.on('bot_channel_join', function (bot, message) {
  bot.reply(message, "Chào mọi người <3 !!")
})

controller.hears(['hello', 'hi'], ['direct_mention'], function (bot, message) {
  bot.reply(message, 'Hi!')
})

//controller.hears(['hello', 'hi'], ['direct_message'], function (bot, message) {
//  bot.reply(message, 'Hello.')
//  bot.reply(message, 'It\'s nice to talk to you directly.')
//})

controller.hears('.*', ['mention','direct_mention', 'direct_message'], function (bot, message) {
  bot.reply(message, 'Cưng gọi gì chị vậy <3')
})

controller.hears(['sinh to', 'cafe', 'mua nước'], ['ambient'], function (bot, message) {
  bot.reply(message, 'Sinh tố Đại phúc, gọi số này : 090 6807915, tự mua đi');
});

controller.hears(['soha.vn', 'thanhnien.vn', 'tinhte.vn', 'genk.vn', 'news.zing.vn', 'vnexpress.net'], ['ambient'], function (bot, message) {
  bot.reply(message, 'Đừng có post báo vào đây nữa, post vào hotnew ấy!!!');
});

controller.hears(['facebook .* là gì'], [ 'mention', 'direct_mention', 'direct_message'], function (bot, message) {
  bot.reply(message, 'Face của em nè : https://www.facebook.com/larrie.opt');
});

//controller.hears('help', ['direct_message', 'direct_mention'], function (bot, message) {
//  var help = 'I will respond to the following messages: \n' +
//      '`bot hi` for a simple message.\n' +
//      '`bot attachment` to see a Slack attachment message.\n' +
//      '`@<your bot\'s name>` to demonstrate detecting a mention.\n' +
//     '`bot help` to see this again.'
//  bot.reply(message, help)
//})

//controller.hears(['attachment'], ['direct_message', 'direct_mention'], function (bot, message) {
//  var text = 'Beep Beep Boop is a ridiculously simple hosting platform for your Slackbots.'
//  var attachments = [{
//    fallback: text,
//    pretext: 'We bring bots to life. :sunglasses: :thumbsup:',
//    title: 'Host, deploy and share your bot in seconds.',
//    image_url: 'https://storage.googleapis.com/beepboophq/_assets/bot-1.22f6fb.png',
//    title_link: 'https://beepboophq.com/',
//    text: text,
//    color: '#7CD197'
//  }]

//  bot.reply(message, {
//    attachments: attachments
//  }, function (err, resp) {
//    console.log(err, resp)
//  })
//})

controller.hears('.*', ['direct_message', 'direct_mention'], function (bot, message) {
  bot.reply(message, 'Sorry <@' + message.user + '>, I don\'t understand. \n')
})
///
