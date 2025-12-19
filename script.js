// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Add scroll animation to elements
document.addEventListener('DOMContentLoaded', function() {
    // Add animation class to elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.card, .offering, .stat, .gallery-item, .faculty-member');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = "1";
                element.style.transform = "translateY(0)";
            }
        });
    };
    
    // Set initial state for animated elements
    const animatedElements = document.querySelectorAll('.card, .offering, .stat, .gallery-item, .faculty-member');
    animatedElements.forEach(element => {
        element.style.opacity = "0";
        element.style.transform = "translateY(20px)";
        element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    });
    
    // Listen for scroll events
    window.addEventListener('scroll', animateOnScroll);
    
    // Trigger once on load
    animateOnScroll();
    
    // Add hover effect to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = this.style.transform ? 
                this.style.transform + ' scale(1.05)' : 'scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = this.style.transform ? 
                this.style.transform.replace(' scale(1.05)', '') : '';
        });
    });
    
    // Add header shadow on scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
});

// Floating Chatbox functionality
document.addEventListener('DOMContentLoaded', function() {
    const chatboxToggle = document.getElementById('chatbox-toggle');
    const floatingChatbox = document.getElementById('floating-chatbox');
    const chatboxClose = document.getElementById('chatbox-close');
    const chatMessages = document.getElementById('chatbox-messages');
    const userInput = document.getElementById('chatbox-user-input');
    const sendBtn = document.getElementById('chatbox-send-btn');
    
    // Toggle chatbox visibility
    chatboxToggle.addEventListener('click', function() {
        floatingChatbox.style.display = floatingChatbox.style.display === 'flex' ? 'none' : 'flex';
    });
    
    // Close chatbox
    chatboxClose.addEventListener('click', function() {
        floatingChatbox.style.display = 'none';
    });
    
    // Function to add a message to the chat
    function addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
        
        const paragraph = document.createElement('p');
        paragraph.textContent = text;
        messageDiv.appendChild(paragraph);
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Function to get a bot response based on user input or selected option
    function getBotResponse(userMessage, selectedOption = null) {
        // This would be replaced with actual Gemini API integration
        
        if (selectedOption) {
            switch(selectedOption) {
                case 'events':
                    return "We host various events throughout the year including our Annual Fitness Championship, Monthly Workout Challenges, and Wellness Seminars. Check our Instagram @fitnessclubvitc for upcoming events!";
                case 'requirements':
                    return "Membership is open to all VIT Chennai students. Requirements include attendance at 70% of sessions, participation in monthly challenges, and adherence to our code of conduct. No experience necessary!";
                case 'recruitment':
                    return "We recruit new members at the beginning of each semester. Watch for announcements on our social media or visit us at the Student Activities Fair. Simply fill out the membership form and attend an orientation session.";
                case 'general':
                    return "I can help with questions about our programs, schedules, facilities, or general inquiries. Feel free to ask about anything fitness-related!";
                default:
                    return "Thanks for your inquiry. Our team will get back to you soon with more details.";
            }
        }
        
        // General responses for text input
        const responses = [
            "That's a great question about the club! Our team focuses on creating an inclusive environment for all fitness levels.",
            "For specific inquiries about events or membership, I recommend checking our Instagram @fitnessclubvitc for the latest updates.",
            "We have sessions for all fitness levels. Beginners are always welcome in our introductory classes.",
            "Our club offers strength training, cardio workouts, sports activities, and wellness programs.",
            "Membership fees are minimal and cover equipment usage and certified trainer guidance.",
            "We meet 6 days a week with different sessions each day. Check our schedule on Instagram for timing."
        ];
        return responses[Math.floor(Math.random() * responses.length)];
    }
    
    // Handle quick option buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('option-btn')) {
            const option = e.target.getAttribute('data-option');
            const optionText = e.target.textContent;
            
            addMessage(optionText, true);
            
            // Simulate bot thinking
            setTimeout(() => {
                const botResponse = getBotResponse('', option);
                addMessage(botResponse);
            }, 1000);
        }
    });
    
    // Send button click event
    sendBtn.addEventListener('click', function() {
        const message = userInput.value.trim();
        if (message) {
            addMessage(message, true);
            userInput.value = '';
            
            // Simulate bot thinking
            setTimeout(() => {
                const botResponse = getBotResponse(message);
                addMessage(botResponse);
            }, 1000);
        }
    });
    
    // Enter key press event
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendBtn.click();
        }
    });
});

// Form submission prevention (if we had forms)
document.addEventListener('submit', function(e) {
    // In a real implementation, you might want to handle form submissions here
    // For now, we'll just prevent default behavior on any forms
    e.preventDefault();
});