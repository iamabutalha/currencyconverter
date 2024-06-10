import { useEffect, useState } from "react";
import { Inputbox } from "./components";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);
  let [options, setOptions] = useState([]);

  // Here the form parameter will take the currency and will give us the data of that currency as we have set it in the useCurrencyInfo coustom hook
  const currencyInfo = useCurrencyInfo(from);

  // Here it will Take the keys and will put all it in the option in order to make alot of currency options
  const option = Object.keys?.(currencyInfo);

  // To swap currencies
  const swap = () => {
    let temp = from;
    setFrom(to);
    setTo(temp);

    let temp2 = convertedAmount;
    setConvertedAmount(amount);
    setAmount(temp2);
  };

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]);
  };

  // useEffect(() => {
  //   setOptions((options = Object.keys?.(currencyInfo)));
  //   convert();
  // }, [options]);

  return (
    <>
      <div
        className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/3532540/pexels-photo-3532540.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')`,
        }}
      >
        <div className="w-full">
          <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // When ever form is submitted run convert function
                convert();
              }}
            >
              <div className="w-full mb-1">
                {/* COmponent  */}
                <Inputbox
                  label="From"
                  amount={amount}
                  currencyOptions={option}
                  onCurrencyChange={(amount) => setAmount(amount)}
                  selectCurrency={from}
                  onAmountChange={(amount) => setAmount(amount)}
                />
              </div>
              <div className="relative w-full h-0.5">
                <button
                  type="button"
                  className="absolute left-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                  onClick={swap}
                >
                  Swap
                </button>
              </div>
              <div className="w-full mt-1 mb-4">
                <Inputbox
                  label="To"
                  amount={convertedAmount}
                  currencyOptions={option}
                  onCurrencyChange={(currency) => setTo(currency)}
                  selectCurrency={to}
                  amountDisable
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
              >
                Convert {from.toUpperCase()} to {to.toUpperCase()}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
