# Brand Logo URLs for Auth0 Configuration

## Important: Add Your Logo Files First

Before using these URLs in Auth0, you need to add the actual logo image files to the `public/logos/` directory:

1. Save each logo image file with the exact names below
2. Commit and push to GitHub
3. Then use these URLs in Auth0

## Logo Files to Add

Place these files in `public/logos/`:

- `autozero.png` - AutoZero logo (automotive theme)
- `campnation.png` - CampNation logo (camping/outdoor theme)
- `bbq1.png` - BBQ1 logo (grilling theme)
- `officezero.png` - OfficeZero logo (office supplies theme)
- `candyzero.png` - CandyZero logo (candy/sweets theme)
- `retailzero.png` - RetailZero main platform logo (optional)

## GitHub Raw URLs (After Uploading Files)

Once you've added the logo files and pushed to GitHub, use these URLs:

### AutoZero
```
https://raw.githubusercontent.com/nolecram/retailzero-demo-app/main/public/logos/autozero.png
```

### CampNation
```
https://raw.githubusercontent.com/nolecram/retailzero-demo-app/main/public/logos/campnation.png
```

### BBQ1
```
https://raw.githubusercontent.com/nolecram/retailzero-demo-app/main/public/logos/bbq1.png
```

### OfficeZero
```
https://raw.githubusercontent.com/nolecram/retailzero-demo-app/main/public/logos/officezero.png
```

### CandyZero
```
https://raw.githubusercontent.com/nolecram/retailzero-demo-app/main/public/logos/candyzero.png
```

### RetailZero (Main Platform)
```
https://raw.githubusercontent.com/nolecram/retailzero-demo-app/main/public/logos/retailzero.png
```

## How to Add Logos to Auth0

### Option 1: Application Logo (Main App)

1. Go to [Auth0 Dashboard](https://manage.auth0.com)
2. Navigate to **Applications** → **Applications**
3. Select your application (`retailzero-demo`)
4. Go to **Settings** tab
5. Find **Application Logo** field
6. Paste the RetailZero logo URL:
   ```
   https://raw.githubusercontent.com/nolecram/retailzero-demo-app/main/public/logos/retailzero.png
   ```
7. Click **Save Changes**

### Option 2: Organization Branding (Per Brand)

1. Go to [Auth0 Dashboard](https://manage.auth0.com)
2. Navigate to **Organizations** → Select an organization
3. Click **Branding** tab
4. Under **Logo**, paste the appropriate URL:
   - **AutoZero org**: Use AutoZero logo URL
   - **CampNation org**: Use CampNation logo URL
   - **BBQ1 org**: Use BBQ1 logo URL
   - **OfficeZero org**: Use OfficeZero logo URL
   - **CandyZero org**: Use CandyZero logo URL
5. You can also customize **Colors**:
   - **Primary Color**: Use the brand's primary color from `src/config/brands.js`
   - **Background Color**: #ffffff (or customize)
6. Click **Save**

### Option 3: Universal Login Page

1. Go to **Branding** → **Universal Login**
2. Enable **Customize Login Page**
3. Add logo using HTML/CSS in the template
4. Or use the visual customizer to add logo URLs

## Brand Colors Reference

Use these colors when configuring Auth0 branding:

| Brand | Primary Color | Secondary Color |
|-------|--------------|----------------|
| AutoZero | `#FF6B35` | `#004E89` |
| CampNation | `#2D6A4F` | `#52B788` |
| BBQ1 | `#D00000` | `#370617` |
| OfficeZero | `#4361EE` | `#3F37C9` |
| CandyZero | `#F72585` | `#7209B7` |

## Logo Recommendations

For best display in Auth0:

- **Dimensions**: 200x200px or 400x400px (square format)
- **Format**: PNG with transparent background
- **File size**: Under 500KB for fast loading
- **Resolution**: At least 72 DPI (144 DPI for retina displays)

## Testing the Logos

After adding logos to Auth0:

1. Test the login flow: `https://retailzero-demo.au.auth0.com/authorize?...`
2. Verify logo appears in Universal Login page
3. Check organization-specific login screens show correct brand logos
4. Ensure logos are responsive on mobile devices

## Troubleshooting

**Logo not appearing in Auth0?**
- Verify the file exists at the GitHub URL (try opening in browser)
- Check that the file was pushed to the `main` branch
- Ensure URL uses `raw.githubusercontent.com` domain
- Wait a few minutes for GitHub CDN to update
- Clear browser cache and try again

**Logo appears pixelated?**
- Increase logo resolution (use 2x size: 400x400px)
- Ensure logo is PNG format with high quality
- Check original logo file quality

**Wrong logo showing?**
- Verify you're using the correct URL for each organization
- Check that organization ID in code matches Auth0
- Review Auth0 organization branding settings

## Next Steps

1. ✅ Logo integration code complete
2. ✅ Changes pushed to GitHub
3. ⏳ **YOU NEED TO DO**: Save logo image files to `public/logos/`
4. ⏳ **YOU NEED TO DO**: Commit and push logo files
5. ⏳ **YOU NEED TO DO**: Add logo URLs to Auth0 Dashboard
6. ⏳ **YOU NEED TO DO**: Create Auth0 Organizations (see `QUICK_SETUP.md`)
7. ⏳ **YOU NEED TO DO**: Update `src/config/brands.js` with real Organization IDs
8. ⏳ **YOU NEED TO DO**: Uncomment organization parameter in `src/index.js`

---

**Repository**: https://github.com/nolecram/retailzero-demo-app

**Need Help?** See `AUTH0_SETUP_INSTRUCTIONS.md` for detailed troubleshooting.
