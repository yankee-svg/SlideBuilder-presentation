# Welcome to your SliderBuilder project

## Project info
this is a powerpoint presentation builder using google Gemni api key to create diffrent slides based on the user input,
it is build using typescript and js

**URL**: 
The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone this repo using the project's Git URL.
git clone https://github.com/yankee-svg/SlideBuilder-presentation.git
# Step 2: run this using npm command which install required packages to run this project which are in package.json file
npm i
# Step 3: Start the development server which will provide the link to the local website
npm run dev
# step 4 :after running this there will be a local host local web
````
Note that: this project wont run after this bcz the file with the api key called .env file is not on this repository as those keys are private
you 'll need to create your own file 
```sh
step 5 :create .env file and use your google gemni api key "https://ai.google.dev/gemini-api/docs/api-key"
inside the .env file add VITE_GEMINI_API_KEY="your api key"

