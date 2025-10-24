import CreditAccounts from './CreditAccounts';

const ProfileCard = ({ profile }) => {
  const { name, mobilePhone, PAN, creditScore, reportSummary, creditAccounts } = profile;

  return (
    <div className="p-4 border rounded shadow bg-white mb-4">
      <h2 className="text-xl font-bold mb-2">{name}</h2>
      <p><strong>Mobile:</strong> {mobilePhone}</p>
      <p><strong>PAN:</strong> {PAN}</p>
      <p><strong>Credit Score:</strong> {creditScore}</p>

      <div className="mt-4">
        <h3 className="font-semibold mb-2">Report Summary</h3>
        <ul className="list-disc list-inside">
          <li>Total Accounts: {reportSummary.totalAccounts}</li>
          <li>Active Accounts: {reportSummary.activeAccounts}</li>
          <li>Closed Accounts: {reportSummary.closedAccounts}</li>
          <li>Current Balance: {reportSummary.currentBalance}</li>
          <li>Secured Amount: {reportSummary.securedAmount}</li>
          <li>Unsecured Amount: {reportSummary.unsecuredAmount}</li>
          <li>Last 7 Days Enquiries: {reportSummary.last7DaysEnquiries}</li>
        </ul>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold mb-2">Credit Accounts</h3>
        <CreditAccounts accounts={creditAccounts} />
      </div>
    </div>
  );
};

export default ProfileCard;
