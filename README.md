
# SlideBuilder - AI Presentation Generator

SlideBuilder is a web-based tool that uses Google's Gemini flash to generate slides contents based on the topic you enterd the slides doesn'tcontain images only 
words
##Feature
1. uses free google api key so there is no loading waiting for api requests
2. can change the content based on diffrent types of audience
3. give you an option to preview generated slides
4. safely handles your sensitive api key
## how to deploy locally

1. Clone this repository
2. create a config.json file and add the following commands the app need this file to run
3. inside config.json add this command
   {
    "GEMINI_API_KEY" : "`your_api_key_here`"
}
it should look more like this
[![Screenshot-2025-03-29-174234.png](https://i.postimg.cc/5NnYYRZF/Screenshot-2025-03-29-174234.png)](https://postimg.cc/XpB7tQNV))
   - You can get an API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
     
5. after adding the config file navigatee to the project directory in terminal and run npx http-server command


## demo video
this is a short demo showcasing on how to use this project 
(https://drive.google.com/file/d/1M2svcynvA5kGDvrZYj29aSfNBJb8WdQD/view?usp=sharing)

## load balanced and deployment on web01 and web02



## Notes
API credit :[Google Gemni flash] (https://ai.google.dev/gemini-api/docs/api-key)
## License

This project is licensed under the MIT License
