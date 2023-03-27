const express = require('express');
var fetch = require('node-fetch');
var app = express();

app.listen(443,function() {
    console.log('(Duohacker) Started.')
})


app.all('*',async (req,res) => {
  if (!req.query.token) {
    return res.send('Get the link above and put it in the extension!')
  }
  var f = await fetch("https://www.duolingo.com/2017-06-30/sessions", {
    "headers": {
      "accept": "application/json, text/plain, */*",
      "accept-language": "en-US,en;q=0.9",
      "authorization": "Bearer " + req.query.token,
      "content-type": "application/json;charset=UTF-8",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-requested-with": "XMLHttpRequest",
    },
    "referrer": req.query.url,
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": "{\"challengeTypes\":[\"characterIntro\",\"characterMatch\",\"characterSelect\",\"completeReverseTranslation\",\"definition\",\"dialogue\",\"form\",\"freeResponse\",\"gapFill\",\"judge\",\"listen\",\"name\",\"listenComprehension\",\"listenTap\",\"readComprehension\",\"select\",\"selectPronunciation\",\"selectTranscription\",\"speak\",\"tapCloze\",\"tapClozeTable\",\"tapComplete\",\"tapCompleteTable\",\"tapDescribe\",\"translate\",\"typeCloze\",\"typeClozeTable\",\"typeCompleteTable\"],\"fromLanguage\":\"pt\",\"juicy\":true,\"learningLanguage\":\"es\",\"smartTipsVersion\":2,\"levelIndex\":2,\"levelSessionIndex\":1,\"showPreLessonTipSplash\":false,\"skillId\":\"60786e16ed66320d6ec29f0f47919a15\",\"type\":\"LESSON\",\"speakIneligibleReasons\":\"\"}",
    "method": "POST",
    "mode": "cors"
  });
  var lesson = await f.json();
  lesson.challenges = [{
    choices:['https://www.youtube.com/c/jadjac'],
    correctIndices:[0],
    prompt:'Duohacker Enabled! Select the alternative below and confirm to earn XP!',
    sourceLanguage:lesson.challenges[0].sourceLanguage,
    targetLanguage:lesson.challenges[0].targetLanguage,
    type:'judge',
    id:lesson.challenges[0].id,
      "metadata": {
        "sentences": [
          {
            "sentence": "https://www.youtube.com/c/jadjac",
            "correct": true
          }
        ],
        "source_language": lesson.challenges[0].sourceLanguage,
        "target_language": lesson.challenges[0].targetLanguage,
        "text": "Hacked by DuoMenu!",
        "highlight": [],
        "type": "judge",
        "specific_type": "target_learning_judge",
        "generic_lexeme_map": {},
        "learning_language": lesson.challenges[0].targetLanguage,
        "from_language": lesson.challenges[0].sourceLanguage,
        "options": [
          {
            "sentence": "https://www.youtube.com/c/jadjac",
            "correct": true
          }
        ]
      },
  }];
  res.set({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin':'https://www.duolingo.com',
    'Access-Control-Allow-Credentials':'true',
    'Access-Control-Allow-Headers':'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, X-Amzn-Trace-Id, Authorization'
  })
  res.send(lesson);
  console.log('(DuoMenu) Lesson started:', lesson.id);
})
