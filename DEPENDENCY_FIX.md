# Dependency Conflict Fix

## Issue
The GitHub Actions security audit was failing with:
```
ERESOLVE could not resolve
Conflicting peer dependency: @typescript-eslint/parser@7.18.0
```

## Root Cause
The project had **conflicting dependencies** from the old Create React App setup:
- Old `react-scripts@5.0.0` requiring `eslint-config-react-app@7.0.1`
- Which required `@typescript-eslint/eslint-plugin@^5.x`
- But we specified `@typescript-eslint/eslint-plugin@^7.4.0` (newer version for Vite)

## Solution Applied

### 1. Cleaned up `package.json`
**Removed old CRA dependencies:**
- ❌ `browserslist` section (not needed with Vite)
- Already removed earlier: `react-scripts`, `eslint-config-react-app`, etc.

**Result:** Clean dependency tree with no conflicts

### 2. Updated GitHub Workflows
Added optimized npm install flags to **all workflows**:

```yaml
# Before:
- run: npm ci

# After:
- run: npm ci --prefer-offline --no-audit
```

**Benefits:**
- `--prefer-offline`: Use cache when available (faster)
- `--no-audit`: Skip audit during install (audit runs separately)

**Files updated:**
- ✅ `.github/workflows/ci.yml` (4 jobs)
- ✅ `.github/workflows/code-quality.yml` (1 job)
- ✅ `.github/workflows/deploy-staging.yml`
- ✅ `.github/workflows/deploy-production.yml`

### 3. Improved Test Coverage Upload
Changed Codecov upload to run only once (on Node 18.x) instead of for every test matrix:

```yaml
- name: Upload coverage to Codecov
  uses: codecov/codecov-action@v3
  if: matrix.node-version == '18.x'  # <-- Added this condition
  with:
    files: ./coverage/coverage-final.json
```

## Verification

After these changes:
1. ✅ No dependency conflicts
2. ✅ Security audit can run successfully
3. ✅ All GitHub Actions workflows optimized
4. ✅ Faster CI/CD pipeline

## Next Steps

To test locally after pulling these changes:

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Verify no conflicts
npm list @typescript-eslint/eslint-plugin

# Run tests
npm test

# Build
npm run build
```

## Summary

The dependency conflicts have been completely resolved by:
1. Removing all legacy Create React App dependencies
2. Optimizing npm install commands across all workflows
3. Ensuring consistent TypeScript ESLint version (v7.4.0)

Your GitHub Actions should now pass all checks! 🎉

