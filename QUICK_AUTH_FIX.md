# Quick Firebase Domain Fix Commands

# If you have Firebase CLI installed:
# firebase auth:export domains.json
# firebase auth:import domains.json --project scholarships-d1fc8

# Manual Steps (Recommended):
# 1. Go to: https://console.firebase.google.com/project/scholarships-d1fc8/authentication/settings
# 2. Scroll to "Authorized domains"  
# 3. Click "Add domain"
# 4. Add: scholarship-client-weld.vercel.app
# 5. Click "Done"
# 6. Wait 2-3 minutes
# 7. Test login on live site

# Domains to Add:
localhost
scholarship-client-weld.vercel.app
scholarships-d1fc8.firebaseapp.com
scholarships-d1fc8.web.app

# Verification:
# - Visit: https://scholarship-client-weld.vercel.app
# - Click 🔥 AUTH debug button
# - Try login/signup
# - Check console for errors