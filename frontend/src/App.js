// React
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

// Hooks, Clients, Global States, Configs, etc.
import routes from "./router.js";

// Views
import NotFound from "./views/NotFound.jsx";

// Material UI
import { ThemeProvider } from "@emotion/react";
import theme from "./utils/theme";

const App = () => {
  const getRoutes = (allRoutes) => allRoutes.map((route) => {
    if (route.route) {
      return (
        <Route
          exact
          path={route.route}
          element={route.component}
          key={route.route}
        />
      );
    }

    return null;
  });

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          {getRoutes(routes)}
          <Route path='/' element={<Navigate to='/login' />} />
          <Route exact path='/NotFound' element={<NotFound /> } />
          <Route path='*' element={<Navigate to='/NotFound' />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
