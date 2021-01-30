const express = require('express');
const dotenv = require('dotenv');
const app = new express();
dotenv.config();

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

function getNLUInstance() {
    let apikey = process.env.API_KEY;
    let apiurl = process.env.API_URL;
    
    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2020-08-01',
        authenticator: new IamAuthenticator({
            apikey: apikey,
        }),
        serviceUrl: apiurl,
    });
    return naturalLanguageUnderstanding;
}

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {
    let analyzeParams = {
        'url': req.query.url,
        'features': {
            'emotion': {
                'document': true,
            }
        }
    }
 
    getNLUInstance().analyze(analyzeParams)
        .then(analysisResults => {
            console.log(analysisResults);
            console.log(JSON.stringify(analysisResults.result.emotion.document.emotion,null,2));
            return res.send(analysisResults.result.emotion.document.emotion,null,2);
        })
        .catch(err => {
            return res.send("Could not do desired operation "+err);
        })
    
});

app.get("/url/sentiment", (req,res) => {
    let analyzeParams = {
        'url': req.query.url,
        'features': {
            'sentiment': {
                'document': true,
            }
        }
    }
 
    getNLUInstance().analyze(analyzeParams)
        .then(analysisResults => {
            console.log(analysisResults);
            console.log(JSON.stringify(analysisResults.result.sentiment.document.label,null,2));
            return res.send(analysisResults.result.sentiment.document.label,null,2);
        })
        .catch(err => {
            return res.send("Could not do desired operation "+err);
        });
});

app.get("/text/emotion", (req,res) => {
    let analyzeParams = {
        'text': req.query.text,
        'features': {
            'emotion': {
                'document': true,
            }
        }
    }
    
    getNLUInstance().analyze(analyzeParams)
        .then(analysisResults => {
            console.log(analysisResults);
            console.log(JSON.stringify(analysisResults.result.emotion.document.emotion,null,2));
            return res.send(analysisResults.result.emotion.document.emotion,null,2);
        })
        .catch(err => {
            return res.send("Could not do desired operation "+err);
        });

});

app.get("/text/sentiment", (req,res) => {
    let analyzeParams = {
        'text': req.query.text,
        'features': {
            'sentiment': {
                'document': true,
            }
        }
    }
 
    getNLUInstance().analyze(analyzeParams)
        .then(analysisResults => {
            console.log(analysisResults);
            console.log(JSON.stringify(analysisResults.result.sentiment.document.label,null,2));
            return res.send(analysisResults.result.sentiment.document.label,null,2);
        })
        .catch(err => {
            return res.send("Could not do desired operation "+err);
        });
 
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

