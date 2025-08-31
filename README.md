Shyam Vyawahare Portfolio Website

A modern, responsive portfolio website built with HTML, CSS, and JavaScript, featuring a clean design with dark/light mode toggle and smooth animations.

🚀 Live Demo

[View Live Portfolio](https://your-username.github.io/portfolio-website/)

✨ Features

- Responsive Design - Fully responsive across all devices
- Dark/Light Mode - Toggle between themes with persistent preferences
- Smooth Animations - CSS animations and transitions for enhanced UX
- Contact Form - Functional contact form with backend integration
- Project Showcase - Dedicated section for portfolio projects
- CV Access - View and download CV functionality
- Performance Optimized - Fast loading and optimized assets

🛠️ Tech Stack

- Frontend: HTML5, CSS3, JavaScript (ES6+)
- Backend: Python Flask (for contact form)
- Styling: Custom CSS with CSS Variables
- Icons: Custom and emoji-based icons
- Fonts: Google Fonts (Poppins)
- Deployment: GitHub Pages / Vercel / Netlify

📁 Project Structure

```
portfolio-website/
├── static/
│   ├── css/
│   │   └── style.css          # Main stylesheet
│   ├── js/
│   │   └── script.js          # JavaScript functionality
│   ├── images/                # All images assets
│   └── documents/
│       └── resume.pdf         # Your CV/Resume
├── templates/
│   └── index.html            # Main HTML file
├── projects/                 # Project detail pages
├── app.py                   # Flask backend
├── requirements.txt         # Python dependencies
├── .env.example            # Environment variables template
└── README.md               # This file
```

🚀 Installation & Setup

Option 1: Static Hosting (GitHub Pages)

1. Fork this repository
   ```bash
   git clone https://github.com/shyam-vyawahare/portfolio-website.git
   cd portfolio-website
   ```

2. Customize the content
   - Update personal information in `index.html`
   - Replace images in `static/images/`
   - Add your CV to `static/documents/resume.pdf`

3. Deploy to GitHub Pages
   - Go to Repository Settings → Pages
   - Select source branch (usually `main` or `gh-pages`)
   - Your site will be live at `https://your-username.github.io/portfolio-website/`

Option 2: With Flask Backend (Local Development)

1. Clone and setup
   ```bash
   git clone https://github.com/your-username/portfolio-website.git
   cd portfolio-website
   ```

2. Create virtual environment
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies
   ```bash
   pip install -r requirements.txt
   ```

4. Configure environment variables
   ```bash
   cp .env.example .env
   # Edit .env with your email configuration
   ```

5. Run the application
   ```bash
   python app.py
   ```
   Visit `http://localhost:5000`

🎨 Customization

Personal Information
Edit `index.html` to update:
- Your name and tagline
- About section content
- Project details
- Contact information

Styling
Modify `static/css/style.css` to:
- Change color scheme (update CSS variables in `:root`)
- Adjust animations and transitions
- Modify layout and spacing

Adding Projects
1. Add project cards in the Projects section
2. Create detailed project pages in the `projects/` folder
3. Link project cards to their respective pages

Email Configuration
For the contact form to work:

1. Gmail Setup:
   - Enable 2-factor authentication
   - Generate an app-specific password
   - Update `.env` with your credentials

2. Environment Variables:
   ```
   MAIL_SERVER=smtp.gmail.com
   MAIL_PORT=587
   MAIL_USE_TLS=True
   MAIL_USERNAME=your-email@gmail.com
   MAIL_PASSWORD=your-app-password
   ```

🌙 Dark Mode Features

The website includes a sophisticated dark/light mode system with:
- Toggle button with smooth transition
- localStorage persistence
- System preference detection
- Custom styling for all components

📱 Responsive Design

The portfolio is optimized for:
- **Mobile**: 320px and up
- **Tablet**: 768px and up  
- **Desktop**: 1024px and up
- **Large screens**: 1400px and up

🔧 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

📞 Contact

Shyam Vyawahare - [shyamvyawahare1@gmail.com](mailto:shyamvyawahare1@gmail.com)

Project Link: [https://github.com/your-username/portfolio-website](https://github.com/your-username/portfolio-website)

[![Netlify Status](https://api.netlify.com/api/v1/badges/4b6f7d3f-b7e7-478d-8516-a419d7896f73/deploy-status)](https://app.netlify.com/projects/shyam-vyawahare-portfoli/deploys)

🙏 Acknowledgments

- Google Fonts for [Poppins](https://fonts.google.com/specimen/Poppins)
- Inspiration from various modern portfolio designs
- Flask community for backend solutions

---

⭐ Star this repo if you found it helpful!