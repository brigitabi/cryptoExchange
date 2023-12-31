import React, { useEffect, useState } from "react";
import axios from "axios";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Signin from "./routes/Signin";
import Signup from "./routes/Signup";
import Account from "./routes/Account";
import CoinPage from "./routes/CoinPage";
import Footer from "./components/Footer";
import { AuthContextProvider } from "./context/AuthContext";


function App() {
  const [coins, setCoins] = useState([]);

  const url =
  'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=15&page=1&sparkline=true';
 
  // const url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?CMC_PRO_API_KEY={}&limit=10';
 
  useEffect(() => {
    axios.get(url).then((response) => {
      setCoins(response.data);
      console.log(response.data)
    });
  }, [url]);

  

  return (
  <ThemeProvider>
    <AuthContextProvider>
    <Navbar /> 
    <Routes>
      <Route path='/' element={<Home coins={coins} />} />
      <Route path='signin' element={<Signin  />} />
      <Route path='signup' element={<Signup />} />
      <Route path='account' element={<Account />} />
      <Route path='/coin/:coinId' element={<CoinPage />}>
        <Route path=':coinId'/>
      </Route>
    </Routes>
    <Footer />
    </AuthContextProvider>
  </ThemeProvider>
  );
}

export default App;
