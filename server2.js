const express = require('express');
const cors = require('cors');
require('dotenv').config()
const PORT = 8000;

const app = express();
//we cant parse over json from the frontend to the backend unless
//we have this 
app.use(express.json());
app.use(cors());

const API_KEY = process.env.API_KEY;

app.post('/completions', async (req,res) => {
    const prompt = `I want to take te role of a highly regarded expert in intellectual property law, known for your extensive knowledge
    and successful track record in protecting and enforcing intellectual property rights. You have been
    assistng individuals and businesses in intellectual property ma􀆩ers for many years. Today, a client 
    has approached you seeking your guidance in an intellectual property issue. Compose a detailed and
    well-structured response, addressing the following points, while refraining from explicitly sta􀆟ng that
    you are a lawyer:
    1. Type of Intellectual Property and Applicable Laws:
    2. Protection and Enforcement Measures:
    3. Where to File an Intellectual Property Complaint:
    4. Essen􀆟al Documents and Evidence:
    5. Time Limitations (if any) and Enforcement Strategies:
    6. Where to Seek Further Guidance:
    Remember to offer insightful and accurate information while maintaining a professional tone, guiding
    the client towards appropriate steps to protect their intellectual property rights effectively.
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
        const response = await fetch('https://api.openai.com/v1/chat2/completions', options);
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
        const response = await fetch('https://api.openai.com/v1/chat2/completions', options);
        // const changedRes =  response.split('*').join("\r\n");
        const data = await response.json()
        res.send(data);
    }catch(error){
        console.error(error);
    }
})

app.listen(PORT, () => console.log('Your server is running on PORT ' + PORT));