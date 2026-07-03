import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class TelegramService {
  async sendMessage(message: string) {
    console.log('📤 Sending notification to ntfy.sh topic for client relay...');
    console.log('📝 Message:', message);

    // Send to ntfy.sh topic - client script will pick this up and send to Telegram
    try {
      const topic = process.env.NTFY_TOPIC || 'barber-booking';
      const url = `https://ntfy.sh/${topic}`;
      
      await axios.post(url, message, {
        headers: {
          'Title': 'New Booking - BURAN Barbershop',
          'Priority': 'high',
          'Tags': 'barber,booking',
        },
        timeout: 10000
      });
      
      console.log('✅ Message sent to ntfy.sh topic:', topic);
      console.log('ℹ️  Client relay script will forward this to Telegram');
      return;
    } catch (error: any) {
      console.error('❌ ntfy.sh failed:', error.message);
      if (error.response) {
        console.error('   Response status:', error.response.status);
        console.error('   Response data:', error.response.data);
      }
    }

    console.error('❌ Failed to send notification');
  }
}
