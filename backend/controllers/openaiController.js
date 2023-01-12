const { Configuration, OpenAIApi } = require('openai');
const openai = new OpenAIApi(configuration);
const configuration = new Configuration({
  apiKey: process.env.OPENAPI_KEY,
});

const openaiController = {
  async createImage(req,res,next) {
    const {prompt} = req.body;
    const response = await openai.createImage({
      prompt: prompt,
      n: 4,
      size: '1024x1024',
    });
    res.locals.image = response;
  },
};

module.exports = openaiController;
