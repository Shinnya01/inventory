# Laravel 12 + React (Inertia) — Project Setup

This guide explains how to install and run the project after cloning it. It covers both **Laravel Herd** and local server setups.

---

## ✅ Requirements

* PHP 8+ (Herd handles this automatically)
* Composer
* Node.js + NPM
* MySQL / MariaDB
* Laravel Herd (optional, recommended for Windows/macOS)

---

## ✅ 1. Clone the Repository

```bash
git clone https://github.com/username/project.git
cd project
```

---

## ✅ 2. Install PHP Dependencies

```bash
composer install
```

---

## ✅ 3. Copy Environment File

```bash
cp .env.example .env
```

---

## ✅ 4. Generate Application Key

```bash
php artisan key:generate
```

---

## ✅ 5. Configure Environment

Update `.env` with your database credentials:

```
DB_DATABASE=your_db
DB_USERNAME=root
DB_PASSWORD=
```

---

## ✅ 6. Run Migrations

```bash
php artisan migrate --seed
```

Or without seed:

```bash
php artisan migrate
```

---

## ✅ 7. Install Node Dependencies

```bash
npm install
```

---

## ✅ 8. Run the Project

### Using Laravel Herd

```bash
npm run dev
```

* URL: `http://inventory.test`
* Herd handles PHP server and Vite automatically.

### Without Herd (Local Server)

```bash
php artisan serve
npm run dev
```

* Backend URL: `http://localhost:8000`
* Frontend Vite URL: `http://localhost:5173`

Update `.env` accordingly:

# HERD
```
APP_URL=http://inventory.test
```

# ARTISAN SERVE
```
APP_URL=http://localhost:8000
```


And Vite config (`vite.config.js`):

```js
import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react({
            babel: {
                plugins: ['babel-plugin-react-compiler'],
            },
        }),
        tailwindcss(),
        wayfinder({
            formVariants: true,
        }),
    ],
    server: {
        # HERD
        host: 'inventory.test'
        # ARTISAN SERVE
        host: 'localhost:8000'
    },
    esbuild: {
        jsx: 'automatic',
    },
});

```

---

## 📦 Build for Production

```bash
npm run build
```

---

## 🛠 Additional Commands

```bash
php artisan optimize:clear
```

---

## ✔ Done!

The project should now be running, either via Herd (`inventory.test`) or via local server (`localhost:8000` + Vite).
