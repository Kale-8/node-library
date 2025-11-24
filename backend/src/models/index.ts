import {User} from "./User";
import {Plan} from "./Plan";
import {Subscription} from "./Subscription";
import {Book} from "./Book";
import {BookCopy} from "./BookCopy";
import {Loan} from "./Loan";
import {Review} from "./Review";
import {Notification} from "./Notification";

User.hasMany(Book, {foreignKey: "owner_id", as: "books"});
Book.belongsTo(User, {foreignKey: "owner_id", as: "owner"});

User.hasMany(Loan, {foreignKey: "borrower_id", as: "borrowedLoans"});
Loan.belongsTo(User, {foreignKey: "borrower_id", as: "borrower"});

User.hasMany(Loan, {foreignKey: "owner_id", as: "ownerLoans"});
Loan.belongsTo(User, {foreignKey: "owner_id", as: "owner"});

Book.hasMany(Loan, {foreignKey: "book_id", as: "loans"});
Loan.belongsTo(Book, {foreignKey: "book_id", as: "book"});

Plan.hasMany(Subscription, {foreignKey: "plan_id"});
Subscription.belongsTo(Plan, {foreignKey: "plan_id"});

User.hasMany(Subscription, {foreignKey: "user_id"});
Subscription.belongsTo(User, {foreignKey: "user_id"});

Book.hasMany(Review, {foreignKey: "book_id"});
Review.belongsTo(Book, {foreignKey: "book_id"});

User.hasMany(Review, {foreignKey: "reviewer_id"});
Review.belongsTo(User, {foreignKey: "reviewer_id"});

User.hasMany(Notification, {foreignKey: "user_id"});
Notification.belongsTo(User, {foreignKey: "user_id"});

export {
    User, Plan, Subscription, Book, BookCopy, Loan, Review, Notification
};