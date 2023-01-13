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
        <Route path="/" element={<Layout />}>
          <Route path="authentication" element={<Authentication />} />
          <Route path="database" element={<Database />} />
          <Route path="functions" element={<Function />} />
          <Route path="hosting" element={<Hosting />} />
          <Route path="machine-learning" element={<MachineLearning />} />
          <Route path="storage" element={<Storage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
  )
 
}

export default App;
