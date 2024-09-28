const nodemailer = require("nodemailer");
require("dotenv").config(); 
const path = require("path");
const AWS = require("@aws-sdk/client-ses");
class Model {    

    static sendRegistrationEmaill = async (query, userData, user, testlink, orgTestSet) => {
        // get the email template detatils
        const templateQuery = `select * from email_template where event = '1' and organization_id='${orgTestSet.organization_id}' `;
        const template = query(templateQuery);
        
        if(template && template.length>0){
            
            // get the email body & subject
            let html = template[0]['html']
            let text = template[0]['text']
            
            // replace the variables in content
            const variables = JSON.parse(template[0]['vairable']);
            //variables.map(emelment => {});

            // get the admin email / default emails

            // from email

            // mailOptions

            // attachment
        }
    }

    static sendEmail = async (query, mailOptions, orgEmail) => {
        const ses = new AWS.SES({
            apiVersion: "2010-12-01", 
            region: orgEmail.aws_ses_region, // AWS_SES_REGION,
            credentials: {
                accessKeyId: orgEmail.aws_access_key ,// AWS_ACCESS_KEY, 
                secretAccessKey: orgEmail.aws_secret_access_key // AWS_SECRET_ACCESS_KEY
            }
        });
        const transporter = nodemailer.createTransport({SES: { ses, aws: AWS },});
        try {
            // Email content
            // const mailOptions = {
            //     from: {
            //         "name": "Web Wizard",
            //         "address": "webwizard0808@gmail.com"
            //     },
            //     to: ["webwizard0808@gmail.com"],
            //     subject: 'Test Email with Attachments', 
            //     text: 'Hello, this is a test email with attachments!', 
            //     html: "<b>Hello, this is a test email with attachments!</b>", 
            //     attachments : [
            //         {
            //             filename: 'test.pdf',
            //             path: path.join(_didname,'test.pdf'),
            //             contentType: 'application/pdf'
            //         },
            //         {
            //             filename: 'test.pdf',
            //             path: path.join(_didname,'test.pdf'),
            //             contentType: 'application/pdf'
            //         }
            //     ]        
            // }

            // Send the email
            const info = await transporter.sendMail(mailOptions);
            console.log('Email sent successfully:', info.messageId);


        } catch (error) {
            console.error(error);
            // Call the sendEmail function to send the email
        }
    }    
}
module.exports = Model;
    