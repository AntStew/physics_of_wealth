# Deployment Guide for Physics of Wealth

This Next.js application can be deployed to various platforms. Here are the recommended options:

## 🚀 Quick Deploy Options

### Option 1: Vercel (Recommended - Easiest)

**Why Vercel?**
- Made by the creators of Next.js
- Zero configuration needed
- Automatic HTTPS
- Free tier available
- Instant deployments from Git

**Steps:**
1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/Login (can use GitHub account)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings
   - Click "Deploy"
   - Your site will be live in ~2 minutes!

3. **Environment Variables (if needed):**
   - Go to Project Settings → Environment Variables
   - Add any required variables

**Note:** Your Excel file (`data/PhysOfWealth.xlsx`) will be automatically included in the deployment.

---

### Option 2: Netlify

**Steps:**
1. Push your code to Git (same as Vercel step 1)

2. **Deploy to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Sign up/Login
   - Click "Add new site" → "Import an existing project"
   - Connect your Git provider
   - Configure build settings:
     - **Build command:** `npm run build`
     - **Publish directory:** `.next`
   - Click "Deploy site"

---

### Option 3: Railway

**Steps:**
1. Push your code to Git

2. **Deploy to Railway:**
   - Go to [railway.app](https://railway.app)
   - Sign up/Login
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository
   - Railway auto-detects Next.js
   - Add a public domain in the settings

---

## 🔧 Manual Deployment (VPS/Cloud Server)

If you prefer to host on your own server:

### Prerequisites:
- Node.js 18+ installed
- PM2 (process manager) installed
- Nginx (reverse proxy) installed
- Domain name (optional)

### Steps:

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Build the application:**
   ```bash
   npm run build
   ```

3. **Install PM2:**
   ```bash
   npm install -g pm2
   ```

4. **Start the application with PM2:**
   ```bash
   pm2 start npm --name "physics-of-wealth" -- start
   ```

5. **Save PM2 configuration:**
   ```bash
   pm2 save
   pm2 startup
   ```

6. **Configure Nginx (example):**
   Create `/etc/nginx/sites-available/physics-of-wealth`:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

7. **Enable the site:**
   ```bash
   sudo ln -s /etc/nginx/sites-available/physics-of-wealth /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

8. **Set up SSL with Let's Encrypt:**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

---

## 📋 Pre-Deployment Checklist

Before deploying, make sure:

- [ ] All dependencies are in `package.json`
- [ ] `data/PhysOfWealth.xlsx` exists and is committed to Git
- [ ] No sensitive data is hardcoded (use environment variables)
- [ ] Build runs successfully locally: `npm run build`
- [ ] Code is pushed to a Git repository

---

## 🔍 Troubleshooting

### Build fails:
- Check Node.js version (should be 18+)
- Run `npm install` to ensure all dependencies are installed
- Check for TypeScript errors: `npm run lint`

### Excel file not found:
- Ensure `data/PhysOfWealth.xlsx` is committed to Git
- Check the file path in `src/app/api/data/route.ts`

### API routes not working:
- Ensure you're using Next.js API routes correctly
- Check server logs for errors
- Verify the Excel file is accessible

---

## 🌐 Custom Domain

Most platforms allow you to add a custom domain:
- **Vercel:** Project Settings → Domains
- **Netlify:** Site Settings → Domain Management
- **Railway:** Settings → Public Domain

---

## 📊 Monitoring

Consider setting up:
- Error tracking (Sentry, LogRocket)
- Analytics (Google Analytics, Vercel Analytics)
- Uptime monitoring (UptimeRobot, Pingdom)

---

## 💡 Recommended: Vercel

For this Next.js application, **Vercel is the recommended choice** because:
- Zero configuration
- Optimized for Next.js
- Free tier is generous
- Automatic deployments
- Built-in analytics
- Edge network for fast global performance

