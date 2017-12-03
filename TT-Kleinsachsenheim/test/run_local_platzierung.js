const lambdaLocal = require('lambda-local');
const path = require('path')

var jsonPayload =
{
  "session": {
    "new": false,
    "sessionId": "SessionId.069b4bcc-be41-41cc-ba5f-7f36392e9a2b",
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
    "requestId": "EdwRequestId.8e7d137e-809d-41e8-a36a-b5f722785763",
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
    "timestamp": "2017-12-03T13:04:40Z"
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
