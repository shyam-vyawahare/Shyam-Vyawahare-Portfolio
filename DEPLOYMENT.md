# Portfolio Deployment Guide

## File Structure (Optimized)

```
Shyam-Vyawahare-Portfolio-main/
├── index.html              # Main portfolio (Vercel deployment - latest version)
├── projects/               # Project detail pages (Vercel deployment)
│   ├── project1.html
│   ├── project2.html
│   ├── project3.html
│   └── project4.html
├── static/                 # All static assets (shared by both Vercel & Flask)
│   ├── css/
│   │   └── style.css      # Latest styles (navbar, modal, contact wrapper)
│   ├── js/
│   │   └── script.js      # Latest JavaScript (Web3Forms integration)
│   ├── images/            # All images
│   └── documents/         # Resume PDF
│       └── Shyam_Vyawahare_Resume_updateAug2025.pdf
├── templates/             # Flask templates (for local development only)
│   ├── index.html         # Flask version (uses ../static/ paths)
│   └── projects/         # Flask project pages
├── vercel.json            # Vercel configuration (serves from root)
├── app.py                 # Flask app (for local development)
└── requirements.txt       # Python dependencies
```

## Deployment Options

### Vercel Deployment (Production)
- **Root files**: `index.html`, `projects/`, `static/`
- **Configuration**: `vercel.json` at root
- **Latest features**: Navbar, merged contact sections, Web3Forms, success modal
- **Paths**: All use `static/` (relative to root)

### Flask Local Development
- **Template files**: `templates/index.html`, `templates/projects/`
- **Static files**: `static/` (shared with Vercel)
- **Server**: Run `python app.py` or use `run_server.bat`
- **Paths**: Templates use `../static/` (relative to templates folder)

## Key Features (Latest Version)

✅ Professional navigation bar  
✅ Merged contact sections (Get In Touch + Leave a Message)  
✅ Contact form with Subject field  
✅ Web3Forms integration for email delivery  
✅ Success modal popup  
✅ Updated footer design  
✅ Removed pulse/beat animations  
✅ Optimized project card hover effects  

## Notes

- **No duplicate files**: Single source of truth for static assets
- **Vercel-ready**: Root structure is optimized for Vercel static deployment
- **Flask-compatible**: Templates folder maintained for local development
- **Shared assets**: `static/` folder is used by both deployment methods

