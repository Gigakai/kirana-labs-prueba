import csv from 'csv-parser'
import * as fs from "node:fs";
import ContactModel from '../models/ContactModel.js';

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
        const emailCounters = {}
        const phoneCounters = {}
        const nameCounters = {}

        for (const contact of totalContacts) {
            // Regex Expresion to validate email and Phone
            const emailExpresion = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
            const phoneExpresion = /^[0-9]{10}$/

            //Validation
            const isValidEmail = emailExpresion.test(contact['Correo Electronico']);
            const isValidPhone = phoneExpresion.test(contact['Telefono']);

            // Add Counters
            if(isValidEmail)
                emailCounters[contact['Correo Electronico']] = emailCounters[contact['Correo Electronico']] ? emailCounters[contact['Correo Electronico']] + 1 : 1;
            if(isValidPhone)
                phoneCounters[contact['Telefono']] = phoneCounters[contact['Telefono']] ? phoneCounters[contact['Telefono']] + 1 : 1;
            nameCounters[contact['Nombre']] = nameCounters[contact['Nombre']] ? nameCounters[contact['Nombre']] + 1 : 1;

            // Validate whole row
            if (!usersSet.has(JSON.stringify(contact)))
                usersSet.add(JSON.stringify(contact));
            else
                continue;

            rows.push({
                email: contact['Correo Electronico'],
                name: contact['Nombre'],
                phone: contact['Telefono'],
                isValidEmail,
                isValidPhone,
                hasDuplicates: false
            })
        }

        rows.forEach(row => {
            if(emailCounters[row.email] > 1 || phoneCounters[row.phone] > 1 || nameCounters[row.name] > 1) row.hasDuplicates = true;
        })


        await ContactModel.bulkCreate(rows.map((row) =>
            {
                return {
                    email: row.email,
                    name: row.name,
                    phone: row.phone,
                }
            }
        ));

        res.status(201).json({
            message: 'Contacts uploaded successfully',
            contacts: rows,
            stats: {
                totalContacts: rows.length,
                contactsWithDuplicates: rows.filter(row => row.hasDuplicates).length
            }
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}