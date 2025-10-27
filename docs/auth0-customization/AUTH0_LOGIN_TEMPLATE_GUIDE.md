# Auth0 Universal Login Customization Guide

## Overview
This guide explains how to customize your Auth0 Universal Login pages for each brand organization with brand-specific images and styling.

## Brand Login Templates

Each brand has a customized login page with:
- **Brand Colors** - Primary and secondary colors from your brand config
- **Brand Logo** - Your organization's logo
- **Brand Hero Image** - Representative imagery (car, tent, grill, office supplies, candy)
- **Brand Messaging** - Tailored welcome text

## Available Templates

### 1. AutoZero
- **File**: `auth0-autozero-login.html`
- **Hero Image**: Car/Automotive
- **Colors**: Orange (#FF6B35) & Dark Blue (#004E89)
- **Organization ID**: org_hC536v5MhZj2GMtF

### 2. CampNation
- **File**: `auth0-campnation-login.html`
- **Hero Image**: Tent/Camping
- **Colors**: Forest Green (#2D6A4F) & Light Green (#52B788)
- **Organization ID**: org_BR45iMQDE2iNKP8R

### 3. BBQ1
- **File**: `auth0-bbq1-login.html`
- **Hero Image**: Grill/BBQ
- **Colors**: Red (#D00000) & Dark Red (#370617)
- **Organization ID**: org_ubS05VW6UFh2xI1W

### 4. OfficeZero
- **File**: `auth0-officezero-login.html`
- **Hero Image**: Office/Desk
- **Colors**: Blue (#4361EE) & Dark Blue (#3F37C9)
- **Organization ID**: org_TxqSP6gqpe4cE0Tf

### 5. CandyZero
- **File**: `auth0-candyzero-login.html`
- **Hero Image**: Candy/Sweets
- **Colors**: Pink (#F72585) & Purple (#7209B7)
- **Organization ID**: org_bt36R0WKuJ3rtiuM

## How to Apply Customizations

### Method 1: Auth0 Dashboard (Manual)
1. Go to **Auth0 Dashboard** → **Branding** → **Universal Login**
2. Click **Edit** (or **Customize Login Page**)
3. Select the **HTML** tab
4. Replace content with the template for your brand
5. Click **Save**
6. Test the login flow

### Method 2: Auth0 Management API (Programmatic)
```bash
# Update Universal Login for specific client
curl --request PATCH \
  --url https://YOUR_DOMAIN/api/v2/clients/CLIENT_ID \
  --header "authorization: Bearer YOUR_MANAGEMENT_TOKEN" \
  --header "content-type: application/json" \
  --data '{"custom_login_page": "<HTML_CONTENT>"}'
```

### Method 3: Using Auth0 MCP Server (AI-Assisted)
The Auth0 MCP server in your `.mcp-config.json` can help automate this:
- Get organization details
- Apply custom login pages
- Manage branding configurations

## Template Structure

Each template includes:
- **HTML Structure**: Login form with inputs for username/email and password
- **CSS Styling**: Brand-specific colors and responsive design
- **Hero Section**: Left-side image area with brand representative imagery
- **Form Section**: Right-side login form with branded buttons
- **Responsive Design**: Works on mobile, tablet, and desktop

## Key Features

✅ **Organization-Specific**: Different template for each brand  
✅ **Brand Colors**: Full color scheme from your config  
✅ **Hero Images**: Using Unicode emojis and CSS (no external images required)  
✅ **Responsive**: Mobile-first design  
✅ **Accessible**: Proper form labels and ARIA attributes  
✅ **Social Login Ready**: Space for Auth0's social login buttons  

## Customization Tips

### Adding Real Images
If you want to use actual image files instead of emoji/CSS:
1. Upload images to a public CDN or your server
2. Reference the URL in the CSS `background-image` property
3. Ensure CORS is properly configured if on different domain

### Modifying Colors
Each template has CSS variables at the top:
```css
--brand-primary: #FF6B35;      /* AutoZero Orange */
--brand-secondary: #004E89;    /* AutoZero Blue */
--brand-light: #f5f5f5;
--brand-dark: #333;
```

Change these values to match your brand config exactly.

### Changing Hero Content
The hero section uses CSS content and emojis. To replace:
```css
/* Current emoji approach */
.hero::before {
  content: "🚗";  /* Car emoji for AutoZero */
  font-size: 120px;
}

/* Or use a background image */
.hero {
  background-image: url('https://your-cdn.com/car.jpg');
  background-size: cover;
}
```

## Testing Your Login

1. Navigate to your React app's login flow (e.g., click "Login")
2. You'll be redirected to Auth0's hosted login
3. Verify the branding shows correctly for each organization
4. Test on mobile devices to ensure responsiveness

## Important Notes

⚠️ **Same Page for All Users**: Auth0 Universal Login shows the same page for all users accessing that organization
⚠️ **SSL Required**: Auth0 requires HTTPS for custom login pages
⚠️ **Auth Pipeline**: Custom login page HTML can be overridden by Auth0 Actions or Rules if they also modify it

## Next Steps

1. Choose which templates you want to deploy
2. Decide on deployment method (Dashboard vs API)
3. Apply templates to each organization
4. Test login flows for each brand
5. Gather feedback and iterate on design

## Resources

- [Auth0 Docs: Custom Login Page](https://auth0.com/docs/get-started/authentication-and-authorization-flow/add-login-using-the-login-page)
- [Auth0 Universal Login Documentation](https://auth0.com/docs/authenticate/login-page)
- [Auth0 Branding API](https://auth0.com/docs/get-started/applications/application-branding-api)
