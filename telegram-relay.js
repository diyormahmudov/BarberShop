const axios = require('axios');

const NTFY_TOPIC = 'barber-booking';
const BOT_TOKEN = '8743766733:AAEsIS6wOq9PrcH9r99geLko8gN_OZ_hoXM';
const CHAT_ID = '-1003888643277';

console.log('🤖 BURAN Barbershop - Telegram Relay Service');
console.log('============================================');
console.log('');
console.log(`📡 Listening to ntfy.sh topic: ${NTFY_TOPIC}`);
console.log(`📱 Forwarding to Telegram chat: ${CHAT_ID}`);
console.log('');
console.log('⏳ Waiting for booking notifications...');
console.log('');

async function listenToNtfy() {
  try {
    // Use ntfy.sh's SSE (Server-Sent Events) to listen for messages
    const response = await axios.get(`https://ntfy.sh/${NTFY_TOPIC}/sse`, {
      responseType: 'stream',
      timeout: 0 // No timeout - keep connection open
    });

    response.data.on('data', (chunk) => {
      const lines = chunk.toString().split('\n');
      
      for (const line of lines) {
        if (line.startsWith('data:')) {
          const data = line.substring(5).trim();
          
          if (data && data !== '[empty]') {
            try {
              const message = JSON.parse(data);
              
              if (message.message) {
                console.log('📨 Received booking notification from server');
                console.log('📝 Message:', message.message);
                
                // Forward to Telegram
                sendToTelegram(message.message);
              }
            } catch (parseError) {
              // If not JSON, treat as plain text
              if (data) {
                console.log('📨 Received plain text notification');
                console.log('📝 Message:', data);
                sendToTelegram(data);
              }
            }
          }
        }
      }
    });

    response.data.on('error', (error) => {
      console.error('❌ Stream error:', error.message);
      console.log('🔄 Reconnecting in 5 seconds...');
      setTimeout(listenToNtfy, 5000);
    });

  } catch (error) {
    console.error('❌ Connection error:', error.message);
    console.log('🔄 Reconnecting in 5 seconds...');
    setTimeout(listenToNtfy, 5000);
  }
}

async function sendToTelegram(message) {
  try {
    console.log('📤 Forwarding to Telegram...');
    
    const response = await axios.post(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        chat_id: CHAT_ID,
        text: message,
      },
      { timeout: 10000 }
    );
    
    console.log('✅ Successfully sent to Telegram');
    console.log('📊 Telegram response:', response.data.ok ? 'OK' : 'FAILED');
    console.log('');
  } catch (error) {
    console.error('❌ Failed to send to Telegram:', error.message);
    if (error.response) {
      console.error('   Status:', error.response.status);
      console.error('   Data:', error.response.data);
    }
    console.log('');
  }
}

// Start listening
listenToNtfy();

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('');
  console.log('👋 Shutting down relay service...');
  process.exit(0);
});
