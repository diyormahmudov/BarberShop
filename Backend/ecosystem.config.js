module.exports = {
  apps: [{
    name: 'barber-backend',
    script: './dist/src/main.js',
    env: {
      NODE_ENV: 'production',
      DATABASE_URL: 'file:/var/www/barber/Backend/dev.db',
      PORT: 3001,
      BOT_TOKEN: '8743766733:AAEsIS6wOq9PrcH9r99geLko8gN_OZ_hoXM',
      CHAT_ID: '-1003888643277'
    }
  }]
};
