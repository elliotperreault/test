const fs = require('fs');
let databaseURL = "";

const setDatabase = (URL) => {
    databaseURL = URL
}

// Get the entire database
const getDatabase = () => {
    return JSON.parse(fs.readFileSync(databaseURL, 'utf8'));
};

// Get the JWT secret key from the database
const getJWTSecretKey = () => {
    return getDatabase().JWTSecretKey;
};

// Get the list of banned words
const getBannedWord = async () => {
    return await getDatabase().bannedWords;
};

// Add a new banned word
const addBannedWord = async (word) => {
    let database = await getDatabase();
    database.bannedWords.unshift(word);
    fs.writeFileSync(databaseURL, JSON.stringify(database, null, 2), 'utf8');
    console.log(`Added '${word}' to the bannedWords list.`);
};

// Remove a banned word
const removeBannedWord = async (word) => {
    let database = await getDatabase();
    let index = database.bannedWords.indexOf(word);
    if (index !== -1) {
        database.bannedWords.splice(index, 1);
        fs.writeFileSync(databaseURL, JSON.stringify(database, null, 2), 'utf8');
        console.log(`Removed '${word}' from the bannedWords list.`);
    }
};

// Get the character wizard list
const getCharWizard = () => {
    return JSON.parse(fs.readFileSync(databaseURL, 'utf8')).charWizard;
};

const addCharWizard = async (key, value) => {
    let database = await getDatabase()
    database.charWizard = Object.assign({ [key]: value }, database.charWizard)

    fs.writeFileSync(databaseURL, JSON.stringify(database, null, 2), 'utf8');
    console.log(`Added the key: '${key}' to the charwizard list.`);
}

const removeCharWizard = async (key) => {
    let database = await getDatabase()
    delete database.charWizard[key];
    fs.writeFileSync(databaseURL, JSON.stringify(database, null, 2), 'utf8');
    console.log(`Removed the key: '${key}' from the charwizard list.`);
}

// Get the password from the database
const getPassword = () => {
    return JSON.parse(fs.readFileSync(databaseURL, 'utf8')).password;
};

const getToken = async () => {
    return await getDatabase().botToken
}

module.exports = {
    getDatabase,
    getJWTSecretKey,
    getBannedWord,
    addBannedWord,
    removeBannedWord,
    getCharWizard,
    getPassword,
    removeCharWizard,
    addCharWizard,
    getToken,
    setDatabase
};
