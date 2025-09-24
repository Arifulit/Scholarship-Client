# 🚀 Vercel Deployment Guide

## ❗ সমস্যা: Vercel deploy করার পর data আসে না

### 🔍 কারণ:
Vercel এ deploy করার সময় `.env.local` file সেট করা থাকে না।

## 🛠️ সমাধান পদ্ধতি:

### Method 1: Vercel Dashboard দিয়ে (সহজ)

1. **Vercel Dashboard এ যান:** https://vercel.com/dashboard
2. **আপনার project click করুন**
3. **Settings tab → Environment Variables**
4. **নিচের variables গুলো add করুন:**

```
VITE_API_URL = https://assignment-scholarship-server.vercel.app
VITE_IMGBB_API_KEY = 1602c926f45df30ed127642e47f4a117
VITE_STRIPE_PUBLIC_KEY = pk_test_51QlDnMK0TTEY7687oAzmK11Af8IH68LINXGz1R2MvBAKiIl8D9k0F3VwSd4WsiJIxR1Y9e0NODpzsJbdTe71ey8t00X6cK8KjE
VITE_apiKey = AIzaSyDMMY68oKWOhe2Q_P22CSLaADevrklPwJw
VITE_authDomain = scholarships-d1fc8.firebaseapp.com
VITE_projectId = scholarships-d1fc8
VITE_storageBucket = scholarships-d1fc8.firebasestorage.app
VITE_messagingSenderId = 910170598163
VITE_appId = 1:910170598163:web:c8d2c0410ce515493c48e6
```

5. **Deployments tab এ গিয়ে latest deployment redeploy করুন**

---

### Method 2: Command Line দিয়ে

```bash
# 1. Vercel CLI install করুন
npm i -g vercel

# 2. Login করুন
vercel login

# 3. Environment variables set করুন
vercel env add VITE_API_URL
# Value: https://assignment-scholarship-server.vercel.app

vercel env add VITE_IMGBB_API_KEY
# Value: 1602c926f45df30ed127642e47f4a117

# (অন্য variables গুলোও একইভাবে add করুন)

# 4. Deploy করুন
vercel --prod
```

---

## 🧪 Test করার জন্য:

1. **Deploy হওয়ার পর আপনার live site এ যান**
2. **ডান নিচে 🐛 ENV button দেখুন**
3. **Click করে environment variables check করুন**
4. **সব ✓ Set দেখাতে হবে**

---

## 🔧 Common Issues:

### Issue 1: API URL ভুল
```
❌ VITE_API_URL = https://assignment-scholarship-server.vercel.app/api
✅ VITE_API_URL = https://assignment-scholarship-server.vercel.app
```

### Issue 2: Environment Variables missing
- Vercel Dashboard এ check করুন
- Redeploy করুন environment variables add করার পর

### Issue 3: CORS Issue
Backend এ আপনার deployed domain add করতে হবে:
```javascript
// Backend CORS settings
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://your-app.vercel.app'  // আপনার deployed URL
  ],
  credentials: true
}))
```

---

## ✅ Success Checklist:

- [ ] Vercel Dashboard এ Environment Variables set করেছি
- [ ] Latest deployment redeploy করেছি  
- [ ] Live site এ 🐛 ENV button দিয়ে check করেছি
- [ ] সব Environment Variables ✓ Set দেখাচ্ছে
- [ ] Data properly load হচ্ছে
- [ ] Backend এ frontend domain add করেছি

## 🆘 Still not working?

1. Browser Console (F12) check করুন
2. Network tab দেখুন API calls
3. 🐛 ENV debug panel use করুন
4. Backend logs check করুন