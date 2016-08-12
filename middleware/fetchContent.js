var prefix = process.env.NODE_ENV == "production" ? 'http://app.ry.api.renyan.cn/rest/share/position/' : 'http://testry.renyan.cn/rest/share/position/'
module.exports = function(req, res, next) {
  //Auth: RyZxAuth
  var cid = req.cardId
  var url = prefix + cid
  var request = require('request')
  var options = {
    url: url,
    headers: {
      'Auth': 'RyZxAuth'
    }
  }
  request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var result = JSON.parse(body)
      if (result.card) {
        replaceReturnKey(result.card)
        result.card.view = result.card.view || 0
        if (result.card.view !== 0 && result.ratio === 0) {
          result.ratio = Math.random() * 0.05 + 0.25
        }
        result.hotText = textForHotRate(result.ratio)
        result.ratio = parseInt(result.ratio * 100)
        result.friendPushCount = result.friendPushCount || 0
        var distance = result.distance / 1000
        result.distance = distance.toFixed(0)
        if (result.profile && result.profile.name && result.profile.name.indexOf('未命名') != -1) {
          result.profile.name = '新用户'
        }
        req.contentInfo = result
        next()
      } else {
        var err = new Error('该内容不存在');
        err.status = 511;
        next(err);
      }
    } else {
      var err = new Error('服务器异常');
      err.status = 512;
      next(err);
    }
  })
}

function textForHotRate(rate) {
  var hotTexts = ['冰冰凉', '有点冷', '一般热', '超级热', '爆炸热']
  var index = parseInt(rate * hotTexts.length)
  if (index >= hotTexts.length) {
    index = hotTexts.length - 1;
  }
  return hotTexts[index]
}

function replaceReturnKey(card) {
  card.text = card.text.replace(/\n/g, "</br>");
}
