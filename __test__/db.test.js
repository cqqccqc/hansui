const Datastore = require('nedb');

function getUserHome() {
    return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}
const db = new Datastore({
    autoload: true,
    filename: getUserHome() + '/.electronapp/hansui/evaluate.db'
});

function removeAllData() {
    // remove all data
    return new Promise(function (resolve, reject) {
        db.remove({}, { multi: true }, function (err, numRemoved) {
            if (err) {
                reject(err);
            } else {
                resolve(numRemoved);
            }
        });
    })
}


const mockQuestions = {
    type: 'questions',
    questions: [
        {
            "questionIndex": 1,
            "question": "狐假虎威",
            "isMetaphor": true,
            "options": [
                { "optionIndex": 1, "content": "(  )的意思是强占别人的住屋或占据别人的位置。", "isCorrect": false },
                { "optionIndex": 2, "content": "他只是董事长身边的司机，却常(  )地发号施令", "isCorrect": true }
            ]
        },
        {
            "questionIndex": 2,
            "question": "狐假虎威",
            "isMetaphor": false,
            "options": [
                { "optionIndex": 1, "content": "(  )的意思是强占别人的住屋或占据别人的位置。", "isCorrect": false },
                { "optionIndex": 2, "content": "(  )的意思是狐狸借老虎之威吓退百兽。", "isCorrect": true }
            ]
        },
        {
            "questionIndex": 3,
            "question": "鸠占鹊巢",
            "isMetaphor": true,
            "options": [
                { "optionIndex": 1, "content": "袁世凯失败，在于动了(  )之念", "isCorrect": true },
                { "optionIndex": 2, "content": "(  )的意思是狐狸借老虎之威吓退百兽。", "isCorrect": false }
            ]
        },
        {
            "questionIndex": 4,
            "question": "鸠占鹊巢",
            "isMetaphor": false,
            "options": [
                { "optionIndex": 1, "content": "(  )的意思是强占别人的住屋或占据别人的位置。", "isCorrect": true },
                { "optionIndex": 2, "content": "(  )的意思是狐狸借老虎之威吓退百兽。", "isCorrect": false }]
        }
    ]
};


function saveQuestions() {
    return new Promise(function (resolve, reject) {

        db.insert(mockQuestions, function (err, newDoc) {
            if (err) {
                reject(err);
            } else {
                resolve(newDoc);
            }
        });
    });
}

function queryQuestions() {
    return new Promise(function (resolve, reject) {
        db.find({}, function (err, docs) {
            if (err) {
                reject(err);
            } else {
                resolve(docs);
            }
        });
    });
}

const mockTester = {
    type: 'tester',
    testerIndex: 1,
    name: 'testerName',
    gender: 'MALE',
    age: 20,
    startTime: 0,
    endTime: 0,
    remark: '',
    interval: 60, // 每题间隔时间
    answers: [
        {
            questionIndex: 1,
            optionIndex: null,
            startTime: 0,
            endTime: 9999
        },
        {
            questionIndex: 2,
            optionIndex: 2,
            startTime: 0,
            endTime: 9999
        },
        {
            questionIndex: 3,
            optionIndex: 2,
            startTime: 0,
            endTime: 9999
        },
    ]
}

function saveTester() {
    return new Promise(function (resolve, reject) {
        db.insert(mockTester, function (err, newDoc) {
            if (err) {
                reject(err);
            } else {
                resolve(newDoc);
            }
        });
    });
}

function queryTesters() {
    return new Promise(function (resolve, reject) {
        db.find({ type: 'tester' }, function (err, docs) {
            if (err) {
                reject(err);
            } else {
                resolve(docs);
            }
        });
    });
}

function queryAll() {
    return new Promise(function (resolve, reject) {
        db.find({}, function (err, docs) {
            if (err) {
                reject(err);
            } else {
                resolve(docs);
            }
        });
    });
}

// test('remove all data', () => {
//     return removeAllData().then(numRemoved => {
//         expect(numRemoved).toBeGreaterThanOrEqual(0);
//     });
// });

// test('save questions into db', () => {
//     return saveQuestions().then(data => {
//         expect(data['questions']).toBeInstanceOf(Array);
//     });
// });

// test('query questions from db', () => {
//     return queryQuestions().then(data => {
//         console.log(data);
//         expect(data).toBeInstanceOf(Array);
//     })
// });

// test('save tester into db', () => {
//     return saveTester().then(data => {
//         expect(data['answers']).toBeInstanceOf(Array);
//     });
// });

// test('query testers from db', () => {
//     return queryTesters().then(data => {
//         console.log(data);
//         expect(data).toBeInstanceOf(Array);
//     })
// });

test('query all from db', () => {
    return queryAll().then(data => {
        console.log(data);
        expect(data).toBeInstanceOf(Array);
    })
})