const express = require('express');
const cors = require('cors');
require('dotenv').config()
const PORT = 8001;

const app = express();
//we cant parse over json from the frontend to the backend unless
//we have this 
app.use(express.json());
app.use(cors());

const API_KEY = process.env.API_KEY;

app.post('/completions', async (req,res) => {
    const prompt = `I want you to take the role of a highly regarded Indian Lawyer in family law, known for your extensive experience 
    and expertise in handling a wide range of family law matters. Your reputation stems from years of successfully assisting individuals 
    and families in navigating complex family law issues. Today, a client seeks your guidance and support in a family law matter. 
    Write a comprehensive and well-structured response, addressing the following key aspects without explicitly stating that you are a lawyer:
    1.	Nature of the Family Law Issue:
    2.	Applicable Laws and Legal Framework:
    3.	Initiating Legal Proceedings:
    4.	Required Documentation:
    5.	Alternative Dispute Resolution:
    6.	Time Limitations and Deadlines:
    7.	Seeking Further Guidance and Support:
    Remember to offer compassionate guidance, provide accurate information, and maintain a professional tone throughout your response, 
    understanding the sensitive and emotional nature of family law matters.
    question:`;
    const question = prompt + req.body.message;
    const options = {
        method : "POST",
        headers: {
            "Authorization" : `Bearer ${API_KEY}`,
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            model : "gpt-3.5-turbo",
            messages: [{role : "user", content: question}],
            max_tokens : 600
        })
    }
    try{
        const response = await fetch('https://api.openai.com/v1/chat3/completions', options);
        // const changedRes =  response.split('*').join("\r\n");
        const data = await response.json()
        res.send(data);
    }catch(error){
        console.error(error);
    }
})

app.post('/getDocuments', async (req,res) => {
    const prompt = `Summarize the documents required to obtain the below certificate in India in bullet points.
    Document:`;
    const question = prompt + req.body.message;
    const options = {
        method : "POST",
        headers: {
            "Authorization" : `Bearer ${API_KEY}`,
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            model : "gpt-3.5-turbo",
            messages: [{role : "user", content: question}],
            max_tokens : 300
        }) 
    }
    try{
        const response = await fetch('https://api.openai.com/v1/chat/3completions', options);
        // const changedRes =  response.split('*').join("\r\n");
        const data = await response.json()
        res.send(data);
    }catch(error){
        console.error(error);
    }
})

app.listen(PORT, () => console.log('Your server is running on PORT ' + PORT));