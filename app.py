from flask import Flask, render_template, request, jsonify
from flask_mail import Mail, Message
import os
from dotenv import load_dotenv
import logging
from datetime import datetime

# Load environment variables
load_dotenv()

app = Flask(__name__)
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'your-secret-key-here')

# Flask-Mail configuration
app.config['MAIL_SERVER'] = os.getenv('MAIL_SERVER', 'smtp.gmail.com')
app.config['MAIL_PORT'] = int(os.getenv('MAIL_PORT', 587))
app.config['MAIL_USE_TLS'] = os.getenv('MAIL_USE_TLS', 'True').lower() == 'true'
app.config['MAIL_USE_SSL'] = os.getenv('MAIL_USE_SSL', 'False').lower() == 'true'
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
app.config['MAIL_DEFAULT_SENDER'] = os.getenv('MAIL_DEFAULT_SENDER', app.config['MAIL_USERNAME'])

# Initialize Flask-Mail
mail = Mail(app)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


@app.route('/')
def index():
    """Serve the main portfolio page"""
    return render_template('index.html')


@app.route('/submit_contact', methods=['POST'])
def submit_contact():
    """Handle contact form submissions"""
    try:
        # Get form data
        name = request.form.get('name', '').strip()
        email = request.form.get('email', '').strip()
        subject = request.form.get('subject', '').strip()
        message = request.form.get('message', '').strip()

        # Validate required fields
        if not name or not email or not subject or not message:
            return jsonify({'success': False, 'message': 'All fields are required.'}), 400

        # Validate email format
        if '@' not in email or '.' not in email:
            return jsonify({'success': False, 'message': 'Please enter a valid email address.'}), 400

        # Create email message
        email_subject = subject if subject else f"New Message from {name} - Portfolio Contact Form"
        msg = Message(
            subject=email_subject,
            recipients=[os.getenv('RECIPIENT_EMAIL', 'shyamvyawahare1@gmail.com')],
            reply_to=email
        )
        msg.body = f"""
Name: {name}
Email: {email}
Subject: {email_subject}
Date: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}
Message:
{message}
        """

        # Send email
        mail.send(msg)
        logger.info(f"Contact form submitted by {name} ({email})")

        return jsonify({'success': True, 'message': 'Thank you for your message! I\'ll get back to you soon.'})

    except Exception as e:
        logger.error(f"Error sending contact form: {str(e)}")
        return jsonify({'success': False, 'message': 'Sorry, there was an error sending your message. Please try again later.'}), 500


# Dynamic project routes
@app.route('/projects/<name>')
def projects(name):
    """Serve project templates dynamically from /templates/projects/"""
    try:
        return render_template(f'projects/{name}.html')
    except:
        logger.warning(f"Project template not found: {name}")
        return render_template("404.html"), 404


# Error handlers
@app.errorhandler(404)
def not_found(error):
    """Custom 404 page"""
    try:
        return render_template("404.html"), 404
    except:
        return jsonify({'error': 'Endpoint not found'}), 404


@app.errorhandler(500)
def internal_error(error):
    """Custom 500 error page"""
    try:
        return render_template("500.html"), 500
    except:
        return jsonify({'error': 'Internal server error'}), 500


if __name__ == '__main__':
    if not app.config['MAIL_USERNAME'] or not app.config['MAIL_PASSWORD']:
        logger.warning("Email credentials not set. Contact form will not work.")

    app.run(
        host=os.getenv('FLASK_HOST', '0.0.0.0'),
        port=int(os.getenv('FLASK_PORT', 5000)),
        debug=os.getenv('FLASK_DEBUG', 'False').lower() == 'true'
    )