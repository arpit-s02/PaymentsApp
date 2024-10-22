import { Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import Payment from "./pages/Payment";
import PaymentResultWrapper from "./pages/PaymentResultWrapper";

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/pay" element={<Payment />} />
      <Route path="/paymentResult" element={<PaymentResultWrapper />} />
    </Routes>
  )
}

export default App
