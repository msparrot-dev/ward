# Ward - Discord Verification Bot

## Overview
Ward is a Discord verification bot that uses Google reCAPTCHA v2 to verify users joining a Discord server. When a user joins the server, they receive a verification link that takes them to a web page where they must complete a reCAPTCHA challenge. Upon successful verification, they receive the verified role.

**Current State**: Project imported from GitHub and configured for Replit environment.

## Recent Changes
- **2025-11-14**: Initial GitHub import setup
  - Configured to use environment variables for secrets
  - Updated server to bind to 0.0.0.0:5000 for Replit compatibility
  - Created config.js from config-example.js with environment variable support
  - Added .gitignore for Node.js project
  - Configured workflow and deployment settings

## Project Architecture

### Core Components
1. **Discord Bot** (`index.js`): Main application file that handles:
   - Discord bot initialization and login
   - Slash command registration
   - User role management
   - Web server for verification pages

2. **Web Server** (Express on port 5000):
   - Serves verification pages
   - Handles reCAPTCHA validation
   - Manages verification links

3. **Link Pool** (`pool.js`): In-memory storage for verification links
   - Creates unique verification links
   - Validates link authenticity
   - Auto-expires links after 15 minutes (900000ms)

4. **Event Handlers** (`/events`):
   - `guildMemberAdd.js`: Sends verification DM when user joins
   - `interactionCreate.js`: Handles slash command interactions
   - `onReady.js`: Bot initialization event
   - `slashCreate.js`: Command creation event

5. **Slash Commands** (`/public/slash`):
   - `/verify`: Manual verification command

### Frontend
- **HTML Templates** (`/html`):
  - `verify.html`: Main verification page with reCAPTCHA
  - `valid.html`: Success page after verification
  - `invalidLink.html`: Error page for invalid/expired links
  - `invalidCaptcha.html`: Error page for failed reCAPTCHA

- **Assets** (`/assets`):
  - CSS styling
  - JavaScript for particle effects
  - jQuery library

## Required Configuration

To use this bot, you need to set the following environment secrets:

### Discord Configuration
- `DISCORD_BOT_TOKEN`: Your Discord bot token
- `DISCORD_BOT_ID`: Your Discord bot's client ID
- `DISCORD_GUILD_ID`: The Discord server ID where the bot operates
- `DISCORD_VERIFIED_ROLE`: Role ID to assign upon verification

### reCAPTCHA Configuration
- `RECAPTCHA_SECRET_KEY`: Google reCAPTCHA v2 secret key
- `RECAPTCHA_PUBLIC_KEY`: Google reCAPTCHA v2 site key

### Optional Configuration
- `DISCORD_REMOVE_ROLE`: Set to 'true' to remove a role upon verification
- `DISCORD_REMOVE_ROLE_ID`: Role ID to remove (if DISCORD_REMOVE_ROLE is true)
- `DISCORD_STATUS_TYPE`: Bot status activity type (default: 3 for WATCHING)
- `DISCORD_STATUS_MSG`: Bot status message (default: "unverified users!")
- `DISCORD_RULES_ENABLED`: Set to 'false' to disable rules (default: true)
- `DISCORD_RULES`: Custom rules text to display

## Setup Instructions

1. **Discord Bot Setup**:
   - Create a Discord application at https://discord.com/developers/applications
   - Enable the following intents:
     - Server Members Intent
     - Message Content Intent
   - Copy your bot token and client ID
   - Invite the bot to your server with appropriate permissions

2. **reCAPTCHA Setup**:
   - Register your site at https://www.google.com/recaptcha/admin/create
   - Choose reCAPTCHA v2 "I'm not a robot"
   - For Replit, add your Replit domain to the allowed domains
   - Copy your site key and secret key

3. **Configure Secrets**:
   - Add all required environment variables in the Replit Secrets tool
   - The bot will read these automatically from environment variables

4. **Deploy**:
   - The bot runs automatically via the configured workflow
   - Web server listens on port 5000 for verification requests
   - Uses VM deployment for always-on functionality

## Technical Details

- **Framework**: Discord.js v14
- **Web Server**: Express.js
- **Template Engine**: EJS
- **Port**: 5000 (frontend/webview)
- **Host**: 0.0.0.0 (Replit compatible)
- **Storage**: In-memory link pool (resets on restart)
- **Link Expiration**: 15 minutes

## Notes

- This bot requires Discord intents to be enabled in the Discord Developer Portal
- Verification links expire after 15 minutes
- The link pool is stored in memory and will reset if the bot restarts
- For production use with 100+ servers, bot verification is required from Discord
