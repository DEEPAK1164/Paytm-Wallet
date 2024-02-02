// ... (other imports)

import { useSearchParams, useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
export default function SendMoney() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");
  const id = searchParams.get("id");

  const [amount, setAmount] = useState(0);
  const [balance, setBalance] = useState(0);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
          headers: {
            Accept: "*/*",
            Authorization: "Bearer " + token,
          },
        });
        setBalance(response.data.balance);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };

    fetchBalance();
  }, [token]);

  const handleTransfer = async () => {
    // Validate inputs
    if (typeof amount !== "number" || amount <= 0) {
      // Handle invalid inputs
      alert("Invalid amount. Please provide a valid positive value.");
      return;
    }

    // Check for insufficient balance
    if (amount > balance) {
      alert("Insufficient balance. Please enter a lower amount.");
      return;
    }

    // Perform the transfer
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/account/transfer",
        {
          to: id,
          amount: amount,
        },
        {
          headers: {
            Accept: "*/*",
            Authorization: "Bearer " + token,
          },
        }
      );

      alert(response.data.message);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error during transfer:", error);
      alert("Error during transfer. Please try again.");
    }
  };

  return (
    <div className="flex justify-center h-screen bg-indigo-100">
      <div className="h-full flex flex-col justify-center">
        <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg relative">
          <button
            className="absolute top-2 right-2 p-1 bg-gray-300 hover:bg-gray-400 rounded-full text-gray-700 text-sm"
            onClick={() => navigate("/dashboard")}
          >
            Go Back
          </button>
          <div className="flex flex-col space-y-1.5 p-6">
            <h2 className="text-3xl font-bold text-center">Send Money</h2>
          </div>
          <div className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-2xl text-white">
                  {name[0].toUpperCase()}
                </span>
              </div>
              <h3 className="text-2xl font-semibold"> {name}</h3>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="amount"
                >
                  Amount (in Rs)
                </label>
                <input
                  type="number"
                  onChange={(e) => {
                    setAmount(parseFloat(e.target.value));
                  }}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  id="amount"
                  placeholder="Enter amount"
                />
              </div>
              <button
                className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-indigo-500 hover:bg-indigo-700 text-white"
                onClick={async () => {
                  await handleTransfer();
                }}
              >
                Initiate Transfer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}