// ============================================================
// PASTE YOUR CHATKIT CONFIG FROM OPENAI HERE
// ============================================================
//
// Instructions:
// 1. Go to OpenAI Agent Builder
// 2. Select your workflow
// 3. Click "Deploy" → "ChatKit"
// 4. Copy the TypeScript configuration code
// 5. Paste it below (replace this comment)
//
// Example:
// import type { ChatKitOptions } from "@openai/chatkit";
//
// const options: ChatKitOptions = {
//   theme: { ... },
//   composer: { ... },
//   startScreen: { ... }
// };
//
// Note: Don't worry about the `api` section - the server handles that
// ============================================================

import type { ChatKitOptions } from "@openai/chatkit";

const options: ChatKitOptions = {
  api: {
    // TODO: configure your ChatKit API integration (URL, auth, uploads).
  },
  theme: {
    colorScheme: 'light',
    radius: 'soft',
    density: 'compact',
    color: {
      accent: {
        primary: '#eb0004',
        level: 1
      }
    },
    typography: {
      baseSize: 18,
      fontFamily: 'Lora, serif',
      fontSources: [
        {
          family: 'Lora',
          src: 'https://fonts.gstatic.com/s/lora/v37/0QIvMX1D_JOuMwr7I_FMl_E.woff2',
          weight: 400,
          style: 'normal',
          display: 'swap'
        }
      // ...and 7 more font sources
      ]
    }
  },
  composer: {
    placeholder: 'What do you have to say?',
    attachments: {
      enabled: true,
      maxCount: 5,
      maxSize: 10485760
    },
    tools: [
      {
        id: 'search_docs',
        label: 'Search docs',
        shortLabel: 'Docs',
        placeholderOverride: 'Search documentation',
        icon: 'notebook',
        pinned: false
      }
      // ...and 1 more tool
    ],
  },
  startScreen: {
    greeting: 'Test',
    prompts: [
      {
        icon: 'circle-question',
        label: 'What is ChatKit?',
        prompt: 'What is ChatKit?'
      }
      // ...and 4 more prompts
    ],
  },
  // Optional fields not shown: locale, initialThread, threadItemActions, header, onClientTool, entities, widgets
};
