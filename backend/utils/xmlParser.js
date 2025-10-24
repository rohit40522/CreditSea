import { parseStringPromise } from 'xml2js';


export const parseExperianXML = async (xmlData) => {
    const parsed = await parseStringPromise(xmlData, { explicitArray: false });
    const report = parsed?.ExperianReport || {};


    return {
        name: report?.BasicDetails?.Name || '',
        mobile: report?.BasicDetails?.MobilePhone || '',
        pan: report?.BasicDetails?.PAN || '',
        creditScore: parseInt(report?.BasicDetails?.CreditScore || '0'),
        reportSummary: {
            totalAccounts: parseInt(report?.ReportSummary?.TotalAccounts || '0'),
            activeAccounts: parseInt(report?.ReportSummary?.ActiveAccounts || '0'),
            closedAccounts: parseInt(report?.ReportSummary?.ClosedAccounts || '0'),
            currentBalance: parseFloat(report?.ReportSummary?.CurrentBalance || '0'),
            securedAmount: parseFloat(report?.ReportSummary?.SecuredAmount || '0'),
            unsecuredAmount: parseFloat(report?.ReportSummary?.UnsecuredAmount || '0'),
            last7DaysEnquiries: parseInt(report?.ReportSummary?.Last7DaysEnquiries || '0'),
        },
        creditAccounts: (report?.CreditAccounts?.Account || []).map((acc) => ({
            type: acc?.Type || '',
            bank: acc?.Bank || '',
            address: acc?.Address || '',
            accountNumber: acc?.AccountNumber || '',
            amountOverdue: parseFloat(acc?.AmountOverdue || '0'),
            currentBalance: parseFloat(acc?.CurrentBalance || '0'),
        })),
    };
};