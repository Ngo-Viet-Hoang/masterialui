import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { dashboardTheme } from "./dashboardTheme";
import Authentication from "./pages/Authentication/Authentication";
import Database from "./pages/Database";
import Function from "./pages/Function";
import Hosting from "./pages/Hosting";
import MachineLearning from "./pages/MachineLearning";
import Storage from "./pages/Storage";
import Layout from "./components/Layout/Layout";

function App() {
  return(
 <ThemeProvider theme={dashboardTheme}>
    <BrowserRouter>
      <Routes>
        <Route path="layout" element={<Layout />}>
          <Route path="layout/authentication" element={<Authentication />} />
          <Route path="layout/database" element={<Database />} />
          <Route path="layout/functions" element={<Function />} />
          <Route path="layout/hosting" element={<Hosting />} />
          <Route path="layout/machine-learning" element={<MachineLearning />} />
          <Route path="layout/storage" element={<Storage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
  )
 
}

export default App;
