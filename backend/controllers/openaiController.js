const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAPI_KEY,
});

const openai = new OpenAIApi(configuration);

const openaiController = {
  async createImage(req,res,next) {
    const {prompt} = req.body;
    const response = await openai.createImage({
      prompt: prompt,
      n: 4,
      size: '512x512',
    });
    res.locals.image = response;
  },
};



module.exports = openaiController;
