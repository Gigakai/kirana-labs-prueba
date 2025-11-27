import csv from 'csv-parser'
import * as fs from "node:fs";

const readCSV = (path) => {
    return new Promise((resolve, reject) => {
        const contacts = [];
        fs.createReadStream(path)
            .pipe(csv())
            .on('data', (data) => contacts.push(data))
            .on('end', () => resolve(contacts))
            .on('error', (error) => reject(error));
    });
}

export const uploadCSV = async (req, res) => {
    try {
        const csvPath = req.file.path;
        const totalContacts = await readCSV(csvPath);
        const usersSet = new Set();
        const rows = []


        for (const contact of totalContacts) {
            // Regex Expresion to validate email and Phone
            const emailExpresion = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
            const phoneExpresion = /^[0-9]{10}$/

            //Validation
            const isValidEmail = emailExpresion.test(contact['Correo Electronico']);
            const isValidPhone = phoneExpresion.test(contact['Telefono']);


            rows.push({
                email: contact['Correo Electronico'],
                name: contact['Nombre'],
                phone: contact['Telefono'],
                isValidEmail,
                isValidPhone
            })


        }
        res.status(201).json({message: 'Contacts uploaded successfully', contacts: rows});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}