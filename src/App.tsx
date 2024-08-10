import Loading from "./components/Common/Loading/Loading";
import Message from "./components/Common/Message/Message";
import { GlobalContextComp } from "./contexts/GlobalContext";
import ReservationPage from "./pages/ReservationPage/ReservationPage";
import AppRoutes from "./routes/AppRoutes";

function App() {
    return (
        <div className="App">
            <GlobalContextComp>
                <AppRoutes />
                <Loading />
                <Message />
            </GlobalContextComp>
        </div>
    );
}

export default App;
