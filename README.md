AI Text Summarizer Web Application
Overview
This is a modern, fully functional AI text summarizer web application built with HTML, CSS, and JavaScript. The application provides users with an intuitive interface to input text and receive concise summaries limited to 200 words maximum. It includes complete user authentication, task history management, and a clean, professional design.

Features
Core Functionality
Two-Section Layout: Split-screen interface with text input on the left and summary output on the right

AI Text Summarization: Intelligent extractive summarization algorithm that identifies key sentences and maintains content coherence

Word Count Display: Real-time word and character counting for both input and output

Summary Length Control: Automatic limitation to 200 words maximum

Copy to Clipboard: One-click button to copy generated summaries

User Authentication
Login System: Secure user authentication with email and password

User Registration: Complete signup functionality for new users

Session Management: Maintains user session throughout application usage

Logout Functionality: Clear session and return to login screen

History Management
Task Storage: Automatically saves all summarization tasks

History Display: View all previous summarizations with timestamps

Task Preview: Shows original text preview and complete summary

Reuse Function: Load previous tasks back into the summarizer

Delete Option: Remove individual history items

History Limit: Stores up to 50 most recent tasks

User Interface
Modern Design: Clean, professional interface with contemporary styling

Responsive Layout: Adapts to different screen sizes

Smooth Animations: Transition effects and loading states

Interactive Elements: Hover effects and visual feedback

Color Scheme: Professional blue and gray palette

Form Validation: Client-side validation with error messages

Technology Stack
HTML5: Semantic markup and structure

CSS3: Modern styling with flexbox and grid layouts

JavaScript: Vanilla JavaScript for all functionality

No External Dependencies: Pure frontend implementation

Getting Started
Installation
Download the application files

Extract the ZIP folder

Open index.html in a modern web browser

No server setup or installation required. The application runs entirely in the browser.

Demo Accounts
For testing purposes, use these pre-configured accounts:

Account 1:

Email: demo@example.com

Password: demo123

Account 2:

Email: test@example.com

Password: test123

Alternatively, create a new account using the signup page.

How to Use
First Time Users
Open the application in your web browser

Click on "Sign Up" if you are a new user

Fill in your name, email, and password

Click "Create Account" to register

You will be automatically logged in

Logging In
Enter your email address

Enter your password

Click "Login" to access the application

Summarizing Text
After logging in, you will see the main interface

Paste or type your text in the left textarea

Click the "Summarize Text" button

Wait for processing (indicated by loading state)

View your summary in the right panel

Use the "Copy Summary" button to copy the result

Click "Clear All" to reset both sections

Managing History
Click "Show History" to view your previous tasks

Browse through your summarization history

Click "Load" on any item to reuse it

Click "Delete" to remove specific entries

Click "Hide History" to collapse the panel

Logging Out
Click the "Logout" button in the header

You will be returned to the login page

Your session will be cleared

Application Structure
Pages
Login Page: User authentication interface

Signup Page: New user registration form

Main Dashboard: Primary summarization interface with history panel

Key Components
Authentication Module: Handles login, signup, and session management

Summarization Engine: Processes text and generates summaries

History Manager: Stores and manages previous tasks

UI Controller: Manages interface updates and user interactions

Data Management
The application uses in-memory storage for all data. This means:

User accounts persist only during the current session

History is maintained while logged in

Data is cleared when you close the browser or logout

No backend server or database required

Browser Compatibility
The application works best on modern browsers:

Google Chrome (recommended)

Mozilla Firefox

Microsoft Edge

Safari

Opera

Ensure JavaScript is enabled in your browser settings.

Summarization Algorithm
The application uses an extractive summarization approach:

Sentence Tokenization: Breaks text into individual sentences

Word Frequency Analysis: Calculates importance of words

Sentence Scoring: Ranks sentences based on keyword density

Top Sentence Selection: Chooses most important sentences

Length Control: Ensures output does not exceed 200 words

Coherence Maintenance: Preserves logical flow and readability

Limitations
Requires minimum 50 characters of input text

Summaries are limited to 200 words maximum

Works best with well-structured, grammatical text

No persistent storage across browser sessions

Client-side processing only

Security Notes
Passwords are stored in plain text in memory (demo purposes only)

No encryption is implemented

Not recommended for production use without proper backend security

This is a demonstration application for educational purposes

Customization
You can easily customize the application by modifying:

Colors: Update CSS variables in the style section

Summary Length: Adjust MAX_SUMMARY_WORDS constant

History Limit: Change MAX_HISTORY_ITEMS value

Layout: Modify CSS grid and flexbox properties

Troubleshooting
Common Issues
Cannot login:

Verify email and password are correct

Try using demo accounts provided above

Check browser console for errors

Summarization not working:

Ensure input text is at least 50 characters

Check that JavaScript is enabled

Refresh the page and try again

History not showing:

Click the "Show History" button

Verify you have created at least one summary

Check that you are still logged in

Layout issues:

Try refreshing the browser

Clear browser cache

Use a modern browser version

Future Enhancements
Potential features for future versions:

Backend integration for persistent storage

Export summaries to PDF or text files

Multiple summarization length options

Language selection and translation

Dark mode theme

Advanced text analytics

Sharing functionality

Mobile application version

License
This application is provided as-is for educational and demonstration purposes. Feel free to modify and adapt it for your needs.

Support
For questions or issues, please refer to the troubleshooting section above or consult the inline code documentation.

Credits
Developed as a modern web application demonstration showcasing HTML, CSS, and JavaScript capabilities for text processing and user interface design.
