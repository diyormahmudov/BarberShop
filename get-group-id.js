const axios = require('axios');

const BOT_TOKEN = '8743766733:AAEsIS6wOq9PrcH9r99geLko8gN_OZ_hoXM';

console.log('🤖 BURAN Barbershop - Group ID Finder');
console.log('====================================');
console.log('');
console.log('📋 Instructions:');
console.log('1. Add @forBarberBot to your "Buran" Telegram group');
console.log('2. Make the bot an ADMIN in the group');
console.log('3. Send ANY message in the Buran group (e.g., "test")');
console.log('4. This script will automatically detect the group ID');
console.log('');
console.log('⏳ Waiting for messages from the bot...');
console.log('');

async function getUpdates() {
  try {
    const response = await axios.get(
      `https://api.telegram.org/bot${BOT_TOKEN}/getUpdates`,
      { timeout: 10000 }
    );
    
    const updates = response.data.result;
    
    if (updates.length === 0) {
      console.log('⏳ No messages yet. Waiting 3 seconds...');
      setTimeout(getUpdates, 3000);
      return;
    }
    
    console.log(`📨 Received ${updates.length} message(s)`);
    console.log('');
    
    // Find the latest message from a group (not private chat)
    const groupMessages = updates.filter(u => u.message && u.message.chat.type === 'supergroup' || u.message.chat.type === 'group');
    
    if (groupMessages.length > 0) {
      const latestGroup = groupMessages[groupMessages.length - 1];
      const chat = latestGroup.message.chat;
      
      console.log('✅ Found group message!');
      console.log('');
      console.log('📋 Group Information:');
      console.log(`   Name: ${chat.title}`);
      console.log(`   Type: ${chat.type}`);
      console.log(`   Chat ID: ${chat.id}`);
      console.log('');
      console.log('━━━━━━━━━━━━━━━━━━━━');
      console.log('📝 COPY THIS CHAT ID:');
      console.log(`   ${chat.id}`);
      console.log('━━━━━━━━━━━━━━━━━━━━');
      console.log('');
      console.log('✅ Done! Use this Chat ID in your configuration.');
      process.exit(0);
    }
    
    // If no group messages found, show all messages
    console.log('📨 All received messages:');
    updates.forEach((update, index) => {
      if (update.message) {
        const chat = update.message.chat;
        console.log(`${index + 1}. ${chat.type} - ${chat.title || chat.first_name || 'Unknown'} (ID: ${chat.id})`);
      }
    });
    
    console.log('');
    console.log('⏳ No group messages found yet. Waiting 3 seconds...');
    setTimeout(getUpdates, 3000);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.response) {
      console.error('   Status:', error.response.status);
      console.error('   Data:', error.response.data);
    }
    console.log('🔄 Retrying in 3 seconds...');
    setTimeout(getUpdates, 3000);
  }
}

getUpdates();
