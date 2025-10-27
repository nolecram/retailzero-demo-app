# 🔐 Secrets & Environment Variables Guide

## Overview

This project requires Auth0 credentials to function. **Never commit secrets to GitHub.** This guide explains what credentials you need, where to get them, and how to set them up safely.

## ✅ Secure Configuration

### What's Already Protected
- ✅ `.mcp-config.json` - **In `.gitignore`** (MCP server credentials)
- ✅ `.env.local` - **In `.gitignore`** (local environment variables)
- ✅ `.env.development.local` - **In `.gitignore`** (development secrets)

### What's Public (Safe to Commit)
- ✅ Auth0 Domain - This is public information
- ✅ Auth0 Client ID - This is public information  
- ✅ Organization IDs - These are public identifiers

---

## 🔑 Required Credentials

### 1. Auth0 Application Credentials

**What you need:**
- `AUTH0_DOMAIN` - Your Auth0 tenant domain
- `AUTH0_CLIENT_ID` - Application Client ID (for frontend)
- `AUTH0_CLIENT_SECRET` - Application Client Secret (for backend only)

**Sensitivity:**
- 🟢 **Domain & Client ID** - PUBLIC (safe in frontend code)
- 🔴 **Client Secret** - PRIVATE (never in frontend, never in git)

**Get these from:**
1. Go to [Auth0 Dashboard](https://manage.auth0.com)
2. Navigate: **Applications** → **Applications** → Select your app
3. Click **Settings** tab
4. Copy:
   - `Domain` → AUTH0_DOMAIN
   - `Client ID` → AUTH0_CLIENT_ID
   - `Client Secret` → AUTH0_CLIENT_SECRET (for backend/MCP only)

---

## 📝 Setup Instructions

### Step 1: Frontend Configuration (React App)

Create `.env.local` in your project root:

```bash
# Copy from .env.example
cp .env.example .env.local
```

Edit `.env.local`:
```
REACT_APP_AUTH0_DOMAIN=your-domain.auth0.com
REACT_APP_AUTH0_CLIENT_ID=your_client_id_here
REACT_APP_AUTH0_REDIRECT_URI=http://localhost:3000
```

**Important Notes:**
- ✅ `.env.local` is in `.gitignore` - it won't be committed
- ✅ Frontend can safely have Client ID (it's public)
- ✅ **Never put Client Secret in `.env.local`**
- ✅ Variables must start with `REACT_APP_` to be available in React

### Step 2: MCP Server Configuration (AI Integration)

The `.mcp-config.json` file is for Claude/AI integrations with Auth0. It's already in `.gitignore`.

To set it up locally:

```bash
# Copy template
cp .mcp-config.example.json .mcp-config.json
```

Edit `.mcp-config.json`:
```json
{
  "mcpServers": {
    "auth0": {
      "command": "npx",
      "args": ["-y", "@auth0/auth0-mcp-server"],
      "env": {
        "AUTH0_DOMAIN": "your-domain.auth0.com",
        "AUTH0_CLIENT_ID": "your_m2m_client_id",
        "AUTH0_CLIENT_SECRET": "your_m2m_client_secret"
      }
    }
  }
}
```

**Get MCP Credentials:**
1. Auth0 Dashboard → **Applications** → **Machine to Machine Applications**
2. Create or select an M2M application for your MCP integration
3. Copy Domain, Client ID, and Client Secret

### Step 3: Backend Scripts Configuration

If running backend scripts (Node.js automation):

Create `.env` in the project root:
```bash
AUTH0_DOMAIN=your-domain.auth0.com
AUTH0_CLIENT_ID=your_m2m_client_id
AUTH0_CLIENT_SECRET=your_m2m_client_secret
```

Ensure `.env` is in `.gitignore` ✅

---

## 🗂️ File Structure & Security

```
retailzero-demo/
├── .gitignore                 # ✅ Protects these files:
│                              #    - .env
│                              #    - .env.local
│                              #    - .env.*.local
│                              #    - .mcp-config.json
│
├── .env.example               # 📋 Template (SAFE to commit)
├── .mcp-config.example.json   # 📋 Template (SAFE to commit)
│
├── src/
│   └── index.js               # ✅ Safe - uses process.env.REACT_APP_*
│
├── .mcp-config.json           # ❌ PRIVATE (in .gitignore, NOT committed)
├── .env                       # ❌ PRIVATE (in .gitignore, NOT committed)
└── .env.local                 # ❌ PRIVATE (in .gitignore, NOT committed)
```

---

## 🔍 Checking Your Setup

### Is it secure?

```bash
# Check that secrets are not committed
git status                              # Should show no .env files
git log --oneline -- ".env*"           # Should be empty
git log --oneline -- ".mcp-config.json" # Should be empty

# Verify .gitignore is working
git check-ignore -v .env.local          # Should show it's ignored
git check-ignore -v .mcp-config.json    # Should show it's ignored
```

### Test your configuration

```bash
# Frontend (React app)
npm start
# If it loads without auth errors, configuration is correct ✅

# Check what environment variables are loaded
# In browser console, type:
console.log(process.env.REACT_APP_AUTH0_DOMAIN)
console.log(process.env.REACT_APP_AUTH0_CLIENT_ID)
```

---

## ⚠️ What NOT to Do

❌ **DON'T commit `.env` files**
```bash
git add .env.local  # NO! This will leak secrets
```

❌ **DON'T put Client Secret in React code**
```javascript
// WRONG! Client Secret will be exposed in browser
const secret = "rLFagAsEQdgR2NBURQk8BP3u17hiKzABLtHNDVN78nXbMxg5adViZdfKQWqX-Kqa";

// CORRECT! Frontend only needs public Client ID
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
```

❌ **DON'T hardcode secrets in source files**
```javascript
// WRONG!
const domain = "retailzero-demo.au.auth0.com";

// CORRECT!
const domain = process.env.REACT_APP_AUTH0_DOMAIN;
```

---

## 🚀 Deployment

### Production Environment Variables

Set these in your deployment platform:

**Vercel/Netlify:**
- Go to Project Settings → Environment Variables
- Add:
  - `REACT_APP_AUTH0_DOMAIN`
  - `REACT_APP_AUTH0_CLIENT_ID`
  - `REACT_APP_AUTH0_REDIRECT_URI` (set to production URL)

**Heroku:**
```bash
heroku config:set REACT_APP_AUTH0_DOMAIN=your-domain.auth0.com
heroku config:set REACT_APP_AUTH0_CLIENT_ID=your_client_id
```

**AWS/Docker:**
Create `.env.production` (commit with **masked values**, or use CI/CD secrets):
```
REACT_APP_AUTH0_DOMAIN=${AUTH0_DOMAIN}
REACT_APP_AUTH0_CLIENT_ID=${AUTH0_CLIENT_ID}
```

---

## 📚 Related Files

- **`.env.example`** - Frontend environment variables template
- **`.mcp-config.example.json`** - MCP configuration template
- **`docs/SETUP.md`** - Full setup instructions
- **`docs/auth0-customization/QUICK_START.md`** - Auth0 customization guide

---

## 🤔 Troubleshooting

### "Auth0 login not working"
**Check:**
- ✅ `.env.local` has correct domain and client ID
- ✅ Auth0 domain doesn't include `https://`
- ✅ Allowed Callback URLs in Auth0 include `http://localhost:3000`

### "MCP server not connecting"
**Check:**
- ✅ `.mcp-config.json` has correct M2M credentials
- ✅ M2M app has **Management API** scope enabled
- ✅ Auth0 domain matches frontend domain

### "Variables showing as undefined"
**Check:**
- ✅ Variable names start with `REACT_APP_`
- ✅ `.env.local` is in project root
- ✅ Restart dev server after adding variables

---

## 🔗 External Resources

- [Auth0 Dashboard](https://manage.auth0.com)
- [Auth0 React SDK Documentation](https://auth0.com/docs/quickstart/spa/react)
- [Environment Variables in React](https://create-react-app.dev/docs/adding-custom-environment-variables/)
- [Auth0 MCP Server](https://github.com/auth0/auth0-mcp-server)

---

**Last Updated:** October 28, 2025
