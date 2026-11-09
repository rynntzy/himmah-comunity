import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import config, { validateConfig } from './config/env.js';

// Route handlers
import authRoutes from './routes/auth.js';
import registrationRoutes from './routes/registrations.js';
import adminRoutes from './routes/admin.js';
import settingsRoutes from './routes/settings.js';

// Validasi env vars sebelum server start
if (process.env.NODE_ENV === 'production') {
  validateConfig();
}

const app = express();

// Security Headers via Helmet
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));

// CORS Configuration
const allowedOrigins = [
  config.frontendUrl,
  'http://localhost:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174',
];

app.use(cors({
  origin: (origin, callback) => {
    // Ijinkan request tanpa origin (seperti curl, mobile app, postman) atau yang ada di whitelist
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, true); // Dev friendly
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Body parser dengan batas 10MB untuk menangani upload gambar custom (base64) pada CMS
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate Limiting untuk mencegah brute force dan spam submit
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 300, // Maks 300 request per 15 menit
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Terlalu banyak permintaan dari IP ini, silakan coba lagi beberapa saat kemudian.',
  },
});

const registerLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 menit
  max: 15, // Maks 15 submit pendaftaran per IP dalam 10 menit
  message: {
    success: false,
    message: 'Batas pendaftaran tercapai untuk sesi ini. Silakan coba lagi nanti.',
  },
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 menit
  max: 10, // Maks 10 percobaan login
  message: {
    success: false,
    message: 'Terlalu banyak percobaan login yang gagal. Silakan coba 15 menit lagi.',
  },
});

app.use('/api/', apiLimiter);
app.use('/api/registrations', registerLimiter);
app.use('/api/auth/login', authLimiter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Himmah NWDI Kom. Teknik API',
    timestamp: new Date().toISOString(),
  });
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/registrations', registrationRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/settings', settingsRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Endpoint ${req.method} ${req.originalUrl} tidak ditemukan.`,
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Terjadi kesalahan internal pada server.',
  });
});

// Start Server (Hanya dijalankan pada environment lokal / VPS, tidak pada Vercel Serverless)
if (!process.env.VERCEL) {
  app.listen(config.port, () => {
    console.log(`\n======================================================`);
    console.log(`🚀 Himmah NWDI Kom. Teknik API Server Berjalan!`);
    console.log(`📍 URL: http://localhost:${config.port}`);
    console.log(`🏥 Health Check: http://localhost:${config.port}/api/health`);
    console.log(`🛡️  Environment: ${config.nodeEnv}`);
    console.log(`======================================================\n`);
  });
}

export default app;
