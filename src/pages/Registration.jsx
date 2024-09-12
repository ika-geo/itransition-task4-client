import { useDispatch } from 'react-redux';
import {registration} from '../store/features/authSlice';
import { useState } from 'react';
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

const Login = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('Admin');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email ||!password ||!name ||!role) {
            toast.warning('All fields are required');
            return;
        }
        let result = await dispatch(registration({ email, password, name, role}));
        if (result?.payload) {
            navigate('/');
        }
    };

    return (
        <div className='h-screen w-screen flex justify-center pt-40'>
            <div className="w-[500px] h-fit p-4 border rounded shadow">
                <h2 className="text-2xl mb-4">Registration</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Name"
                        className="mb-2 p-2 border border-gray-300 rounded w-full"
                    />
                    <input
                        type="email"
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


                    <select className='mb-2 p-2 border border-gray-300 rounded w-full' onChange={(e)=>setRole(e.target.value)} value={role} name='role' id="role">
                        <option value="Admin">
                            Admin
                        </option>
                        <option value="User">
                            User
                        </option>
                    </select>

                    <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full mb-4">
                        Registration
                    </button>
                    <div className='flex justify-between'>
                        <p>Have Already account?</p>
                        <Link className='text-blue-500' to='/'>Sign in</Link>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default Login;
