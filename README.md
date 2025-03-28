
# SlideBuilder - AI Presentation Generator

SlideBuilder is a web-based tool that uses Google's Gemini API to generate professional presentations in seconds. Simply input your topic, audience, and preferences, and SlideBuilder will create a complete presentation ready for download.

## Features

- Generate complete presentations with AI
- Customize slides based on your topic, audience, and style preferences
- Preview generated slides in an interactive viewer
- Download presentations in PPTX format
- Simple and intuitive user interface

## Getting Started

1. Clone this repository
2. Add your Google Gemini API key to the `.env` file
   - You can get an API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Replace `your_api_key_here` with your actual API key
3. Open `index.html` in your browser

## How It Works

1. Fill out the form with your presentation details
2. The application sends your request to Google's Gemini AI
3. Gemini generates structured content for your presentation
4. The content is displayed in the preview page
5. Download your presentation in PPTX format

## Technologies Used

- HTML5
- CSS3
- JavaScript
- Google Gemini API
- PptxGenJS for PowerPoint generation

## Project Structure

- `index.html` - The main page with the presentation form
- `preview.html` - The presentation preview page
- `styles.css` - Stylesheet for the application
- `app.js` - JavaScript for the main page
- `preview.js` - JavaScript for the preview page
- `.env` - Environment variables (API key)

## Notes

- The PDF export feature is currently under development
- This application requires an internet connection to generate presentations
- Your Gemini API key is stored locally and is never sent to our servers

## License

This project is licensed under the MIT License
