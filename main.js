// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron')
const fs = require('fs');

const Datastore = require('nedb');

function getUserHome() {
    return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}
const db = new Datastore({
    autoload: true,
    filename: getUserHome() + '/.electronapp/hansui/evaluate.db'
});

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow, webContents

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    // and load the index.html of the app.
    //   mainWindow.loadFile('index.html')
    mainWindow.loadURL('http://localhost:4200/');
    // mainWindow.loadFile('./hansui-app/dist/hansui-app/index.html')

    // open dev tools
    webContents = mainWindow.webContents
    // webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    });

    webContents.on('did-frame-finish-load', function () {

        webContents.executeJavaScript(`
        var fs = require('fs');
        var { ipcRenderer } = require('electron');
        var nativeInterface = { fs, ipcRenderer }
        if(window.__bridge){
            window.__bridge.emit('electron-ready', nativeInterface);
            console.info('--executeJavaScript export Object --> ', window.__bridge);
        } else {
            console.info('--executeJavaScript export Object failed');
        }
    `);
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// hanle message to save questions into db
ipcMain.on('save-questions-message', (event, arg) => {
    // delete current questions
    removeAllQuestions().then(() => {
        // insert new questions
        var questionEntity = {
            type: 'questions',
            questions: arg
        };
        return saveQuestions(questionEntity);
    }).then(() => {
        event.sender.send('save-questions-message-reply', true);
    }).catch(e => {
        event.sender.send('save-questions-message-reply', false);
    })
});

function removeAllQuestions() {
    return new Promise(function (resolve, reject) {
        db.remove({ type: 'questions' }, { multi: true }, function (err, numRemoved) {
            if (err) {
                reject(err);
            } else {
                resolve(numRemoved);
            }
        });
    });
}
function saveQuestions(questions) {
    return new Promise(function (resolve, reject) {
        db.insert(questions, function (err, newDoc) {
            if (err) {
                reject(err);
            } else {
                resolve(newDoc);
            }
        });
    });
}

ipcMain.on('query-questions-message', (event, arg) => {
    queryQuestions().then((docs) => {
        if (docs.length > 0) {
            event.sender.send('query-questions-message-reply', docs[0]);
        } else {
            event.sender.send('query-questions-message-reply', []);
        }
    }).catch((e) => {
        event.sender.send('query-questions-message-reply', []);
    })
});

function queryQuestions() {
    return new Promise(function (resolve, reject) {
        db.find({ type: 'questions' }, function (err, docs) {
            if (err) {
                reject(err);
            } else {
                resolve(docs);
            }
        });
    });
}

ipcMain.on('save-tester-message', (event, arg) => {
    const tester = arg;
    test.type = 'tester';
    saveTester(tester).then((newDoc) => {
        console.log(newDoc);
        event.sender.send('save-tester-message-reply', true);
    }).catch(e => {
        event.sender.send('save-tester-message-reply', false);
    })
});

function saveTester(tester) {
    return new Promise(function (resolve, reject) {
        db.insert(tester, function (err, newDoc) {
            if (err) {
                reject(err);
            } else {
                resolve(newDoc);
            }
        });
    });
}

ipcMain.on('query-testers-message', (event, arg) => {
    queryTesters().then((docs) => {
        console.log(docs);
        event.sender.send('query-testers-message-reply', docs);
    }).catch(e => {
        event.sender.send('query-testers-message-reply', []);
    })
});

function queryTesters() {
    return new Promise(function (resolve, reject) {
        db.find({ type: 'tester' }, function (err, docs) {
            if (err) {
                reject(err);
            } else {
                console.log(docs)
                resolve(docs);
            }
        });
    });
}
