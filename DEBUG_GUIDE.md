// Common Backend Connection Issues এবং Solutions

## 🔧 Backend Data না আসার সমস্যা ও সমাধান:

### 1. **Environment Variable Issue**
```bash
# Check if VITE_API_URL is properly set
console.log('API URL:', import.meta.env.VITE_API_URL)
```

### 2. **CORS Issue** 
Backend এ CORS properly configure করা আছে কিনা check করুন:
```javascript
// Backend এ এই setting থাকতে হবে
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5176', 'https://your-domain.com'],
  credentials: true
}))
```

### 3. **API Endpoint Issue**
সঠিক endpoint ব্যবহার করছেন কিনা:
```javascript
// এই endpoints গুলো try করুন
/scholarship        // All scholarships
/scholar/moderator  // Applied scholarships
/api/scholarship    // If using /api prefix
```

### 4. **Authentication Issue**
User logged in আছে কিনা এবং proper token পাঠানো হচ্ছে কিনা।

### 5. **Network/Server Issue**
Backend server running আছে কিনা check করুন।

### 6. **Data Format Issue**  
Backend থেকে expected format এ data আসছে কিনা।

## 🚀 Quick Solutions:

1. **Environment Variable Fix**:
   - .env.local file restart করুন
   - Server restart করুন (npm run dev)

2. **API URL Test**:
   - Browser এ direct API URL hit করুন
   - Postman দিয়ে test করুন

3. **Console Debug**:
   - Network tab check করুন
   - Console এ error দেখুন

4. **Backend Logs**:
   - Backend server এর logs check করুন
   - Database connection check করুন