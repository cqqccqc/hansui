// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain } = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow, webContents

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
    });

    // and load the index.html of the app.
    //   mainWindow.loadFile('index.html')
    mainWindow.loadURL('http://localhost:4200/');
    // mainWindow.loadFile('./hansui-app/dist/hansui-app/index.html')

    // 创建窗体时打开控制台
    webContents = mainWindow.webContents
    webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    });

    webContents.on('did-frame-finish-load', function () {

        webContents.executeJavaScript(`
    let basePath = process.cwd();

    window.__bridge = require(basePath + '/bridge.js');
    console.info('--executeJavaScript export Object --> ', window.__bridge);
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

ipcMain.on('excel-message', (event, arg) => {
    console.log(arg) // prints "ping"
    // event.sender.send('asynchronous-reply', 'pong')

})

ipcMain.on('synchronous-message', (event, arg) => {
    console.log(arg) // prints "ping"
    event.returnValue = 'pong'
})