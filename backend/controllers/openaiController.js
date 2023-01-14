const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const openaiController = {
  async createImage(req, res, next) {
    const { userPrompt } = req.body;
    try {
      const response = await openai.createImage({
        prompt: userPrompt,
        n: 4,
        size: '1024x1024',
      });
      console.log('response object: ', response.data);
      res.locals.image = response.data;
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        return next({
          log: 'Express Error hanler caught middleware error at \'/backend/controller/openaiController',
          message: {err: error.message}
        })
      }
    }
    console.log('complete');
    return next();
  },
};

module.exports = openaiController;
