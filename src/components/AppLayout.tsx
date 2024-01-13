import { Route, Routes } from "react-router-dom";
import Agreement from "./Agreement";

function AppLayout() {
    return (
        <Routes>
        <Route path='/' element={<Agreement/>} />
        <Route path='/agreements' element={<Agreement/>} />
      </Routes>
    );
  }

export default AppLayout