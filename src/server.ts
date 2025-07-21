import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import fetch from 'node-fetch';

// 1) Загружаем .env
dotenv.config();

// 2) Подготавливаем компоненты
const app = express();
const prisma = new PrismaClient();

// 3) Разрешаем JSON и CORS с лендинга
app.use(express.json());
app.use(cors({
  origin: "https://ulpan-light.vercel.app",
  methods: ["GET","POST","OPTIONS"]
}));

// 4) Простейший «здоровье»-чек
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// 5) Endpoint: создать лид
app.post("/leads", async (req, res) => {
  try {
    const { name, email, phone, lang, client, plan } = req.body;
    const lead = await prisma.lead.create({
      data: {
        firstName: name,
        email,
        phone,
        source: `${client}/${plan}`,
        // если нужно сохранять язык:
        // lang: lang
      }
    });

    // ⬇ Добавляем уведомление в Telegram
if (process.env.TG_TOKEN && process.env.TG_CHAT_ID) {
  await fetch(`https://api.telegram.org/bot${process.env.TG_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: process.env.TG_CHAT_ID,
      text: `💼 Новый лид:\n👤 ${name}\n📧 ${email}\n📞 ${phone}\n🟢 Источник: ${client}/${plan}`,
    }),
  });
}

    return res.status(201).json(lead);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Не удалось создать лид" });
  }
});

// 6) Старт сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 CRM listening on http://localhost:${PORT}`));
