import mongoose from "mongoose";


const CreditAccountSchema = new mongoose.Schema({
    subscriberName: String,
    accountNumber: String,
    portfolioType: String,
    accountType: String,
    openDate: String,
    creditLimit: Number,
    currentBalance: Number,
    amountPastDue: Number,
    accountStatus: String,
    paymentHistory: [String]
});

const CreditProfileSchema = new mongoose.Schema({
    name: String,
    mobilePhone: String,
    PAN: String,
    creditScore: Number,
    reportSummary: {
        totalAccounts: Number,
        activeAccounts: Number,
        closedAccounts: Number,
        currentBalance: Number,
        securedAmount: Number,
        unsecuredAmount: Number,
        last7DaysEnquiries: Number
    },
    creditAccounts: [CreditAccountSchema]
}, { timestamps: true });

export default mongoose.model('CreditProfile', CreditProfileSchema);





