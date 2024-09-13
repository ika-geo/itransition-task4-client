import { useDispatch, useSelector } from 'react-redux';
import {
    fetchUsers,
    blockUsers,
    unblockUsers,
    deleteUsers,
    selfDelete,
    selfBlock
} from '../store/features/userSlice';
import { useEffect, useState } from 'react';
import { FaLock, FaLockOpen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import {logout} from "../store/features/authSlice";


const UserList = () => {
    const dispatch = useDispatch();
    const { users, loading, error } = useSelector((state) => state.users);
    const USER = useSelector(state=>state.auth.user)
    let isAdmin
    if(USER){
        isAdmin = USER.role === 'Admin'
    }
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [checkedAll, setCheckedAll] = useState(false);

    useEffect(() => {
        dispatch(fetchUsers());
    }, []);

    const handleSelectUser = (userId) => {
        setSelectedUsers((prev) =>
            prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
        );
    };

    const handleBlock = async () => {
        let users = selectedUsers.filter(id=>id !== USER.id)
        await dispatch(blockUsers(users));
        // if need to block yourself
        // if (selectedUsers.includes(USER.id)){
        //     toast.warning('You have been blocked')
        //     return handleLogout()
        // }
        dispatch(fetchUsers())
        setSelectedUsers([]);
        setCheckedAll(false)
    };

    const handleUnblock = async () => {
        let users = selectedUsers.filter(id=>id !== USER.id)
        await dispatch(unblockUsers(users));
        dispatch(fetchUsers())
        setSelectedUsers([]);
        setCheckedAll(false)
    };

    const handleDelete = async () => {
        let users = selectedUsers.filter(id=>id !== USER.id)
        await dispatch(deleteUsers(users));
        dispatch(fetchUsers())
        setSelectedUsers([]);
        setCheckedAll(false)
    };

    const handleSelfDelete = ()=>{
        dispatch(selfDelete(USER.id))
    }

    const handleSelfBlock=()=>{
        dispatch(selfBlock(USER.id))
    }

    const handleLogout = ()=>{
        dispatch(logout())
    }

    const handleCheckAll = (e) => {
            if (e.target.checked) {
                setSelectedUsers(users.map(user => user.id));
            } else {
                setSelectedUsers([]);
            }
            setCheckedAll(e.target.checked);
    }

    const getDate = (date)=>{
        let d = new Date(date)
        return `${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()}`
    }

    const getDateTime = (dateTime)=>{
        let d = new Date(dateTime)
        return `${d.getDate()}-${d.getMonth()+1}-${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">Some error</p>;
    return (
        <div className="p-4">
            <header className='flex justify-between items-baseline mb-8'>
                {
                    isAdmin && <div className="mb-4 flex gap-4">
                        <button onClick={handleBlock} className="flex items-center bg-gray-500 text-white p-2 rounded">
                            <span className='mr-2'>Block</span><FaLock/>
                        </button>
                        <button onClick={handleUnblock} className="bg-green-500 text-white py-2 px-3 rounded">
                            <FaLockOpen/>
                        </button>
                        <button onClick={handleDelete} className="bg-red-500 text-white py-2 px-3 rounded">
                            <MdDelete/>
                        </button>
                    </div>
                }


                <div>
                    <button onClick={handleSelfDelete} className="bg-red-500 text-white p-2 rounded mr-4">
                        Self delete
                    </button>

                    <button onClick={handleSelfBlock} className="bg-gray-500 text-white p-2 rounded">
                        Self Block
                    </button>
                </div>


                <div className='flex items-center'>
                    <h1 className='text-lg mr-4'>Hello <span className='font-extrabold uppercase'>{USER.name}</span>
                    </h1>
                    <button onClick={handleLogout} className='bg-blue-500 text-white p-2 rounded'>Logout</button>
                </div>


            </header>


            <div className="grid grid-cols-12 gap-4 p-2 mb-4">
                {
                    isAdmin && <div className="col-span-1">
                        <input
                            type="checkbox"
                            checked={checkedAll}
                            onChange={(e) => handleCheckAll(e)}
                        />
                    </div>
                }
                <div className="col-span-3 font-semibold">ID</div>
                <div className="col-span-1 font-semibold">Name</div>
                <div className="col-span-2 font-semibold">Email</div>
                <div className="col-span-1 font-semibold">Status</div>
                <div className="col-span-1 font-semibold">Role</div>
                <div className="col-span-1 font-semibold">Registration</div>
                <div className="col-span-2 font-semibold">Last login</div>
            </div>
            {users?.map(user => (
                <div key={user.id}
                     className={"grid grid-cols-12 gap-4 mb-2 p-2 border rounded " + (user.id === USER.id && "bg-cyan-100")}>
                    {
                        isAdmin && <div className="col-span-1">
                            <input
                                type="checkbox"
                                disabled={user.id === USER.id}
                                checked={selectedUsers.includes(user.id) && user.id !== USER.id}
                                onChange={() => handleSelectUser(user.id)}
                            />
                        </div>
                    }
                    <div className="col-span-3 break-words pr-3">{user.myId}</div>
                    <div className="col-span-1">{user.name}</div>
                    <div className="col-span-2">{user.email}</div>
                    <div className="col-span-1 uppercase">{user.status}</div>
                    <div className="col-span-1 uppercase">{user.role}</div>
                    <div className="col-span-1">{getDate(user.createdAt)}</div>
                    <div className="col-span-2">{getDateTime(user.lastLogin)}</div>
                </div>
            ))}
        </div>
    );
};

export default UserList;