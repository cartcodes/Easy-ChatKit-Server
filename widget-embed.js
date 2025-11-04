/**
 * Embed Chat Widget
 *
 * Inline chat widget that embeds directly in your page.
 *
 * Usage:
 * 1. Copy this file to widget-embed.js
 * 2. Update CHATKIT_SERVER_URL to your deployed server URL
 * 3. Add container: <div id="chatkit-embed"></div>
 * 4. Add script: <script src="https://your-server.com/widget-embed.js"></script>
 */

(function() {
  // ⚠️ UPDATE THIS URL TO YOUR DEPLOYED SERVER
  const CHATKIT_SERVER_URL = window.CHATKIT_SERVER_URL || 'http://localhost:3000';

  // Load ChatKit from CDN
  const script = document.createElement('script');
  script.src = 'https://cdn.openai.com/chatkit/v1.0.0/chatkit.umd.js';
  script.type = 'module';

  script.onload = async function() {
    try {
      // Get user ID from localStorage or create new one
      let userId = localStorage.getItem('chatkit_user_id');
      if (!userId) {
        userId = `user_${Date.now()}_${Math.random().toString(36).substring(7)}`;
        localStorage.setItem('chatkit_user_id', userId);
      }

      // Create session
      const sessionResponse = await fetch(`${CHATKIT_SERVER_URL}/api/chatkit/session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      });

      if (!sessionResponse.ok) {
        throw new Error('Failed to create session');
      }

      const { client_secret } = await sessionResponse.json();

      // Get config
      const configResponse = await fetch(`${CHATKIT_SERVER_URL}/api/chatkit/config`);
      const config = await configResponse.json();

      // Initialize ChatKit in embed mode
      window.ChatKit.render({
        ...config,
        api: { clientSecret: client_secret },
        target: '#chatkit-embed'
      });
    } catch (error) {
      console.error('ChatKit initialization error:', error);
    }
  };

  document.head.appendChild(script);
})();
