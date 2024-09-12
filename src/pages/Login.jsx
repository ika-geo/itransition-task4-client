import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/features/authSlice';
import { useState } from 'react';
import {Link} from "react-router-dom";

const Login = () => {
    const dispatch = useDispatch();
    const { loading } = useSelector((state) => state.auth);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login({ email, password }));
    };

    return (
        <div className='h-screen w-screen flex justify-center pt-40'>
            <div className="w-[500px] h-fit p-4 border rounded shadow">
                <h2 className="text-2xl mb-4">Login</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="mb-2 p-2 border border-gray-300 rounded w-full"
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="mb-2 p-2 border border-gray-300 rounded w-full"
                    />
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full mb-4">
                        {loading ? 'Loading...' : 'Login'}
                    </button>
                    <div className='flex justify-between'>
                        <p>Have not yet account?</p>
                        <Link className='text-blue-500' to='/registration'>Register</Link>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default Login;
