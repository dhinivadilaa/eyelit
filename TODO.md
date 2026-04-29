# Vite Import/SSR Error Fix - EYELIT Project

## Status: ✅ In Progress

### Plan Summary
- Fix Vite import errors for MainLayout/Button components  
- Resolve SSR "dashboard is not a function" error
- Root cause: app.jsx/app.tsx conflict + Dashboard.jsx vs dashboard.tsx

### Steps (4/4 remaining)

**✅ Step 0: Analysis Complete**  
- Confirmed MainLayout.jsx/Button.jsx exist ✓
- Identified app.jsx glob `./pages/**/*.jsx` ignores .tsx files
- dashboard.tsx named export conflicts with Dashboard.jsx default export

**✅ Step 1: Delete conflicting app.jsx** ✓  
`del "resources/js/app.jsx"`

**✅ Step 2: Delete conflicting dashboard.tsx** ✓  
`del "resources/js/pages/dashboard.tsx"`

**✅ Step 3: Clear Vite cache** ✓  
`Remove-Item -Recurse -Force "node_modules\.vite" -ErrorAction SilentlyContinue` (PowerShell)

**✅ Step 4: Restart dev server** ✓  
`npm run dev`


**⏳ Step 5: Test pages**  
- Admin Dashboard: http://localhost/admin/dashboard  
- Home/Login working

---

**Next Action:** Will delete files 1-2, then clear cache.

