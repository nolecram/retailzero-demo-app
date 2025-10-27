# Auth0 Branded Login Implementation - Quick Start

## 📋 What You Have

I've created 5 brand-specific Auth0 login page templates with:

| Brand | Hero Image | Colors | File |
|-------|-----------|--------|------|
| **AutoZero** | 🚗 Car (floating animation) | Orange & Blue | `auth0-autozero-login.html` |
| **CampNation** | ⛺ Tent (bounce animation) | Green | `auth0-campnation-login.html` |
| **BBQ1** | 🔥 Fire (flicker animation) | Red & Dark Red | `auth0-bbq1-login.html` |
| **OfficeZero** | 📊 Chart (rotation animation) | Blue | `auth0-officezero-login.html` |
| **CandyZero** | 🍬 Candy (spinning animation) | Pink & Purple | `auth0-candyzero-login.html` |

## 🎯 Key Features

✅ **Split Layout**: Brand hero image on left, login form on right  
✅ **Animated Images**: Each emoji has a unique animation  
✅ **Brand Colors**: Gradient backgrounds with your brand colors  
✅ **Responsive**: Works perfectly on mobile, tablet, desktop  
✅ **Professional Design**: Clean form with focus states  

## 🚀 How to Apply (Step-by-Step)

### Step 1: Open Auth0 Dashboard
1. Go to [Auth0 Dashboard](https://manage.auth0.com)
2. Navigate to: **Branding** → **Universal Login**

### Step 2: Copy Template Content
1. Open the corresponding brand template file (e.g., `auth0-autozero-login.html`)
2. Copy ALL the HTML content

### Step 3: Apply to Each Organization

#### For AutoZero (org_hC536v5MhZj2GMtF):
1. Make sure you're viewing the AutoZero organization
2. Click **Edit** on the Universal Login section
3. Go to the **HTML** tab
4. Paste the AutoZero template HTML
5. Click **Save**

#### For CampNation (org_BR45iMQDE2iNKP8R):
1. Switch to CampNation organization
2. Repeat steps 2-5 with CampNation template

#### For BBQ1 (org_ubS05VW6UFh2xI1W):
1. Switch to BBQ1 organization
2. Repeat steps 2-5 with BBQ1 template

#### For OfficeZero (org_TxqSP6gqpe4cE0Tf):
1. Switch to OfficeZero organization
2. Repeat steps 2-5 with OfficeZero template

#### For CandyZero (org_bt36R0WKuJ3rtiuM):
1. Switch to CandyZero organization
2. Repeat steps 2-5 with CandyZero template

### Step 4: Test Each Login
1. For each organization, test the login by:
   - Going to your app's login flow with that organization's context
   - Verifying the branded page appears with correct logo, colors, and emoji

## 🎨 Customization Tips

### Change Hero Emoji
In each template, find this line in the CSS:
```css
.hero::before {
    content: "🚗";  /* Change emoji here */
}
```

Examples:
- AutoZero: `🚗` or `🛞` or `⚙️`
- CampNation: `⛺` or `🏕️` or `🥾`
- BBQ1: `🔥` or `🍖` or `🥓`
- OfficeZero: `📊` or `💼` or `🖊️`
- CandyZero: `🍬` or `🍭` or `🎂`

### Change Colors
Update these CSS variables (at the top of `<style>`):
```css
:root {
    --brand-primary: #FF6B35;      /* Main color */
    --brand-secondary: #004E89;    /* Accent color */
    --brand-light: #f5f5f5;        /* Background */
    --brand-dark: #333;            /* Text */
}
```

### Use Real Images Instead of Emojis
Replace the `::before` pseudo-element:
```css
.hero {
    background: linear-gradient(135deg, var(--brand-primary) 0%, var(--brand-secondary) 100%),
                url('https://your-cdn.com/car-image.jpg') no-repeat center;
    background-size: cover, cover;
}

.hero::before {
    display: none;  /* Hide emoji */
}
```

## 📱 What Users Will See

When logging in to each brand:
- **AutoZero**: Orange/blue gradient with floating car emoji
- **CampNation**: Green gradient with bouncing tent emoji
- **BBQ1**: Red gradient with flickering fire emoji
- **OfficeZero**: Blue gradient with rotating chart emoji
- **CandyZero**: Pink/purple gradient with spinning candy emoji

All with responsive layouts that work on all devices.

## 🔧 Using Auth0 MCP for Automation (Advanced)

If you want to automate this with the MCP server in your `.mcp-config.json`:

```bash
# Using Auth0 CLI with the MCP setup
# (Your MCP server can handle Auth0 Management API calls)
```

Ask me if you'd like help automating this via the MCP!

## ✅ Verification Checklist

- [ ] All 5 brand templates created
- [ ] Templates have correct brand colors
- [ ] Each has unique hero emoji/animation
- [ ] Tested AutoZero login - shows car, orange/blue
- [ ] Tested CampNation login - shows tent, green
- [ ] Tested BBQ1 login - shows fire, red
- [ ] Tested OfficeZero login - shows chart, blue
- [ ] Tested CandyZero login - shows candy, pink/purple
- [ ] Mobile responsive on all brands
- [ ] Forms are functional

## 🤔 Troubleshooting

**Login page doesn't show my branding**
- Clear browser cache: `clearAuth0Cache()` in console
- Verify you pasted ALL HTML content
- Check you're in the correct organization

**Emoji not showing**
- Some emojis may not render on older browsers
- Alternative: Use Font Awesome icons or SVG images

**Colors look wrong**
- Check the CSS color values match your brand config exactly
- Ensure you're editing the correct organization

**Mobile layout broken**
- All templates include responsive CSS
- Test on actual mobile device
- Check viewport meta tag is present

## 📚 Next Steps

1. ✅ Copy templates to Auth0 dashboard
2. ✅ Test each brand's login
3. ✅ Customize emojis/images as needed
4. ✅ Share with stakeholders for feedback
5. ✅ Deploy to production when ready

---

**Questions?** Check the main `AUTH0_LOGIN_TEMPLATE_GUIDE.md` for more details!
