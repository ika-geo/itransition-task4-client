import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from './pages/Login';
import UserList from './pages/UserList';
import {useSelector} from "react-redux";
import Registration from "./pages/Registration";
const App = () => {
    const {user} = useSelector((state) => state.auth);
    if (!user) {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/registration" element={<Registration/>}/>
                </Routes>
            </BrowserRouter>
        )
    }
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<UserList/>}/>
            </Routes>
        </BrowserRouter>
    );
};
export default App;
