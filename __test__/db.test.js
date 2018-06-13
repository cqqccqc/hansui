const Datastore = require('nedb');

function getUserHome() {
    return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}
const db = new Datastore({
    autoload: true,
    filename: getUserHome() + '/.electronapp/hansui/evaluate.db'
});

const mockQuestions = {
    type: 'questions',
    questions: [
        {
            "questionID": 1,
            "question": "狐假虎威",
            "isMetaphor": true,
            "options": [
                { "optionID": 1, "content": "(  )的意思是强占别人的住屋或占据别人的位置。", "isCorrect": false },
                { "optionID": 2, "content": "他只是董事长身边的司机，却常(  )地发号施令", "isCorrect": true }
            ]
        },
        {
            "questionID": 2,
            "question": "狐假虎威",
            "isMetaphor": false,
            "options": [
                { "optionID": 1, "content": "(  )的意思是强占别人的住屋或占据别人的位置。", "isCorrect": false },
                { "optionID": 2, "content": "(  )的意思是狐狸借老虎之威吓退百兽。", "isCorrect": true }
            ]
        },
        {
            "questionID": 3,
            "question": "鸠占鹊巢",
            "isMetaphor": true,
            "options": [
                { "optionID": 1, "content": "袁世凯失败，在于动了(  )之念", "isCorrect": true },
                { "optionID": 2, "content": "(  )的意思是狐狸借老虎之威吓退百兽。", "isCorrect": false }
            ]
        },
        {
            "questionID": 4,
            "question": "鸠占鹊巢",
            "isMetaphor": false,
            "options": [
                { "optionID": 1, "content": "(  )的意思是强占别人的住屋或占据别人的位置。", "isCorrect": true },
                { "optionID": 2, "content": "(  )的意思是狐狸借老虎之威吓退百兽。", "isCorrect": false }]
        }
    ]
};

function saveQuestions() {
    return new Promise(function (resolve, reject) {
        // remove all data
        db.remove({ type: 'questions' }, { multi: true }, function (err, numRemoved) {
            db.insert(mockQuestions, function (err, newDoc) {
                if (err) {
                    reject(err);
                } else {
                    resolve(newDoc);
                }
            });
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

test('save questions into db', () => {
    return saveQuestions().then(data => {
        expect(data['questions']).toBeInstanceOf(Array);
    });
});

test('query questions from db', () => {
    return queryQuestions().then(data => {
        console.log(data);
        expect(data).toBeInstanceOf(Array);
    })
});

const mockTester = {
    type: 'tester',
    testerID: Math.random(),
    remark: '',
    answers: [
        {
            questionID: 1,
            answerID: 1,
            startTime: 0,
            endTime: 9999
        },
        {
            questionID: 2,
            answerID: 2,
            startTime: 0,
            endTime: 9999
        },
        {
            questionID: 3,
            answerID: 2,
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

test('save tester into db', () => {
    return saveTester().then(data => {
        expect(data['answers']).toBeInstanceOf(Array);
    });
});

test('query testers from db', () => {
    return queryTesters().then(data => {
        console.log(data);
        expect(data).toBeInstanceOf(Array);
    })
});