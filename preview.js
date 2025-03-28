
document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const presentationTitle = document.getElementById('presentation-title');
  const slideTitle = document.getElementById('slide-title');
  const slidePoints = document.getElementById('slide-points');
  const currentSlideElement = document.getElementById('current-slide');
  const totalSlidesElement = document.getElementById('total-slides');
  const prevSlideBtn = document.getElementById('prev-slide');
  const nextSlideBtn = document.getElementById('next-slide');
  const downloadPptxBtn = document.getElementById('download-pptx');
  const editPresentationBtn = document.getElementById('edit-presentation');
  const presentationContainer = document.getElementById('presentation-container');
  const noPresentationElement = document.getElementById('no-presentation');
  
  let currentPresentation = null;
  let currentSlideIndex = 0;
  
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
  
  // Load presentation from localStorage
  function loadPresentation() {
    const presentationData = localStorage.getItem('current_presentation');
    
    if (presentationData) {
      try {
        currentPresentation = JSON.parse(presentationData);
        presentationContainer.classList.remove('hidden');
        noPresentationElement.classList.add('hidden');
        renderPresentation();
      } catch (error) {
        console.error('Error parsing presentation data:', error);
        showToast('Error loading presentation', 'error');
        showNoPresentationState();
      }
    } else {
      showNoPresentationState();
    }
  }
  
  // Show empty state when no presentation is available
  function showNoPresentationState() {
    presentationContainer.classList.add('hidden');
    noPresentationElement.classList.remove('hidden');
  }
  
  // Render current presentation
  function renderPresentation() {
    if (!currentPresentation) return;
    
    // Set presentation title
    presentationTitle.textContent = currentPresentation.title;
    
    // Set total slides
    totalSlidesElement.textContent = currentPresentation.slides.length;
    
    // Render current slide
    renderSlide(currentSlideIndex);
  }
  
  // Render a specific slide
  function renderSlide(index) {
    if (!currentPresentation || !currentPresentation.slides[index]) return;
    
    const slide = currentPresentation.slides[index];
    
    // Update current slide indicator
    currentSlideElement.textContent = index + 1;
    
    // Update slide title
    slideTitle.textContent = slide.title;
    
    // Clear existing points
    slidePoints.innerHTML = '';
    
    // Add bullet points
    slide.points.forEach(point => {
      const li = document.createElement('li');
      li.textContent = point;
      slidePoints.appendChild(li);
    });
    
    // Update navigation buttons
    prevSlideBtn.disabled = index === 0;
    nextSlideBtn.disabled = index === currentPresentation.slides.length - 1;
    
    // Update current slide index
    currentSlideIndex = index;
  }
  
  // Navigate to previous slide
  prevSlideBtn.addEventListener('click', () => {
    if (currentSlideIndex > 0) {
      renderSlide(currentSlideIndex - 1);
    }
  });
  
  // Navigate to next slide
  nextSlideBtn.addEventListener('click', () => {
    if (currentPresentation && currentSlideIndex < currentPresentation.slides.length - 1) {
      renderSlide(currentSlideIndex + 1);
    }
  });
  
  // Download presentation as PPTX
  downloadPptxBtn.addEventListener('click', () => {
    if (!currentPresentation) {
      showToast('No presentation to download', 'error');
      return;
    }
    
    try {
      // Create a new PptxGenJS instance
      const pptx = new PptxGenJS();
      
      // Set presentation properties
      pptx.author = 'SlideBuilder';
      pptx.title = currentPresentation.title;
      
      // Add slides
      currentPresentation.slides.forEach(slide => {
        const pptxSlide = pptx.addSlide();
        
        // Add slide title
        pptxSlide.addText(slide.title, { 
          x: 0.5, 
          y: 0.5, 
          w: '90%', 
          fontSize: 24, 
          bold: true,
          color: '6B46C1'
        });
        
        // Add bullet points
        slide.points.forEach((point, idx) => {
          pptxSlide.addText(point, { 
            x: 0.5, 
            y: 1.5 + (idx * 0.6), 
            w: '90%', 
            fontSize: 18,
            bullet: { type: 'bullet' }
          });
        });
      });
      
      // Save presentation
      pptx.writeFile({ fileName: `${currentPresentation.title.replace(/\s+/g, '_')}.pptx` });
      showToast('Presentation downloaded successfully!', 'success');
    } catch (error) {
      console.error('Error downloading PPTX:', error);
      showToast('Error downloading presentation', 'error');
    }
  });
  
  // Edit presentation
  editPresentationBtn.addEventListener('click', () => {
    window.location.href = 'index.html';
  });
  
  // Initialize
  loadPresentation();
});
