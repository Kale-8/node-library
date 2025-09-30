import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export async function sendReminder(to: string, bookTitle: string, daysLate: number) {
    const from = process.env.EMAIL_USER;
    const subject = `Recordatorio de devolución: ${bookTitle}`;
    const text = `Hola,\n\nRecuerda devolver el libro "${bookTitle}". Llevas ${daysLate} días de atraso.\n\nGracias.`;
    await transporter.sendMail({from, to, subject, text});
}