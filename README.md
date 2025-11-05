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
- Paste your ChatKit code into that file from [playground](https://chatkit.studio/playground)

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

### Domain Protection

ChatKit uses **domain allowlisting** to control where your chat widget can be embedded:

1. **Register your domains** in the OpenAI Platform (ChatKit settings)
2. **Add your DOMAIN_KEY** to your server's environment variables
3. **ChatKit enforces** that the widget only works on approved domains

**Important:** The `DOMAIN_KEY` is a public key that you include in your server configuration. It's tied to your domain allowlist on OpenAI's side. When a browser loads the ChatKit widget, OpenAI validates that the request comes from an allowed domain. This prevents unauthorized websites from using your ChatKit deployment.

Without a valid `DOMAIN_KEY` for the requesting domain, the widget will not load - even if someone copies your embed code.

### API Key Protection

Your `OPENAI_API_KEY` never leaves the server:

- **Server-side only** - API key is used exclusively in server.ts to create sessions
- **Not in browser** - Never sent to clients or embedded in JavaScript
- **Environment variable** - Stored securely in .env (excluded from git)

### Session Flow (OpenAI's Recommended Pattern)

1. User visits your website with the embedded ChatKit widget
2. Browser requests a session from your server (`/api/chatkit/session`)
3. Server uses your API key to create a temporary session with OpenAI
4. Server returns a short-lived `client_secret` to the browser
5. ChatKit widget uses this temporary credential to connect

**What the browser receives:**
- `client_secret` - Temporary session credential (expires)
- Widget configuration - Theme, prompts, settings (no API keys)

**What stays private:**
- Your OpenAI API key
- Your ChatKit workflow ID
- Internal server configuration

This architecture ensures your credentials remain secure while allowing public-facing chat widgets. The domain key adds an additional layer of protection by restricting which websites can even request sessions from your server.
