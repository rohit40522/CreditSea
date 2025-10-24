// import fs from 'fs';
// import { parseStringPromise } from 'xml2js';
// import CreditProfile from '../models/CreditModel.js';

// // Upload and process XML
// export const uploadXML = async (req, res) => {
//     try {
//         const xmlData = fs.readFileSync(req.file.path, 'utf-8');
//         const parsed = await parseStringPromise(xmlData, { explicitArray: false });

//         const profile = parsed.INProfileResponse;

//         // Extract data
//         const basicDetails = profile.Current_Application.Current_Application_Details.Current_Applicant_Details;
//         const summary = profile.CAIS_Account.CAIS_Summary.Credit_Account;
//         const balance = profile.CAIS_Account.CAIS_Summary.Total_Outstanding_Balance;
//         const score = profile.SCORE.BureauScore;

//         const creditAccounts = Array.isArray(profile.CAIS_Account.CAIS_Account_DETAILS) 
//             ? profile.CAIS_Account.CAIS_Account_DETAILS.map(acc => ({
//                 subscriberName: acc.Subscriber_Name,
//                 accountNumber: acc.Account_Number,
//                 portfolioType: acc.Portfolio_Type,
//                 accountType: acc.Account_Type,
//                 openDate: acc.Open_Date,
//                 creditLimit: Number(acc.Credit_Limit_Amount || 0),
//                 currentBalance: Number(acc.Current_Balance || 0),
//                 amountPastDue: Number(acc.Amount_Past_Due || 0),
//                 accountStatus: acc.Account_Status,
//                 paymentHistory: acc.CAIS_Account_History ? [].concat(acc.CAIS_Account_History?.Days_Past_Due) : []
//             })) 
//             : [];

//         const newProfile = new CreditProfile({
//             name: `${basicDetails.First_Name} ${basicDetails.Last_Name}`,
//             mobilePhone: basicDetails.MobilePhoneNumber,
//             PAN: profile.CAIS_Account.CAIS_Account_DETAILS[0]?.CAIS_Holder_Details?.Income_TAX_PAN || '',
//             creditScore: Number(score),
//             reportSummary: {
//                 totalAccounts: Number(summary.CreditAccountTotal),
//                 activeAccounts: Number(summary.CreditAccountActive),
//                 closedAccounts: Number(summary.CreditAccountClosed),
//                 currentBalance: Number(balance.Outstanding_Balance_All),
//                 securedAmount: Number(balance.Outstanding_Balance_Secured),
//                 unsecuredAmount: Number(balance.Outstanding_Balance_UnSecured),
//                 last7DaysEnquiries: Number(profile.TotalCAPS_Summary.TotalCAPSLast7Days)
//             },
//             creditAccounts
//         });

//         await newProfile.save();
//         res.json({ success: true, message: 'XML processed and saved' });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: 'Error processing XML' });
//     }
// };

// // Get all credit profiles
// export const getProfiles = async (req, res) => {
//     try {
//         const profiles = await CreditProfile.find();
//         res.json(profiles);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ success: false, message: 'Error fetching profiles' });
//     }
// };


import fs from 'fs';
import { parseStringPromise } from 'xml2js';
import CreditProfile from '../models/CreditModel.js';

// Upload and process XML
export const uploadXML = async (req, res) => {
  try {
    const xmlData = fs.readFileSync(req.file.path, 'utf-8');
    const parsed = await parseStringPromise(xmlData, { explicitArray: false });

    const profile = parsed.INProfileResponse;

    // Extract data safely
    const basicDetails =
      profile?.Current_Application?.Current_Application_Details?.Current_Applicant_Details || {};
    const summary = profile?.CAIS_Account?.CAIS_Summary?.Credit_Account || {};
    const balance = profile?.CAIS_Account?.CAIS_Summary?.Total_Outstanding_Balance || {};
    const score = profile?.SCORE?.BureauScore || 0;

    // Handle multiple accounts
    const accountDetails = profile?.CAIS_Account?.CAIS_Account_DETAILS;
    const creditAccounts = Array.isArray(accountDetails)
      ? accountDetails.map((acc) => ({
          subscriberName: acc.Subscriber_Name,
          accountNumber: acc.Account_Number,
          portfolioType: acc.Portfolio_Type,
          accountType: acc.Account_Type,
          openDate: acc.Open_Date,
          creditLimit: Number(acc.Credit_Limit_Amount || 0),
          currentBalance: Number(acc.Current_Balance || 0),
          amountPastDue: Number(acc.Amount_Past_Due || 0),
          accountStatus: acc.Account_Status,
          paymentHistory: acc.CAIS_Account_History
            ? [].concat(acc.CAIS_Account_History?.Days_Past_Due)
            : [],
        }))
      : [];

    // Create MongoDB document
    const newProfile = new CreditProfile({
      name: `${basicDetails.First_Name || ''} ${basicDetails.Last_Name || ''}`.trim(),
      mobilePhone: basicDetails.MobilePhoneNumber || '',
      PAN: accountDetails?.[0]?.CAIS_Holder_Details?.Income_TAX_PAN || '',
      creditScore: Number(score),
      reportSummary: {
        totalAccounts: Number(summary.CreditAccountTotal || 0),
        activeAccounts: Number(summary.CreditAccountActive || 0),
        closedAccounts: Number(summary.CreditAccountClosed || 0),
        currentBalance: Number(balance.Outstanding_Balance_All || 0),
        securedAmount: Number(balance.Outstanding_Balance_Secured || 0),
        unsecuredAmount: Number(balance.Outstanding_Balance_UnSecured || 0),
        last7DaysEnquiries: Number(profile?.TotalCAPS_Summary?.TotalCAPSLast7Days || 0),
      },
      creditAccounts,
    });

    const savedProfile = await newProfile.save();

    // ✅ Return the saved profile directly
    res.status(201).json(savedProfile);
  } catch (error) {
    console.error('XML Processing Error:', error);
    res.status(500).json({ success: false, message: 'Error processing XML' });
  }
};

// Get all credit profiles
export const getProfiles = async (req, res) => {
  try {
    const profiles = await CreditProfile.find().sort({ createdAt: -1 });
    res.json(profiles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error fetching profiles' });
  }
};
