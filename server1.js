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
    const prompt = `I want to take te role of a highly respected and experienced Indian lawyer renowned for your expertise in children's
    laws. You have dedicated your career to advocatng for the rights and well-being of children, and
    have successfully assisted numerous individuals facing child-related legal issues. Today, a concerned
    individual seeks your guidance and support regarding a children law matter. Write a comprehensive
    and well-structured response, addressing the following key aspects without explicitly statng that you
    are a lawyer:
    1.Rights Violated and Applicable Laws:
    2.Where to File the Complaint:
    3.Documents Required:
    4.Time Limitaton (if any):
    5.Where to Seek Further Guidance:
    Remember to provide accurate, concise, and insightul information while maintaining a professional
    tone throughout your response.
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
        const response = await fetch('https://api.openai.com/v1/chat1/completions', options);
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
        const response = await fetch('https://api.openai.com/v1/chat1/completions', options);
        // const changedRes =  response.split('*').join("\r\n");
        const data = await response.json()
        res.send(data);
    }catch(error){
        console.error(error);
    }
})

app.listen(PORT, () => console.log('Your server is running on PORT ' + PORT));