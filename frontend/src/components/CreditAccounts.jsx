const CreditAccounts = ({ accounts }) => {
  if (!accounts.length) return <p>No credit accounts found.</p>;

  return (
    <table className="table-auto w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th className="border px-2 py-1">Subscriber</th>
          <th className="border px-2 py-1">Account Number</th>
          <th className="border px-2 py-1">Type</th>
          <th className="border px-2 py-1">Current Balance</th>
          <th className="border px-2 py-1">Past Due</th>
        </tr>
      </thead>
      <tbody>
        {accounts.map((acc, idx) => (
          <tr key={idx} className="text-center">
            <td className="border px-2 py-1">{acc.subscriberName}</td>
            <td className="border px-2 py-1">{acc.accountNumber}</td>
            <td className="border px-2 py-1">{acc.accountType}</td>
            <td className="border px-2 py-1">{acc.currentBalance}</td>
            <td className="border px-2 py-1">{acc.amountPastDue}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CreditAccounts;
