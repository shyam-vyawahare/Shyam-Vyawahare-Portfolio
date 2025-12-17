# EmailJS Setup Instructions

Your contact form is now configured to use EmailJS. Follow these steps to complete the setup:

## Your EmailJS Public Key
✅ Already configured: `e33e30af-d79b-43ea-acb8-0ffc750e64d7`

## Step 1: Create EmailJS Account (if not already done)
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign in or create a free account
3. Your public key is already set in the code

## Step 2: Add Email Service
1. Go to **Email Services** in the EmailJS dashboard
2. Click **Add New Service**
3. Choose **Gmail** (or your preferred email provider)
4. Connect your Gmail account (shyamvyawahare1@gmail.com)
5. **Copy your Service ID** (it will look like `service_xxxxxxx`)

## Step 3: Create Email Template
1. Go to **Email Templates** in the EmailJS dashboard
2. Click **Create New Template**
3. Use the following template:

**Subject Line:**
```
{{subject}}
```

**Email Body:**
```
From: {{from_name}} ({{from_email}})
Subject: {{subject}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
Reply to: {{from_email}}
```

4. Set the **To Email** field to: `shyamvyawahare1@gmail.com`
5. **Copy your Template ID** (it will look like `template_xxxxxxx`)

## Step 4: Update JavaScript Code
Open `static/js/script.js` and find these lines (around line 224-227):

```javascript
const response = await emailjs.send(
    'YOUR_SERVICE_ID',    // TODO: Replace with your EmailJS Service ID
    'YOUR_TEMPLATE_ID',   // TODO: Replace with your EmailJS Template ID
    templateParams
);
```

Replace:
- `'YOUR_SERVICE_ID'` with your actual Service ID (e.g., `'service_abc123'`)
- `'YOUR_TEMPLATE_ID'` with your actual Template ID (e.g., `'template_xyz789'`)

## Step 5: Test the Form
1. Fill out the contact form on your website
2. Submit it
3. Check your email inbox (shyamvyawahare1@gmail.com)
4. You should see a success modal popup on the website

## Troubleshooting

- **Form not sending**: Check browser console (F12) for errors
- **Email not received**: 
  - Verify Service ID and Template ID are correct
  - Check EmailJS dashboard for any error logs
  - Verify your email service is connected properly
- **Template errors**: Make sure all template variables match exactly:
  - `{{from_name}}`
  - `{{from_email}}`
  - `{{subject}}`
  - `{{message}}`

## Free Tier Limits
- 200 emails per month (perfect for personal portfolios)
- Upgrade available if needed

For more help, visit: [EmailJS Documentation](https://www.emailjs.com/docs/)

