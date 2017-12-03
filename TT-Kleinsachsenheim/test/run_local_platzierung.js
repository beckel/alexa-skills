const lambdaLocal = require('lambda-local');
const path = require('path')

var jsonPayload =
{
  "session": {
    "new": true,
    "sessionId": "SessionId.f954b41b-55f0-4cbd-859d-c25946737e2a",
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
    "requestId": "EdwRequestId.fe5bbecf-e666-4dcc-b03b-a4c7c5aadc98",
    "intent": {
      "name": "Platzierung",
      "slots": {
        "number": {
          "name": "number",
          "value": "1"
        }
      }
    },
    "locale": "de-DE",
    "timestamp": "2017-12-03T10:16:53Z"
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
