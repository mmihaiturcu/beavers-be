import app from '@/config/App.js';
import { BACKEND_URL, SERVER_PORT } from '@/utils/constants.js';
import { readFileSync } from 'fs';
import https from 'https';
import { static as expressStatic } from 'express';
import { join } from 'path';
import { readdirSync } from 'fs';
import { randomInt } from 'crypto';

app.expressApp.use('/static', expressStatic(join('src', 'static')));

const imagesPaths = readdirSync(join('src', 'static', 'assets'));
const noImages = imagesPaths.length;

app.expressApp.use('/randomImage', (req, res, next) => {
    res.status(200).json(`${BACKEND_URL}/static/assets/${imagesPaths[randomInt(0, noImages)]}`);
});

const httpsServer = https.createServer(
    {
        key: readFileSync('src/config/private.pem', 'utf-8'),
        cert: readFileSync('src/config/certificate.pem', 'utf-8'),
    },
    app.expressApp
);

httpsServer.listen(SERVER_PORT);

console.log(`Server listening on port ${SERVER_PORT}...`);
