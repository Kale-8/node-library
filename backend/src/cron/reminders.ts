import cron from "node-cron";
import { loanService } from "../services/loanService";
import { sendReminder } from "../services/mailService";
import logger from "../utils/logger";
export function startReminders(){
  cron.schedule("*/1 * * * *", async () => {
    logger.info("Cron: checking overdue loans...");
    const overdue = await loanService.findOverdue();
    for(const loan of overdue){
      // in this simplified version we don't include relations; assume borrower_id and book_id present
      const borrowerEmail = (loan as any).borrower_email || "user@example.com";
      const bookTitle = (loan as any).book_title || "Unknown";
      const returnDate = new Date((loan as any).return_date);
      const daysLate = Math.floor((Date.now() - returnDate.getTime()) / (1000*60*60*24));
      try{
        await sendReminder(borrowerEmail, bookTitle, daysLate);
        await loanService.markNotification((loan as any).borrower_id, `Reminder sent for ${bookTitle}`);
        logger.info(`Reminder sent to ${borrowerEmail} for ${bookTitle} (${daysLate} days late)`);
      }catch(e){
        logger.error("Error sending reminder: " + e);
      }
    }
  });
}
