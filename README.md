# Quero Correção - Democratizing Access to High-Quality Essay Feedback


## Overview
Quero Correção is an innovative solution that utilizes powerful AI models to guide students in training their essays for ENEM in a more efficient and economical way. Whether you're an independent student or studying in a group, you can learn how to write quality essays at a small cost while still having access to high-quality service.


## Technologies Used
* Typescript and VUE using Qusar framework for the frontend
* Cloud  Functions written in typescript connecting with Firebase Auth, Firestore and Storage.
* Microsoft Azure - as Computer Vision AI API
* OpenAI API - as LLM model to process text information using  gpt-3.5-turbo AI


## Features
* Simplify the process using AI to interpret your essay photo
* Eliminate the need for human assistance, as the LLM is capable of providing valuable feedback in seconds
* A mobile app to make uploading photos easy, with no PC required
* Reliable results thanks to extensive prompt engineering and fine-tuning processes, ensuring precision according to ENEM standards


## Flowchart
This is how the application works.
1. You can upload an Image of your essay in the main page of the app

2. In the backend, an AI powered application will be responsible to understand your essay photo and transform it into a text

3. This text will be sent to another AI-powered application, this time using LLM (ChatGPT 3.5 plus in this case), that will analyze your essay

4. After utilizing these massive models to assist you, you will receive an analysis of your essay, including: grades by ENEM criteria and specific feedback

5. You can send as many essays as you want, but the service incurs a small fee, despite its affordability

6. Below is a flowchart for visualizing this process. It's important to note that the end-user doesn't need to understand the underlying process; they only experience the cost-saving benefits of using our service!

![flowchart](https://github.com/Ferroca2/Quero-Correcao/assets/101767386/7358ad3f-0ab6-4be1-a40e-ac1fc7c683e7)


## Getting Started
## Requirements

### Frontend
1. Have firebase cli installed (`run npm install -g  firebase-tool`)
2. Run `npm run firebase`
3. Run `npm run front:dev`
4. Enjoy!

### Backend 
1. Have firebase cli installed (`run npm install -g  firebase-tool`)
2. Run `npm run firebase`
3. Make requests to http://localhost:5001/quero-redacao/us-central1/setEssay
4. Use the body format:

 <pre>
    {
        "pictureUrl":"https://scontent.frao1-1.fna.fbcdn.net/v/t39.30808-6/367734184_2527963660702475_4959393267487895349_n.jpg_nc_cat=106&ccb=17&_nc_sid=730e14&_nc_ohc=sjwqcAL8XrUAX8mdhKs&_nc_ht=scontent.frao1-1.fna&oh=00_AfB3jJXQD5x_jJpvvVQ9ykgobl23T7yfUGF9uyGSemwGWQ&oe=64E77122",
        "topic": "Invisibilidade e registro civil: garantia de acesso à cidadania no Brasil",
        "userId": "1",
        "essayId": "1"
    }
</pre>

It's recommended to run first your front-end,then  you don''t need to make resquests mannualy

## Usage
### User Interface
As a Quero Correção client, you enjoy access to various useful information on our platform. To improve your essay writing skills for ENEM, simply install our app and begin uploading your essay photos and selecting themes. A user-friendly interface will notify you when the analysis is complete, and with a single click, you'll receive details about ENEM criteria and personalized feedback. All for a very modest fee to cover the use of these powerful AI technologies.



## Team:
[cauemguimaraes](https://github.com/cauemguimaraes)
[DannxC](https://github.com/DannxC)
[Ferroca2](https://github.com/Ferroca2)
[Rafael450](https://github.com/Rafael450)
