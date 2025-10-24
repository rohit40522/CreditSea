import { parseStringPromise } from "xml2js";

export const parseExperianXML = async (xmlData) => {
  const parsed = await parseStringPromise(xmlData, { explicitArray: false });
  const report = parsed?.INProfileResponse || {};

  // Extract Basic Details
  const applicant = report?.Current_Application?.Current_Application_Details || {};
  const holder = report?.CAIS_Account?.CAIS_Account_DETAILS?.CAIS_Holder_Details || {};
  const score = report?.SCORE || {};

  // CAIS accounts can be a single object or array
  let accounts = report?.CAIS_Account?.CAIS_Account_DETAILS || [];
  if (!Array.isArray(accounts)) accounts = [accounts];

  return {
    name: `${applicant.First_Name || ""} ${applicant.Last_Name || ""}`.trim() || "N/A",
    mobilePhone: applicant.MobilePhoneNumber || "N/A",
    pan: holder.Income_TAX_PAN || "N/A",
    creditScore: parseInt(score.BureauScore || "0"),

    reportSummary: {
      totalAccounts: parseInt(report?.CAIS_Account?.CAIS_Summary?.Credit_Account?.CreditAccountTotal || "0"),
      activeAccounts: parseInt(report?.CAIS_Account?.CAIS_Summary?.Credit_Account?.CreditAccountActive || "0"),
      closedAccounts: parseInt(report?.CAIS_Account?.CAIS_Summary?.Credit_Account?.CreditAccountClosed || "0"),
      currentBalanceAmount: parseFloat(report?.CAIS_Account?.CAIS_Summary?.Total_Outstanding_Balance?.Outstanding_Balance_All || "0"),
      securedAccountsAmount: parseFloat(report?.CAIS_Account?.CAIS_Summary?.Total_Outstanding_Balance?.Outstanding_Balance_Secured || "0"),
      unsecuredAccountsAmount: parseFloat(report?.CAIS_Account?.CAIS_Summary?.Total_Outstanding_Balance?.Outstanding_Balance_UnSecured || "0"),
      last7DaysEnquiries: parseInt(report?.TotalCAPS_Summary?.TotalCAPSLast7Days || "0"),
    },

    creditAccounts: accounts.map(acc => ({
      type: acc?.Portfolio_Type || "N/A",
      bank: acc?.Subscriber_Name || "N/A",
      accountNumber: acc?.Account_Number || "N/A",
      currentBalance: parseFloat(acc?.Current_Balance || "0"),
      amountOverdue: parseFloat(acc?.Amount_Past_Due || "0"),
      address: acc?.CAIS_Holder_Address_Details?.First_Line_Of_Address_non_normalized || "",
    }))
  };
};
