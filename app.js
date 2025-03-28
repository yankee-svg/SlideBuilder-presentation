
document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const presentationForm = document.getElementById('presentation-form');
  const topicInput = document.getElementById('topic');
  const audienceInput = document.getElementById('audience');
  const slidesInput = document.getElementById('slides');
  const slideCount = document.getElementById('slide-count');
  const styleInput = document.getElementById('style');
  const additionalInfoInput = document.getElementById('additionalInfo');
  const typingTextElement = document.getElementById('typing-text');

  // Typing animation for the hero section
  const typingTexts = [
    "Make clean presentations in minutes.",
    ".",
    "Effortlessly create professional slides.",
    "Bring your ideas into presentations."
  ];
  
  let currentTextIndex = 0;
  let currentCharIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;
  
  function typeText() {
    const currentText = typingTexts[currentTextIndex];
    
    if (isDeleting) {
      typingTextElement.textContent = currentText.substring(0, currentCharIndex - 1);
      currentCharIndex--;
      typingSpeed = 50;
    } else {
      typingTextElement.textContent = currentText.substring(0, currentCharIndex + 1);
      currentCharIndex++;
      typingSpeed = 100;
    }
    
    if (!isDeleting && currentCharIndex === currentText.length) {
      isDeleting = true;
      typingSpeed = 1000; // Pause at the end
    } else if (isDeleting && currentCharIndex === 0) {
      isDeleting = false;
      currentTextIndex = (currentTextIndex + 1) % typingTexts.length;
      typingSpeed = 500; // Pause before starting new word
    }
    
    setTimeout(typeText, typingSpeed);
  }
  
  // Start the typing animation
  setTimeout(typeText, 1000);

  // Update slide count display
  slidesInput.addEventListener('input', () => {
    slideCount.textContent = slidesInput.value;
  });

  // Show toast message
  function showToast(message, type = 'success') {
    const toastContainer = document.getElementById('toast-container');
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = message;
    
    toastContainer.appendChild(toast);
    
    // Remove toast after 5 seconds
    setTimeout(() => {
      toast.style.animation = 'fade-out 0.3s forwards';
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 5000);
  }

  // Generate presentation with Google Gemini API
  async function generatePresentation(formData) {
    try {
      // Get API key from .env only
      const apiKey = window.env?.GEMINI_API_KEY;
      
      if (!apiKey || apiKey === 'your_api_key_here') {
        throw new Error('API key is not set. Please add your Gemini API key to the .env file.');
      }
      
      // Create prompt for Gemini
      const prompt = `
        Create a presentation about "${formData.topic}" for ${formData.audience}.
        The presentation should be in a ${formData.style} style and have ${formData.slides} slides.
        ${formData.additionalInfo ? `Additional information: ${formData.additionalInfo}` : ''}
        
        Format the response as a JSON object with the following structure:
        {
          "title": "Presentation Title",
          "description": "Brief description of the presentation",
          "slides": [
            {
              "title": "Slide Title",
              "points": ["Point 1", "Point 2", "Point 3"]
            }
          ]
        }
      `;
      
      // Show loading state
      showToast('Generating your presentation...', 'success');
      
      // Call Gemini API
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + apiKey, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(`API Error: ${data.error.message}`);
      }
      
      // Parse the response text as JSON
      const textResponse = data.candidates[0].content.parts[0].text;
      const jsonStart = textResponse.indexOf('{');
      const jsonEnd = textResponse.lastIndexOf('}') + 1;
      const jsonStr = textResponse.substring(jsonStart, jsonEnd);
      
      const presentation = JSON.parse(jsonStr);
      
      // Save presentation to localStorage
      localStorage.setItem('current_presentation', JSON.stringify(presentation));
      
      // Redirect to preview page
      window.location.href = 'preview.html';
      
    } catch (error) {
      console.error('Error generating presentation:', error);
      showToast(error.message || 'Error generating presentation. Please try again.', 'error');
    }
  }

  // Handle form submission
  if (presentationForm) {
    presentationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const formData = {
        topic: topicInput.value,
        audience: audienceInput.value,
        slides: slidesInput.value,
        style: styleInput.value,
        additionalInfo: additionalInfoInput.value
      };
      
      generatePresentation(formData);
    });
  }
});
