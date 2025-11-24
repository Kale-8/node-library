import cron from "node-cron";
import {loanService} from "../services/loanService";
import {sendReminder} from "../services/mailService";
import logger from "../utils/logger";

export function startReminders() {
    cron.schedule("*/15 * * * *", async () => {
        logger.info("Cron: comprobando préstamos vencidos...");
        const overdue = await loanService.findOverdue();
        for (const loan of overdue) {
            const borrower = (loan as any).borrower;
            const book = (loan as any).book;
            const returnDate = new Date((loan as any).return_date);
            const today = new Date();
            const diffMs = today.getTime() - returnDate.getTime();
            const daysLate = Math.floor(diffMs / (1000 * 60 * 60 * 24));
            const email = borrower.email;
            try {
                await sendReminder(email, book.title, daysLate);
                await loanService.markNotification(borrower.id, `Se envió recordatorio por ${book.title}`);
                logger.info(`Se envió recordatorio a ${email} por el libro ${book.title} (${daysLate} días de atraso)`);
            } catch (err) {
                logger.error(`Error enviando recordatorio a ${email}: ${err}`);
            }
        }
    });
}