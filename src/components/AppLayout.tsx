import { Route, Routes } from "react-router-dom";
import Agreement from "./Agreement";
import Compensation from "./Compensation";

function AppLayout() {
  return (
    <Routes>
      <Route path='/' element={<Agreement />} />
      <Route path='/agreements' element={<Agreement />} />
      <Route path='/compensation' element={<Compensation />} />
    </Routes>
  );
}

export default AppLayout