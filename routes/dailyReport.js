let express = require('express');
let router = express.Router();
let dailyReport = require('../models/dailyReport');
let json2xls = require('json2xls');
let fs = require('fs');
let db = require('../dbconn');
const AWS = require('aws-sdk');

const ses = new AWS.SES({
    region: 'us-east-1',
    accessKeyId: 'AKIAIHBHSKJRCW5BA4JQ',
    secretAccessKey: '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'
});
let mailcomposer = require('mailcomposer');


// Daily report
router.get('/dailyreports', function (req, res) {
    dailyReport.getAllReports( function (err, rows) {
        if (!err) {
            let response = [];
            res.setHeader('Content-Type', 'application/json');
            if (rows.length !== 0) {
                response.push({'status': 'success', 'data': rows})
                res.status(200).send(response);
            } else {
                response.push({'status': 'failure', 'message': 'No Result Found'});//
                res.status(200).send(response);
            }
        } else {
            res.status(400).send(err);
        }
    });
});

// Daily report
router.post('/single', function (req, res) {
    if (typeof req.body.id !== 'undefined' &&
        typeof req.body.dateVal !== 'undefined') {
        let callingBy = "user";
        dailyReport.getDailyReportById( req.body.id, req.body.dateVal,null, callingBy, function (err, rows) {
            if (!err) {
                let response = [];
                res.setHeader('Content-Type', 'application/json');
                if (rows.length !== 0) {
                    response.push({'status': 'success', 'data': rows})
                    res.status(200).send(response);
                } else {
                    response.push({'status': 'failure', 'message': 'No Result Found'});//
                    res.status(200).send(response);
                }

            } else {
                res.status(400).send(err);
            }
        });
    } else {
        response.push({'result': 'error', 'msg': 'Please fill required details'});
        res.setHeader('Content-Type', 'application/json');
        res.send(200, JSON.stringify(response));
    }
});


router.post('/getSubmittedReports', function (req, res) {
    if (typeof req.body.dateVal !== 'undefined' && typeof req.body.status !== 'undefined') {
        let callingBy = "admin";
        let response = [];
        dailyReport.getDailyReportById(null, req.body.dateVal,req.body.status, callingBy, function (err, rows) {
            if (!err) {
                res.setHeader('Content-Type', 'application/json');
                if (rows.length !== 0) {
                    response.push({'status': 'success', 'data': rows})
                    res.status(200).send(response);
                } else {
                    response.push({'status': 'failure', 'message': 'No Result Found'});
                    res.status(200).send(response);
                }

            } else {
                res.status(400).send(err);
            }
        });
    } else {
        response.push({'result': 'error', 'msg': 'Please fill required details'});
        res.setHeader('Content-Type', 'application/json');
        res.send(200, JSON.stringify(response));
    }
});

router.post('/getAll', function (req, res) {
    if (typeof req.body.dateVal !== 'undefined') {
        dailyReport.getDailyReportById( req.body.id, req.body.dateVal, null, function (err, rows) {
            if (!err) {
                let response = [];
                res.setHeader('Content-Type', 'application/json');
                if (rows.length !== 0) {
                    response.push({'status': 'success', 'data': rows})
                    res.status(200).send(response);
                } else {
                    response.push({'status': 'failure', 'message': 'No Result Found'});//
                    res.status(200).send(response);
                }

            } else {
                res.status(400).send(err);
            }
        });
    } else {
        response.push({'result': 'error', 'msg': 'Please fill required details'});
        res.setHeader('Content-Type', 'application/json');
        res.send(200, JSON.stringify(response));
    }
});

router.post('/update/status', function (req, res) {
    let response = [];
    if (typeof req.body.id !== 'undefined' &&
        typeof req.body.status !== 'undefined') {
        dailyReport.updateReportStatus( req.body, function (err, result) {
            if (!err) {
                if (result.affectedRows !== 0) {
                    response.push({'status': 'success'});
                } else {
                    response.push({'status': 'failure'});
                }
                res.setHeader('Content-Type', 'application/json');
                res.status(200).send(JSON.stringify(response));
            } else {
                res.status(400).send(err);
            }
        });
    } else {
        response.push({'result': 'error', 'msg': 'Please fill required details'});
        res.setHeader('Content-Type', 'application/json');
        res.send(200, JSON.stringify(response));
    }
});

router.post('/add', function (req, res) {
    let response = [];
    if (
        typeof req.body.createdDate !== 'undefined' &&
        typeof req.body.lineId !== 'undefined' &&
        typeof req.body.equipmentId !== 'undefined' &&
        typeof req.body.breakDownStart !== 'undefined' &&
        typeof req.body.breakDownFinish !== 'undefined' &&
        typeof req.body.machineDownStart !== 'undefined' &&
        typeof req.body.machineDownFinish !== 'undefined' &&
        typeof req.body.problem !== 'undefined' &&
        typeof req.body.reason !== 'undefined' &&
        typeof req.body.actionTaken !== 'undefined' &&
        typeof req.body.counterMessure !== 'undefined' &&
        typeof req.body.cmStatus !== 'undefined' &&
        typeof req.body.completedDate !== 'undefined' &&
        typeof req.body.charges !== 'undefined' &&
        typeof req.body.createdUserId !== 'undefined'
    ) {
        let createdDate = req.body.createdDate,
            shift = req.body.shift,
            lineId = req.body.lineId,
            equipmentId = req.body.equipmentId,
            breakDownStart = req.body.breakDownStart,
            breakDownFinish = req.body.breakDownFinish,
            machineDownStart = req.body.machineDownStart,
            machineDownFinish = req.body.machineDownFinish,
            problem = req.body.problem,
            reason = req.body.reason,
            actionTaken = req.body.actionTaken,
            counterMessure = req.body.counterMessure,
            cmStatus = req.body.cmStatus,
            completedDate = req.body.completedDate,
            charges = req.body.charges;
        userId = req.body.createdUserId;

        dailyReport.addReport( req.body, function (err, result) {
            if (!err) {

                if (result.affectedRows !== 0) {
                    response.push({'status': 'success'});
                } else {
                    response.push({'status': 'failure'});
                }

                res.setHeader('Content-Type', 'application/json');
                res.status(200).send(JSON.stringify(response));
            } else {
                res.status(400).send(err);
            }
        });
    } else {
        response.push({'result': 'error', 'msg': 'Please fill required details'});
        res.setHeader('Content-Type', 'application/json');
        res.send(200, JSON.stringify(response));
    }
});

router.post('/edit', function (req, res) {
    let response = [];
    if (
        typeof req.body.id !== 'undefined' &&
        typeof req.body.shift !== 'undefined' &&
        typeof req.body.lineId !== 'undefined' &&
        typeof req.body.equipmentId !== 'undefined' &&
        typeof req.body.breakDownStart !== 'undefined' &&
        typeof req.body.breakDownFinish !== 'undefined' &&
        typeof req.body.machineDownStart !== 'undefined' &&
        typeof req.body.machineDownFinish !== 'undefined' &&
        typeof req.body.problem !== 'undefined' &&
        typeof req.body.reason !== 'undefined' &&
        typeof req.body.actionTaken !== 'undefined' &&
        typeof req.body.counterMessure !== 'undefined' &&
        typeof req.body.cmStatus !== 'undefined' &&
        typeof req.body.completedDate !== 'undefined' &&
        typeof req.body.charges !== 'undefined'
    ) {
        let id = req.body.id,
            lineId = req.body.lineId,
            shift = req.body.shift,
            equipmentId = req.body.equipmentId,
            breakDownStart = req.body.breakDownStart,
            breakDownFinish = req.body.breakDownFinish,
            machineDownStart = req.body.machineDownStart,
            machineDownFinish = req.body.machineDownFinish,
            problem = req.body.problem,
            reason = req.body.reason,
            actionTaken = req.body.actionTaken,
            counterMessure = req.body.counterMessure,
            cmStatus = req.body.cmStatus,
            completedDate = req.body.completedDate,
            charges = req.body.charges;

        dailyReport.updateReport( req.body, function (err, result) {
            if (!err) {

                if (result.affectedRows !== 0) {
                    response.push({'status': 'success'});
                } else {
                    response.push({'status': 'failure'});
                }

                res.setHeader('Content-Type', 'application/json');
                res.status(200).send(JSON.stringify(response));
            } else {
                res.status(400).send(err);
            }
        });
    } else {
        response.push({'result': 'error', 'msg': 'Please fill required details'});
        res.setHeader('Content-Type', 'application/json');
        res.send(200, JSON.stringify(response));
    }
});

router.post('/processReports', async function (req, res) {
        let response = [];
        let reportIdArray = [];
        if (typeof req.body.dateVal !== 'undefined') {
              await dailyReport.getDailyReportsByDateAndStatus( req.body.dateVal, 2 ,async function (err, rows) {
                if (!err) {
                    res.setHeader('Content-Type', 'application/json');
                    console.log("row : " + JSON.stringify(rows))
                    if (rows.count !== 0 && rows.count !== undefined) {
                        for(let i=0; i<rows.length; i++){
                            reportIdArray.push(rows[i].id);
                        }
                        let keysCount = reportIdArray.length;
                        let params = [];
                        for (let i = 1; i <= keysCount; i++) {
                            params.push('?');
                        }
                        let d = new Date();
                        let month = Number(d.getMonth())+1;
                        let fileName = d.getDate() + "-" + month + "-" + d.getFullYear() + "-report.xlsx";
                        try {
                            let xls = json2xls(rows);

                            fs.writeFileSync('./daily-reports/' + fileName, xls, 'binary');
                            // push file to s3 bucket
                            // fs.readFile('./daily-reports/' + fileName, (err, data) => {
                            //     if (err) throw err;
                            //     const params = {
                            //         Bucket: 'daily-report-bucket',
                            //         Key: fileName,
                            //         Body: data
                            //     };
                            //     s3.upload(params, function (s3Err, data) {
                            //         if (s3Err) {
                            //             console.log(`Unable to upload file into s3 bucket Error : ${s3Err}`);
                            //             throw(s3Err);
                            //         }
                            //         console.log(`${fileName}'has been uploaded to s3 successfully.`);
                            //     });
                            // })
                        } catch (err) {
                            res.status(200).send(JSON.stringify({'status': 'failure', 'message': err.message}));
                        }
                        try {
                            await sendMail('./daily-reports/' + fileName);
                            console.log("Mail send successfully");
                            dailyReport.updateReportStatusWithDate(req.body.dateVal,4, reportIdArray, params, function (err, result){
                                if (!err) {
                                    if (result.affectedRows !== 0) {
                                        response.push({
                                            'status': 'success', 'data': 'Today daily report has been created successfully.' +
                                            'Email will be sent shortly'
                                        });
                                    } else {
                                        console.log(err);
                                        response.push({'status': 'failure', 'message': err});
                                    }
                                    res.status(200).send(JSON.stringify(response));
                                }
                            });
                        } catch (err) {
                            res.status(200).send(JSON.stringify({'status': 'failure', 'message': err.message}));
                        }
                    } else {
                        res.status(200).send(JSON.stringify({'status': 'failure', 'message': 'No Result Found'}));
                    }
                } else {
                    res.status(200).send(JSON.stringify({'status': 'failure', 'message': err.message}));
                }
            });
        } else {
            response.push({'result': 'error', 'msg': 'Please fill required details'});
            res.setHeader('Content-Type', 'application/json');
            res.send(200, JSON.stringify(response));
        }
    }
);

async function sendMail(filePath) {

    const mail = mailcomposer({
        from: 'manishprabu85@gmail.com',
        replyTo: 'manishprabu85@gmail.com',
        to: 'manishprabu58@gmail.com',
        subject: 'Sample SES message with attachment',
        text: 'Hey folks, this is a test message from SES with an attachment.',
        attachments: [
            {
                path: filePath
            },
        ],
    });

    mail.build(async function (err, message) {
        if (err) {
            console.log(`Error sending raw email: ${err}`);
        }
        await ses.sendRawEmail({RawMessage: {Data: message}}).promise();
    });
}

module.exports = router;
