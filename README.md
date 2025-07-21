# CRM-шаблон (MVP)

Простой SaaS-шаблон CRM для лидогенерации: формы → API → Postgres → Telegram-уведомления.

## Функционал
- Приём лидов через endpoint `POST /leads` (имена, email, телефон, источник)
- Health-check: `GET /health`
- Хранение лидов в Postgres (Prisma ORM)
- CORS для лендинга `ulpan-light.vercel.app`
- Telegram-уведомления о новых лидах

## Предназначение
Этот шаблон легко подключается к любому проекту:
- Задаёте свою Postgres-БД через `DATABASE_URL`
- Разворачиваете на любом PaaS/VPS (Railway, Hetzner, Heroku и т.д.)
- Интегрируете формы на лендинге через `forms.js`

## Быстрый старт

1. Клонирование:
   ```bash
   git clone <repo-url>
   cd crm-mvp
