require('dotenv').config();
const { Telegraf } = require('telegraf'); // Библиотека для работы с Telegram
const express = require('express'); // Для обработки заявок с сайта
const bodyParser = require('body-parser');

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;
const PORT = process.env.PORT || 3000;

const bot = new Telegraf(BOT_TOKEN);

const app = express();
app.use(bodyParser.json());

app.post('/send-application', async (req, res) => {
    try {
        const { name, phone, message } = req.body; // Получаем данные заявки
        const text = `Новая заявка с сайта:\n\nИмя: ${name}\nТелефон: ${phone}\nСообщение: ${message}`;

        // Отправка сообщения в Telegram
        await bot.telegram.sendMessage(CHAT_ID, text);
        res.status(200).send({ success: true, message: 'Заявка отправлена!' });
    } catch (error) {
        console.error('Ошибка отправки:', error);
        res.status(500).send({ success: false, message: 'Ошибка сервера.' });
    }
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
