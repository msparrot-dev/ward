module.exports = {
    server: {
        domain: process.env.REPLIT_DEV_DOMAIN || "localhost",
        https: false,
        httpPort: 5000,
    },

    Discord: {
        token: process.env.DISCORD_BOT_TOKEN || "",
        botId: process.env.DISCORD_BOT_ID || "",
        guildId: process.env.DISCORD_GUILD_ID || "",
        verifiedRole: process.env.DISCORD_VERIFIED_ROLE || "",

        removeRole: process.env.DISCORD_REMOVE_ROLE === 'true' || false,
        removeRoleId: process.env.DISCORD_REMOVE_ROLE_ID || "",

        statusType: parseInt(process.env.DISCORD_STATUS_TYPE) || 3,
        statusMsg: process.env.DISCORD_STATUS_MSG || "unverified users!",

        rulesEnabled: process.env.DISCORD_RULES_ENABLED === 'false' ? false : true,
        rules: process.env.DISCORD_RULES || "Type your rules here if rulesEnabled is enabled, ensure to use \n for new lines"
    },

    reCAPTCHA: {
        secretKey: process.env.RECAPTCHA_SECRET_KEY || "",
        publicKey: process.env.RECAPTCHA_PUBLIC_KEY || ""
    }
}
