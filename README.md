# Next.js Application Deployment Guide

This guide will help you deploy your Next.js application with Firebase authentication to both Firebase Hosting and Netlify.

## Prerequisites

- Node.js installed on your machine
- Firebase CLI installed (`npm install -g firebase-tools`)
- Netlify CLI installed (optional, for Netlify deployments)
- Firebase and Netlify accounts

## Environment Variables

Create a `.env.local` file in your project root and add the following Firebase configuration:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## Deploying to Firebase

1. Login to Firebase:
   ```bash
   firebase login
   ```

2. Initialize Firebase in your project (if not already done):
   ```bash
   firebase init
   ```

3. Build your Next.js application:
   ```bash
   npm run build
   npm run export
   ```

4. Deploy to Firebase:
   ```bash
   firebase deploy
   ```

## Deploying to Netlify

### Option 1: Deploy via Git

1. Push your code to a Git repository
2. Connect your repository to Netlify
3. Configure the build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
4. Add your environment variables in Netlify's dashboard
5. Deploy!

### Option 2: Deploy via Netlify CLI

1. Login to Netlify CLI:
   ```bash
   netlify login
   ```

2. Initialize your site:
   ```bash
   netlify init
   ```

3. Deploy:
   ```bash
   netlify deploy
   ```

## Configuration Files

The project includes the following configuration files:

- `firebase.json`: Configures Firebase hosting
- `netlify.toml`: Configures Netlify build and deployment
- `next.config.js`: Configures Next.js build settings
- `vercel.json`: Configures routing for Vercel (if needed)

## Troubleshooting

- If you encounter CORS issues, ensure your Firebase Authentication settings include your deployment domains
- For Netlify deployments, make sure the @netlify/plugin-nextjs plugin is properly configured
- Check that all environment variables are properly set in your deployment platform

## Support

For additional help:
- [Firebase Hosting Documentation](https://firebase.google.com/docs/hosting)
- [Netlify Next.js Documentation](https://docs.netlify.com/configure-builds/common-configurations/next-js/)
- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)