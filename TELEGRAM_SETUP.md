# BURAN Barbershop - Telegram Bildirishnoma Tizimi

## Umumiy Ma'lumot

Telegram bildirishnoma tizimi to'liq ishlayapti. Mijoz bron qilganda, bildirishnomalar avtomatik ravishda **Buran** Telegram guruhiga yuboriladi.

## Arxitektura

```
Mijoz Broni → Server (REG.RU) → ntfy.sh → Relay Xizmati (Sizning Mac kompyuteringiz) → Buran Telegram Guruh
```

### Nima Uchun Bu Arxitektura?

**REG.RU VPS Telegram API ga to'g'ridan-to'g'ri kirishni bloklayapti** - Hosting provayderi (REG.RU) serverning Telegram API serverlari bilan HTTPS ulanishini cheklaydi. Bu serverdan curl bilan test orqali tasdiqlangan.

**Yechim:** Sizning Mac kompyuteringizda (Rossiyada) ishlaydigan relay xizmatidan foydalaning, u Telegram API ga kirish imkoniga ega. Server bildirishnomalarni ntfy.sh (pub/sub xizmati) ga yuboradi, va sizning relay xizmati ularni qabul qilib Telegramga yuboradi.

## Komponentlar

### 1. Server (REG.RU - 89.108.71.89)
- **Backend:** NestJS ilovasi
- **Ma'lumotlar bazasi:** SQLite
- **Bildirishnoma xizmati:** Bron bildirishnomalarini ntfy.sh `barber-booking` mavzusiga yuboradi
- **Vaqt zonasi:** Asia/Bishkek (Qirg'iziston vaqti)
- **Bildirishnoma tili:** Rus tili

### 2. ntfy.sh
- **Maqsad:** Pub/sub bildirishnoma xizmati
- **Mavzu:** `barber-booking`
- **Rol:** Server va relay xizmati o'rtasida ko'prik

### 3. Relay Xizmati (Sizning Mac kompyuteringiz)
- **Texnologiya:** Node.js + PM2
- **Maqsad:** ntfy.sh ni tinglaydi va Telegram API ga yuboradi
- **Holat:** PM2 orqali avtomatik ishlamoqda
- **Avtomatik ishga tushirish:** launchd bilan sozlangan

## Sozlamalar

### Server Sozlamalari

**Fayl:** `/Users/a111/Desktop/BarberFull/Backend/ecosystem.config.js`
```javascript
module.exports = {
  apps: [{
    name: 'barber-backend',
    script: './dist/src/main.js',
    env: {
      NODE_ENV: 'production',
      DATABASE_URL: 'file:/var/www/barber/Backend/dev.db',
      PORT: 3001,
      BOT_TOKEN: '8743766733:AAEsIS6wOq9PrcH9r99geLko8gN_OZ_hoXM',
      CHAT_ID: '-1003888643277'  // Buran guruh ID
    }
  }]
};
```

### Relay Xizmati Sozlamalari

**Fayl:** `/Users/a111/Desktop/BarberFull/telegram-relay.js`
```javascript
const NTFY_TOPIC = 'barber-booking';
const BOT_TOKEN = '8743766733:AAEsIS6wOq9PrcH9r99geLko8gN_OZ_hoXM';
const CHAT_ID = '-1003888643277';  // Buran guruh ID
```

**PM2 Sozlamalari:** `/Users/a111/Desktop/BarberFull/telegram-relay-pm2.json`
```json
{
  "apps": [{
    "name": "telegram-relay",
    "script": "./telegram-relay.js",
    "interpreter": "/Users/a111/.nvm/versions/node/v24.14.1/bin/node",
    "cwd": "/Users/a111/Desktop/BarberFull",
    "autorestart": true
  }]
}
```

## Boshqaruv Buyruqlari

### Relay Xizmati (Sizning Mac kompyuteringiz)

**Holatni tekshirish:**
```bash
npx pm2 status
```

**Loglarni ko'rish:**
```bash
npx pm2 logs telegram-relay
```

**Xizmatni qayta ishga tushirish:**
```bash
npx pm2 restart telegram-relay
```

**Xizmatni to'xtatish:**
```bash
npx pm2 stop telegram-relay
```

**Xizmatni ishga tushirish:**
```bash
npx pm2 start telegram-relay-pm2.json
```

**Sozlamalarni saqlash:**
```bash
npx pm2 save
```

### Server (REG.RU)

**Backend holatini tekshirish:**
```bash
ssh root@89.108.71.89 "npx pm2 status"
```

**Backend loglarini ko'rish:**
```bash
ssh root@89.108.71.89 "npx pm2 logs barber-backend"
```

**Backendni qayta ishga tushirish:**
```bash
ssh root@89.108.71.89 "cd /var/www/barber/Backend && npx pm2 restart barber-backend --update-env"
```

## Bildirishnoma Format

Bildirishnomalar rus tilida quyidagi formatda yuboriladi:

```
🎉 НОВАЯ ЗАПИСЬ

👤 Клиент: [mijoz nomi]
📞 Телефон: [telefon raqami]
💈 Мастер: [sartarosh nomi]

✂️ Услуги:
[xizmatlar ro'yxati]

🕐 Время: [sana va vaqt Qirg'iziston vaqt zonasida]

━━━━━━━━━━━━━━━━━━━━
BURAN Barbershop
```

## Testlash

### Bron Bildirishnomasini Testlash

Curl orqali test bron yaratish:
```bash
curl -X POST https://buranbarber.shop/api/bot-form \
  -H "Content-Type: application/json" \
  -d '{
    "barberName":"Мустафа",
    "clientName":"Test Client",
    "phoneNumber":"+996700000000",
    "time":"2026-07-18T18:00:00",
    "service":"Мужская стрижка"
  }'
```

### Relay Xizmatini Tekshirish

Xabar qabul qilingan va yuborilganligini tasdiqlash uchun relay loglarini tekshiring:
```bash
npx pm2 logs telegram-relay --lines 20
```

Kutilayotgan natija:
```
📨 Received booking notification from server
📝 Message: 🎉 НОВАЯ ЗАПИСЬ
...
📤 Forwarding to Telegram...
✅ Successfully sent to Telegram
📊 Telegram response: OK
```

## Xatolarni Tuzatish

### Relay Xizmati Ishlamayapti

**Alomat:** Telegram guruhiga bildirishnomalar kelmayapti

**Yechim:**
```bash
npx pm2 start telegram-relay-pm2.json
npx pm2 save
```

### Relay Xizmati Ishdan Chiqadi

**Alomat:** Xizmat kutilmaganda to'xtayapti

**Yechim:**
```bash
npx pm2 logs telegram-relay --lines 50
# Xatolik loglarini tekshiring
npx pm2 restart telegram-relay
```

### Server ntfy.sh ga Yubormayapti

**Alomat:** Relay loglarida xabarlar yo'q

**Yechim:**
```bash
ssh root@89.108.71.89 "npx pm2 logs barber-backend --lines 50"
# ntfy.sh xatoliklarini tekshiring
```

### Telegram API O'zgarishlari

**Alomat:** Telegram javobi OK emas

**Yechim:**
- BOT_TOKEN hali amal qilayotganligini tekshiring
- CHAT_ID to'g'ri ekanligini tekshiring
- Bot hali Buran guruhida admin ekanligini tekshiring

## Muhim Eslatmalar

1. **Relay xizmati sizning Mac kompyuteringizda ishlashi kerak** - Tarmoq cheklovlari tufayli u REG.RU serverida ishlamaydi
2. **Mac kompyuteringizni ishlatib turing** - Relay xizmati bildirishnomalarni yuborish uchun ishlashi kerak
3. **PM2 avtomatik qayta ishga tushirish** - Agar relay xizmati ishdan chiqsa, PM2 uni avtomatik qayta ishga tushiradi
4. **Avtomatik ishga tushirish sozlangan** - Relay xizmati Mac kompyuteringiz ishga tushganda avtomatik ishga tushadi
5. **Vaqt zonasi** - Barcha bron vaqtlari Qirg'iziston vaqtida (Asia/Bishkek) ko'rsatiladi
6. **Til** - Bildirishnomalar rus tilida

## O'zgartirilgan Fayllar

1. `/Users/a111/Desktop/BarberFull/Backend/ecosystem.config.js` - CHAT_ID yangilandi
2. `/Users/a111/Desktop/BarberFull/Backend/src/bot-form/bot-form.service.ts` - Vaqt zonasi Asia/Bishkek ga o'zgartirildi, bildirishnoma rus tilida qayta dizayn qilindi
3. `/Users/a111/Desktop/BarberFull/Backend/src/bot-form/telegram.service.ts` - Faqat ntfy.sh ga yuborish uchun soddalashtirildi
4. `/Users/a111/Desktop/BarberFull/telegram-relay.js` - Relay xizmat skripti
5. `/Users/a111/Desktop/BarberFull/telegram-relay-pm2.json` - PM2 sozlamalari

## Aloqa

Telegram bildirishnoma tizimi haqida savollar yoki muammolar bo'lsa, bu hujjatga murojaat qiling yoki batafsil xatolik ma'lumotlari uchun PM2 loglarini tekshiring.
