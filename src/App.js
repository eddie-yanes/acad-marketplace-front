import 'antd/dist/antd.css'
import { MarketProvider } from './context'
import AppNavigator from './containers/AppNavigator'
import {
  BrowserRouter as Router,
} from "react-router-dom";

const App = () => {

  return (
      <MarketProvider>
        <Router>
          <AppNavigator />
        </Router>
      </MarketProvider>
  );
}

export default App;
