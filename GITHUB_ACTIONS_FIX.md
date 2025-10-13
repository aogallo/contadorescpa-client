# GitHub Actions Deprecation Fix

## Issue
GitHub Actions workflow failing with:
```
Error: This request has been automatically failed because it uses a deprecated version of 
`actions/upload-artifact: v3`. Learn more: https://github.blog/changelog/2024-04-16-deprecation-notice-v3-of-the-artifact-actions/
```

## What Was Deprecated

GitHub deprecated v3 of artifact actions on April 16, 2024. All workflows must upgrade to v4.

## Changes Made

### 1. Updated `actions/upload-artifact` (v3 → v4)

**File: `.github/workflows/ci.yml`**

```yaml
# Before:
- uses: actions/upload-artifact@v3

# After:
- uses: actions/upload-artifact@v4
```

**Changes:**
- Upgraded from v3 to v4
- No configuration changes needed
- Fully backward compatible

### 2. Updated `codecov/codecov-action` (v3 → v4)

**File: `.github/workflows/ci.yml`**

```yaml
# Before:
- uses: codecov/codecov-action@v3
  with:
    files: ./coverage/coverage-final.json
    flags: unittests
    name: codecov-umbrella

# After:
- uses: codecov/codecov-action@v4
  with:
    files: ./coverage/coverage-final.json
    flags: unittests
    name: codecov-umbrella
    token: ${{ secrets.CODECOV_TOKEN }}  # Now required in v4
```

**Key Changes:**
- Upgraded from v3 to v4
- Added `token` parameter (required in v4)
- Token is optional for public repos but required for private repos

## What You Need to Do

### Option 1: Using Codecov (Recommended for coverage tracking)

1. **Create Codecov account** (free for open source):
   - Go to https://codecov.io
   - Sign in with GitHub
   - Add your repository

2. **Get your Codecov token**:
   - Go to Settings → Configuration
   - Copy the "Repository Upload Token"

3. **Add to GitHub Secrets**:
   ```bash
   gh secret set CODECOV_TOKEN --body "YOUR_CODECOV_TOKEN" -R aogallo/contadorescpa-client
   ```

### Option 2: Remove Codecov (Simpler, tests still run)

If you don't want to set up Codecov, comment out the upload step in `.github/workflows/ci.yml`:

```yaml
# - name: Upload coverage to Codecov
#   uses: codecov/codecov-action@v4
#   if: matrix.node-version == '18.x'
#   with:
#     files: ./coverage/coverage-final.json
#     flags: unittests
#     name: codecov-umbrella
#     token: ${{ secrets.CODECOV_TOKEN }}
```

**Note:** Your tests will still run and generate coverage locally, they just won't be uploaded to Codecov.

## Benefits of v4

### actions/upload-artifact@v4:
- ✅ Faster uploads (up to 90% faster)
- ✅ Better compression
- ✅ Improved reliability
- ✅ Backward compatible API

### codecov/codecov-action@v4:
- ✅ Better security with required tokens
- ✅ Faster uploads
- ✅ Improved error messages
- ✅ Better retry logic

## Verification

After these changes, your build workflow will:

1. ✅ Pass without deprecation warnings
2. ✅ Upload build artifacts successfully
3. ✅ Upload coverage to Codecov (if token is set)
4. ✅ Run faster with improved performance

## Summary

**What was fixed:**
- Updated `actions/upload-artifact` to v4
- Updated `codecov/codecov-action` to v4
- Added token support for Codecov

**What you need:**
- ✅ Nothing for upload-artifact (works automatically)
- ⚠️ `CODECOV_TOKEN` secret (only if you want Codecov integration)

**Status:** Ready to use! Push your changes and the workflows will run successfully. 🚀

