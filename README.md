# ChatKit Embed Server

A simple server that makes it easy to embed OpenAI's ChatKit on any website. Handles authentication and session management so you can copy-paste chat widgets anywhere.

## How It Works

This server sits between your website and OpenAI's ChatKit API. It:

- **Keeps your API key secure** - Never exposed to the browser
- **Creates sessions for users** - Each visitor gets a unique session stored in their browser's localStorage (no database needed)
- **Provides simple embed code** - Copy and paste into any website

Sessions are browser-based and persist across page reloads. No backend database required.

## Quick Setup

1. **Install dependencies**
```bash
npm install
```

2. **Configure environment**
```bash
cp .env.example .env
# Edit .env with your OpenAI credentials
```

3. **Add your ChatKit config**
- Open `config.ts`
- Paste your ChatKitOptions from OpenAI Agent Builder

4. **Run locally**
```bash
npm start
```

Visit `http://localhost:3000` to customize and generate embed code.

## Deploy to Production

Deploy to any Node.js hosting (Vercel, Railway, Fly.io, etc.)

Set these environment variables:
- `OPENAI_API_KEY` - Your OpenAI API key
- `CHATKIT_WORKFLOW_ID` - From OpenAI Agent Builder
- `DOMAIN_KEY` - From OpenAI domain allowlist
- `BASE_URL` - Your deployed server URL
- `NODE_ENV=production` - Hides the customization UI (keeps it local only)

After deploying, embed the generated code on any website - the server handles the rest.

## Local vs Production

**Local (Development):**
- Customization UI available at http://localhost:3000
- Generate corner button or embed code with live preview

**Production (Deployed):**
- UI is hidden (403 error)
- Only API endpoints are accessible
- Your embed codes call these endpoints to create sessions

## Security

Your API keys stay on the server. Browsers only receive temporary session credentials. The server uses OpenAI's recommended security pattern for ChatKit deployments.
