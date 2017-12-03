const lambdaLocal = require('lambda-local');
const path = require('path')

var jsonPayload =
{
  "session": {
    "new": true,
    "sessionId": "SessionId.a93be5b0-4fc1-4797-b135-291151cdca47",
    "application": {
      "applicationId": "amzn1.ask.skill.0d64ffe6-3619-4793-95e3-7f01af58803a"
    },
    "attributes": {},
    "user": {
      "userId": "amzn1.ask.account.AESUAUVBUH6FB7MMJUIQ456RRNTQDRJPMNHJZVYBF6EMGQNXM45DFKUC7CPJ3UG5NU6RRWXFQCHN4RPLE2YKPJHMXKISRPED6GDX7CB42OGOYVCKSLOMUZFUDF2S5L7QMU36UJSDQ4L2IWBYW2CT73GX7ISBSBMZOJYF5ZGMUAWRHAWCO2QUGP4L7QCXZFF7QGG4KMVHK2Y27AY"
    }
  },
  "request": {
    "type": "IntentRequest",
    "requestId": "EdwRequestId.e1dea3ad-f8ba-4449-b5a2-2b8d026ca347",
    "intent": {
      "name": "LetztesMatch",
      "slots": {
        "number": {
          "name": "number",
          "value": "3"
        }
      }
    },
    "locale": "de-DE",
    "timestamp": "2017-12-03T12:55:27Z"
  },
  "context": {
    "AudioPlayer": {
      "playerActivity": "IDLE"
    },
    "System": {
      "application": {
        "applicationId": "amzn1.ask.skill.0d64ffe6-3619-4793-95e3-7f01af58803a"
      },
      "user": {
        "userId": "amzn1.ask.account.AESUAUVBUH6FB7MMJUIQ456RRNTQDRJPMNHJZVYBF6EMGQNXM45DFKUC7CPJ3UG5NU6RRWXFQCHN4RPLE2YKPJHMXKISRPED6GDX7CB42OGOYVCKSLOMUZFUDF2S5L7QMU36UJSDQ4L2IWBYW2CT73GX7ISBSBMZOJYF5ZGMUAWRHAWCO2QUGP4L7QCXZFF7QGG4KMVHK2Y27AY"
      },
      "device": {
        "supportedInterfaces": {}
      }
    }
  },
  "version": "1.0"
}
 
lambdaLocal.execute({
    event: jsonPayload,
    lambdaPath: path.join(__dirname, '../index.js'),
    profilePath: '~/.aws/credentials',
    profileName: 'default',
    timeoutMs: 3000,
    callback: function(err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
        }
    }
});
