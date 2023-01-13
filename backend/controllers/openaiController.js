const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const openaiController = {
  async createImage(req,res,next) {
    const {userPrompt} = req.body;
    try {
    const response = await openai.createImage({
      prompt: userPrompt,
      n: 4,
      size: '512x512',
    });
      console.log('response object: ', response.data)
      res.locals.image = response.data;
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }
    }
    return next();
  },
}; 
  
 

module.exports = openaiController;
