const { Telegraf } = require('telegraf'); // Библиотека для работы с Telegram
const express = require('express'); // Для обработки заявок с сайта
const bodyParser = require('body-parser');

// Настройки
const BOT_TOKEN = '7907789929:AAF9RsP5otubH3dO8XcR9Yy4Ggx70pT0an8';
const CHAT_ID = '355312915'; // ID чата, куда будут отправляться заявки

// Инициализация бота
const bot = new Telegraf(BOT_TOKEN);

// Запускаем Express для приёма данных с сайта
const app = express();
app.use(bodyParser.json()); // Для работы с JSON

// Роут для обработки заявок
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

// Запускаем сервер
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
