# Quick Start: Environment Setup

## For New Developers

1. **Copy the environment template:**
   ```bash
   cp Backend/.env.example Backend/.env
   ```

2. **Edit `Backend/.env` with your credentials:**
   - Get a Google API key from [Google Cloud Console](https://console.cloud.google.com/)
   - Set up a MongoDB database (MongoDB Atlas recommended)
   - Add your credentials to the `.env` file

3. **Verify `.env` is ignored:**
   ```bash
   git status  # Should NOT show Backend/.env
   ```

## Environment Variables Reference

### Required Variables

| Variable         | Description                | Example                                              |
|------------------|----------------------------|------------------------------------------------------|
| `GOOGLE_API_KEY` | Google Gemini AI API key   | `AIzaSy...`                                          |
| `MONGO_DB_URI`   | MongoDB connection string  | `mongodb+srv://user:pass@cluster.mongodb.net/db`     |

## Security Reminders

✅ **DO:**
- Use `.env.example` as a template
- Keep `.env` only on your local machine
- Use different credentials for dev/prod
- Rotate credentials regularly

❌ **DON'T:**
- Commit `.env` files to git
- Share credentials via email/chat
- Use production credentials in development
- Hardcode secrets in source code

## Need Help?

- See `SECURITY_REMOVE_ENV.md` if you accidentally committed secrets
- Check `README.md` for full setup instructions
- Open an issue on GitHub for problems
