// alexa/skill.js (Node.js Lambda)
const Alexa = require("ask-sdk-core");
const fetch = require("node-fetch");

const CheckHeartRateIntent = {
  canHandle(handlerInput) {
    return (
      Alexa.getIntentName(handlerInput.requestEnvelope) ===
      "CheckHeartRateIntent"
    );
  },
  async handle(handlerInput) {
    // Fetch last reading from our API
    const res = await fetch("https://your-domain.com/api/feedback");
    const data = await res.json();
    const last = data[data.length - 1];
    const speak =
      last.metrics.heartRate > 160
        ? `Warning! Your heart rate is ${last.metrics.heartRate}, slow down.`
        : `All good. Your heart rate is ${last.metrics.heartRate}. Keep going!`;
    return handlerInput.responseBuilder.speak(speak).getResponse();
  },
};
exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(CheckHeartRateIntent)
  .lambda();
