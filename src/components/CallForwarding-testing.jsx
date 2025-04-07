import React, { useState } from "react";

const CallForwarding = () => {
  const [simProvider, setSimProvider] = useState("");

  // Example: Set USSD codes for each provider
  const ussdCodes = {
    Airtel: "*21*1234567890#",
    Jio: "*401*1234567890#",
    Vi: "*21*1234567890#",
    BSNL: "*21*1234567890#",
  };

  const handleForward = () => {
    if (!simProvider) {
      alert("Please select a SIM provider.");
      return;
    }

    const ussdCode = ussdCodes[simProvider];
    const encodedCode = encodeURIComponent(ussdCode);

    const isMobile = /iPhone|Android/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = `tel:${encodedCode}`;
    } else {
      alert("Please open this on a mobile device to activate call forwarding.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4 text-center">Call Forwarding</h1>

        <label className="block mb-2 font-medium text-gray-700">
          Select SIM Provider
        </label>
        <select
          className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={simProvider}
          onChange={(e) => setSimProvider(e.target.value)}
        >
          <option value="">-- Select Provider --</option>
          <option value="Airtel">Airtel</option>
          <option value="Jio">Jio</option>
          <option value="Vi">Vi</option>
          <option value="BSNL">BSNL</option>
        </select>

        <button
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl transition duration-300"
          onClick={handleForward}
        >
          Set Call Forwarding
        </button>
      </div>
    </div>
  );
};





export default CallForwarding;
