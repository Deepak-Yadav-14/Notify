# URGENT: Security Issue - Sensitive Credentials Exposed in Git History

## Problem
The `Backend/.env` file containing sensitive credentials has been committed to the git repository history across multiple commits. This file contains:
- Google API Key: `AIzaSy***************************` (redacted for security)
- MongoDB URI with credentials: `mongodb+srv://username:********@cluster.mongodb.net/notes_db` (redacted for security)

**⚠️ CRITICAL:** The actual credentials are exposed in git history and must be rotated immediately!

## Immediate Actions Required

### 1. Rotate All Exposed Credentials (DO THIS FIRST!)
- **Google API Key**: Create a new API key in Google Cloud Console and revoke the old one
- **MongoDB Password**: Change the password for user `deepakyadav1452004` in MongoDB Atlas
- Update your production environment with new credentials

### 2. Remove .env from Git History

The `.env` file exists in these commits:
```
3f9d8cfd97bac7bbc28e6b41a99c36f02a87929e Delete Backend/.env
9c6a68a6da7c2f820908d4d66471af9dbf42dbd9 fix: Update Google API key in environment configuration
dd2248b0146476e3e09a2045356516c1fc99d89c fix: Update Google API key and model version; adjust CORS origins handling
9fe94444e3e7b6be418921b5657d63f875efa09d feat: increased speed by optimistic ui added manual index creation on startup
510e46de5d76914a6a5acbb2885ea31359c9fc36 feat: increased speed by optimistic ui added manual index creation on startup
275aceec371d5f73f038da4f48ec2973886827f9 Updated Requirements
0e99eb2003261c10948751d3d89c909c783a926a Merge branch 'Test_Manual_Authentication'
f7dcac4c678c3d2159cef017c02c95d82824339a Created a Login system with authentication with manual approach
935470f7e63a61f579113137cdd025eac6dfe068 Added MongoDb database
2c42b13300aae2d73e98db783d260aa479bc9155 Created Backend
```

#### Method 1: Using git-filter-repo (Recommended)

1. **Backup your repository first!**
   ```bash
   git clone --mirror https://github.com/Deepak-Yadav-14/Notify.git notify-backup
   ```

2. **Clone a fresh copy** (git-filter-repo requires this):
   ```bash
   git clone https://github.com/Deepak-Yadav-14/Notify.git notify-clean
   cd notify-clean
   ```

3. **Install git-filter-repo**:
   ```bash
   pip install git-filter-repo
   ```

4. **Remove Backend/.env from all history**:
   ```bash
   git-filter-repo --path Backend/.env --invert-paths --force
   ```

5. **Force push to update remote** (this will rewrite history):
   ```bash
   git remote add origin https://github.com/Deepak-Yadav-14/Notify.git
   git push origin --force --all
   git push origin --force --tags
   ```

#### Method 2: Using BFG Repo-Cleaner (Alternative)

1. **Download BFG**:
   ```bash
   wget https://repo1.maven.org/maven2/com/madgag/bfg/1.14.0/bfg-1.14.0.jar
   ```

2. **Clone a mirror of the repository**:
   ```bash
   git clone --mirror https://github.com/Deepak-Yadav-14/Notify.git
   cd Notify.git
   ```

3. **Remove the file**:
   ```bash
   java -jar ../bfg-1.14.0.jar --delete-files .env
   ```

4. **Clean up and push**:
   ```bash
   git reflog expire --expire=now --all
   git gc --prune=now --aggressive
   git push --force
   ```

### 3. Notify Collaborators

After rewriting history, all collaborators will need to:
```bash
cd their-local-repo
git fetch origin
git reset --hard origin/main  # or their branch name
```

### 4. Prevention (Already Done)

- ✅ `.gitignore` file created in Backend directory to exclude `.env` files
- ✅ `.env.example` template created without sensitive data

## Why This Matters

Even though the `.env` file was deleted in a later commit, it still exists in the repository's history. Anyone with access to the repository can retrieve the sensitive credentials using:
```bash
git show <commit-hash>:Backend/.env
```

This is why history rewriting and credential rotation are both necessary.

## Next Steps After History Rewrite

1. Create a new `.env` file locally (not committed):
   ```bash
   cp Backend/.env.example Backend/.env
   # Edit Backend/.env with your new credentials
   ```

2. Verify `.env` is ignored:
   ```bash
   git status  # Should not show Backend/.env
   ```

3. Update your deployment/CI/CD with new credentials

## Need Help?

If you're unsure about any of these steps, please:
1. Rotate credentials immediately (most important)
2. Seek help from someone experienced with git history rewriting
3. Consider using a secrets management service (e.g., AWS Secrets Manager, HashiCorp Vault)

## Additional Security Recommendations

1. **Use environment-specific secret management**:
   - For production: Use cloud provider secret managers (AWS Secrets Manager, GCP Secret Manager, Azure Key Vault)
   - For development: Use `.env` files (never commit them!)

2. **Enable branch protection rules** on GitHub:
   - Require pull request reviews
   - Enable status checks

3. **Use git hooks** to prevent committing sensitive files:
   - Install pre-commit hooks that scan for secrets

4. **Regular security audits**:
   - Use tools like `gitleaks` or `truffleHog` to scan for exposed secrets
