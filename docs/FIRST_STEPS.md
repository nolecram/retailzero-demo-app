# 🚀 Getting Started - First Steps Guide

Welcome to RetailZero! This guide will get you up and running in 5 minutes.

## ⚡ Quick Start (5 minutes)

### 1️⃣ Clone & Install
```bash
git clone https://github.com/nolecram/retailzero-demo-app.git
cd retailzero-demo-app
npm install
```

### 2️⃣ Setup Configuration
```bash
# Copy environment template
cp .env.example .env.local

# Copy MCP configuration template
cp .mcp-config.example.json .mcp-config.json
```

### 3️⃣ Add Your Auth0 Credentials
Edit `.env.local`:
```env
REACT_APP_AUTH0_DOMAIN=YOUR_DOMAIN.auth0.com
REACT_APP_AUTH0_CLIENT_ID=YOUR_CLIENT_ID
```

See [SECRETS_CONFIGURATION.md](./SECRETS_CONFIGURATION.md) for details on getting these values.

### 4️⃣ Start Development Server
```bash
npm start
```

Visit: **http://localhost:3000**

### 5️⃣ Login with Test User
- Email: `customer1+autozero@goingtobuy.com`
- Password: `Melbourne.2005`

✅ **You're ready to go!**

---

## 📚 What's Next?

### Understand the App
- **Architecture**: Read [TECHNICAL_REQUIREMENTS.md](./TECHNICAL_REQUIREMENTS.md)
- **Code Structure**: Check [REPOSITORY_STRUCTURE.md](./REPOSITORY_STRUCTURE.md)

### Customize Auth0 Login Pages
- Follow [auth0-customization/QUICK_START.md](./auth0-customization/QUICK_START.md)
- Each brand has a custom login template with branded hero images

### Explore the Brands
The app includes 5 retail brands:
- **AutoZero** 🚗 - Automotive parts
- **CampNation** ⛺ - Outdoor gear
- **BBQ1** 🔥 - BBQ equipment
- **OfficeZero** 📊 - Office supplies
- **CandyZero** 🍬 - Confectionery

Switch between brands using the dropdown in the top-right corner (when logged in).

### Test Different Roles
**Admin Users** (full access):
- Email: `admin1@retailzero.com`
- Password: `Melbourne.2025`

**Employee Users** (access to all brands):
- Email: `employee1@retailzero.com`
- Password: `Melbourne.2025`

---

## 🔐 Security Notes

✅ **Secrets are Protected:**
- `.env.local` is in `.gitignore` (never committed)
- `.mcp-config.json` is in `.gitignore` (never committed)
- Never commit files with your real credentials!

✅ **Public vs Private:**
- Auth0 Domain and Client ID: OK to have in code (public)
- Auth0 Client Secret: NEVER in code (stays in `.env` only)

See [SECRETS_CONFIGURATION.md](./SECRETS_CONFIGURATION.md) for full details.

---

## 🛠️ Development Commands

```bash
# Start development server
npm start

# Run tests
npm test

# Build for production
npm build

# Eject configuration (one-way operation)
npm run eject
```

---

## 📁 Project Structure (Simplified)

```
retailzero-demo/
├── src/                    # React components & pages
├── docs/                   # Documentation (you are here)
├── scripts/                # Auth0 setup automation
├── public/                 # Static files
├── .env.example            # Template (fill in & rename to .env.local)
└── package.json            # Dependencies
```

For full structure, see [REPOSITORY_STRUCTURE.md](./REPOSITORY_STRUCTURE.md).

---

## 🆘 Troubleshooting

### "Auth0 login not working"
1. Check `.env.local` exists and has correct values
2. Verify Auth0 domain doesn't have `https://`
3. Check "Allowed Callback URLs" in Auth0 includes `http://localhost:3000`

### "Port 3000 already in use"
```bash
# Kill existing process
lsof -i :3000
kill -9 <PID>

# Or use different port
PORT=3001 npm start
```

### "Module not found" errors
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

See [SETUP.md](./SETUP.md) for more troubleshooting.

---

## 📖 Full Documentation

- [SETUP.md](./SETUP.md) - Detailed setup instructions
- [SECRETS_CONFIGURATION.md](./SECRETS_CONFIGURATION.md) - Environment variables
- [TECHNICAL_REQUIREMENTS.md](./TECHNICAL_REQUIREMENTS.md) - Architecture details
- [REPOSITORY_STRUCTURE.md](./REPOSITORY_STRUCTURE.md) - File organization
- [AUDIT_REPORT.md](./AUDIT_REPORT.md) - Code quality report
- [INDEX.md](./INDEX.md) - Full documentation index

---

## 🎯 Common Tasks

### Add a New Brand
1. Create new organization in Auth0
2. Add entry to `src/config/brands.js`
3. Update `src/pages/LandingPage.js`
4. Create Auth0 login template

### Customize Login Page
1. Copy Auth0 template from `docs/auth0-customization/`
2. Edit colors and content
3. Upload to Auth0 Universal Login

### Deploy to Production
1. Set environment variables on hosting platform
2. Update Auth0 "Allowed Callback URLs"
3. Run `npm build`
4. Deploy build folder
5. See [SETUP.md](./SETUP.md) for details

---

## 🚀 Ready?

Start with:
```bash
npm start
```

Then explore the app at **http://localhost:3000**

Questions? Check the [full documentation](./INDEX.md) or create an issue on GitHub!

---

**Happy coding!** 🎉
