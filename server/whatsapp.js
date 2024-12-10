require('dotenv').config()
const axios = require('axios')
// const FormData = require('form-data')
// const fs = require('fs')

async function sendTemplateMessage() {
    const response = await axios({
        url: 'https://graph.facebook.com/v21.0/498717726658120/messages',
        method: 'post',
        headers: {
            'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            messaging_product: 'whatsapp',
            to: process.env.PHONE_NO,
            type: 'template',
            template: {
                name: 'hello_world',
                language: {
                    code: 'en_US'
                }
              
            }
        })
    })

    console.log(response.data)
}

async function sendTextMessage() {
    const response = await axios({
        url: 'https://graph.facebook.com/v21.0/498717726658120/messages',
        method: 'post',
        headers: {
            'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            messaging_product: 'whatsapp',
            to: process.env.PHONE_NO,
            type: 'text',
            text:{
                body: 'This is a nayan message'
            }
        })
    })

    console.log(response.data) 
}

async function sendMediaMessage() {
    const response = await axios({
        url: 'https://graph.facebook.com/v21.0/498717726658120/messages',
        method: 'post',
        headers: {
            'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            messaging_product: 'whatsapp',
            to: process.env.PHONE_NO,
            type: 'image',
            image: {
                link: 'https://dummyimage.com/600x400/000/fff.png&text=nayan',
                // id: '512126264622813',
                caption: 'This is a media message'
            }
        })
    })

    console.log(response.data)
}

// async function uploadImage() {
//     const data = new FormData()
//     data.append('messaging_product', 'whatsapp')
//     data.append('file', fs.createReadStream(process.cwd() + '/logo.png'), { contentType: 'image/png' })
//     data.append('type', 'image/png')

//     const response = await axios({
//         url: 'https://graph.facebook.com/v20.0/phone_number_id/media',
//         method: 'post',
//         headers: {
//             'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`
//         },
//         data: data
//     })

//     console.log(response.data)
// }

// sendTemplateMessage()

// sendTextMessage()

sendMediaMessage()

// uploadImage()