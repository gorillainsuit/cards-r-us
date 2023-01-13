const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  organization: 'org-sLBOtaG4wkR7e9TyacrS1Dgx',
  apiKey: process.env.OPENAPI_KEY,
});

const openai = new OpenAIApi(configuration);

const openaiController = {
  async createImage(req,res,next) {
    const {userPrompt} = req.body;
    const response = await openai.createImage(
      prompt= userPrompt,
      n= 1,
      size= '512x512',
    );
    res.locals.image = response;
    return next();
  },
}; 
 


module.exports = openaiController;
