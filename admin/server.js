const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const {
    removeCharWizard,
    getJWTSecretKey,
    getBannedWord,
    getCharWizard,
    addBannedWord,
    removeBannedWord,
    getPassword,
    addCharWizard,
    setDatabase
} = require('./utils'); // Import the utility functions
setDatabase("backend/database.json")

const app = express();
const port = 4843;
const JWT_SECRET = getJWTSecretKey();

app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

const authenticateJWT = (req, res, next) => {
    const token = req.cookies.authToken;
    if (!token) return res.redirect('/login');

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.redirect('/login');
        req.user = user;
        next();
    });
};

app.get('/', authenticateJWT, async (req, res) => {
    res.render('index.ejs', {
        bannedWords: await getBannedWord(),
        charWizard: await getCharWizard()
    });
});

app.get('/login', (req, res) => {
    res.render('login.ejs', { incorrect: false });
});

app.post('/login', async (req, res) => {
    const { password } = req.body;

    if (password === getPassword()) {
        const user = { username: 'admin' };
        const token = jwt.sign(user, JWT_SECRET, { expiresIn: '1h' });
        res.cookie('authToken', token, { httpOnly: true, secure: false });

        return res.redirect('/');
    } else {
        res.render('login.ejs', { incorrect: true });
    }
});

app.post('/bannedWord/add', authenticateJWT, async (req, res) => {
    const { word } = req.body;
    await addBannedWord(word);
    res.redirect('/');
});

app.delete('/bannedWord/remove', authenticateJWT, async (req, res) => {
    const { word } = req.body;
    await removeBannedWord(word);
    res.sendStatus(200);
});

app.post('/charWizard/add', authenticateJWT, async (req, res) => {
    const { key, value } = req.body;
    await addCharWizard(key, value);
    res.redirect('/');
})

app.delete('/charWizard/remove', authenticateJWT, async (req, res) => {
    const { key } = req.body;
    await removeCharWizard(key);
    res.sendStatus(200);
})


app.listen(port, () => {
    console.log(`The kingbot admin panel is live on http://localhost:${port}`);
});
