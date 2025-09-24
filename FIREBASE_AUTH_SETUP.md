# Firebase Authentication Domain Setup Guide

## 🚨 Problem: Login works on localhost but not on Vercel

This happens because Firebase requires **authorized domains** to be configured for authentication to work.

## ✅ Solution Steps:

### Step 1: Check Your Live Domain
Visit your live site and check the Firebase Auth debug panel:
- Click **🔥 AUTH** button (bottom right)
- Click **🔍 Check Firebase Config** 
- Note the `domain` value (e.g., `scholarship-client-weld.vercel.app`)

### Step 2: Add Domain to Firebase Console

1. **Go to Firebase Console**: https://console.firebase.google.com
2. **Select Your Project**: `scholarships-d1fc8`
3. **Navigate to Authentication**:
   - Click **Authentication** in left sidebar
   - Click **Settings** tab
   - Click **Authorized domains**

4. **Add Your Vercel Domain**:
   - Click **Add domain**
   - Add: `scholarship-client-weld.vercel.app`
   - Click **Done**

### Step 3: Common Domains to Add
Make sure these domains are in your authorized list:
```
localhost
scholarship-client-weld.vercel.app
scholarships-d1fc8.firebaseapp.com
scholarships-d1fc8.web.app
```

### Step 4: Verify Configuration
After adding domains:
1. Wait 2-3 minutes for changes to propagate
2. Visit your live site
3. Try to login/signup
4. Check Auth Debug panel again

## 🔧 Firebase Config Check

Your current Firebase config should have:
- ✅ `apiKey`: AIzaSyDMMY68oKWOhe2Q_P22CSLaADevrklPwJw
- ✅ `authDomain`: scholarships-d1fc8.firebaseapp.com
- ✅ `projectId`: scholarships-d1fc8
- ✅ All other Firebase variables

## 🚀 Testing Authentication

After domain setup:
1. **Test Signup**: Create new account on live site
2. **Test Login**: Login with existing credentials  
3. **Test Social Auth**: If using Google/Facebook login
4. **Check Auth State**: Use debug panel to verify

## ⚠️ Common Issues

### Issue 1: Domain Mismatch
- **Error**: "auth/unauthorized-domain"
- **Solution**: Add exact domain to Firebase authorized domains

### Issue 2: Environment Variables
- **Error**: Firebase config undefined
- **Solution**: Check Vercel environment variables

### Issue 3: CORS Issues
- **Error**: Network errors
- **Solution**: Ensure Firebase rules allow your domain

## 📝 Debug Commands

To debug auth issues on live site:
1. Add `?debug=auth` to your URL
2. Open browser developer tools
3. Check console for Firebase errors
4. Use Auth Debug panel

## 🎯 Expected Result

After proper setup:
- ✅ Login works on both localhost and live site
- ✅ User authentication persists across page reloads
- ✅ Protected routes work correctly
- ✅ No Firebase auth errors in console

---

**Need Help?** 
- Check Firebase Console for error logs
- Verify all environment variables are set in Vercel
- Ensure domain spelling is exact (no trailing slash)