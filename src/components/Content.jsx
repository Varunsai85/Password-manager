import React from 'react'
import { useRef, useState,useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Content = () => {
    const ref = useRef();
    const passType = useRef();
    const [form, setform] = useState({url: "", username: "", password: "" });
    const [credentialArray, setcredentialArray] = useState([])

    const getData=async()=>{
        let req=await fetch("http://localhost:3000");
        let data=await req.json();
        setcredentialArray(data);
    }

    useEffect(() => {
      getData();
    }, [credentialArray])
    

    function passVisibility() {
        if (ref.current.src.includes("icons/eye-open.svg")) {
            ref.current.src = "icons/eye-close.svg";
            passType.current.type = "password";
        } else {
            ref.current.src = "icons/eye-open.svg"
            passType.current.type = "text";
        }
    }
    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    }
    const saveCredentials = async(e) => {
        if (!form.url || !form.username || !form.password) {
            alert("Please fill out all fields!");
            e.preventDefault();
            return;
        }
        e.preventDefault();
        console.log({...form,id:uuidv4()});
        await fetch("http://localhost:3000",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({...form,id:uuidv4()})})
    }

    const deleteCredentials=async()=>{
        let c=confirm("Are you sure to delete password");
        if(c){
            await fetch("http://localhost:3000",{method:"DELETE",headers:{"content-type":"application.json"},body:JSON.stringify(form)})
        }
    }

    const copy=(text)=>{
        
    }

    return (
        <main className='mt-6'>
            <section className='text-shadow w-full'>
                <div className='flex w-full justify-center font-bold text-5xl'>
                    Save Your Passwords
                </div>
                <div className='flex w-full justify-center font-bold text-5xl'>
                    Using SealPass
                </div>
            </section>
            <form className='flex flex-col gap-3 w-[75%] mx-auto my-6'>
                <input onChange={handleChange} value={form.url} className='bg-neutral-900 rounded-full py-3 px-5 outline-none w-full hover:bg-neutral-500' type="text" name='url' placeholder='Website URL' />
                <div className='flex gap-3'>
                    <input onChange={handleChange} value={form.username} autoComplete="username" className='bg-neutral-900 rounded-full py-3 px-5 outline-none w-full hover:bg-neutral-500' type="text" name='username' placeholder='Username' />
                    <div className='group relative w-full hover:bg-neutral-500 rounded-full'>
                        <input onChange={handleChange} value={form.password} ref={passType} className='bg-neutral-900 relative rounded-full py-3 px-5 outline-none w-full group-hover:bg-neutral-500' type="password" name='password' placeholder='Password' autoComplete="current-password" required />
                        <span className='absolute right-2 top-1 rounded-r-full bg-neutral-900 p-2 group-hover:bg-neutral-500'><img ref={ref} className='invert size-6 cursor-pointer' onClick={passVisibility} src="icons/eye-close.svg" alt="hide" /></span>
                    </div>
                </div>
                <div className='flex justify-center font-semibold'>
                    <button onClick={saveCredentials} className='flex justify-center items-center bg-slate-900 py-3 px-5 rounded-full w-[30%] cursor-pointer gap-1 hover:bg-slate-800'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover"
                            stroke="bold"
                            colors="primary:#ffffff,secondary:#ffffff"
                            style={{ width: "22px", height: "22px" }}>
                        </lord-icon>Save</button>
                </div>
            </form>
            <section className='w-[75%] mx-auto'>
                {credentialArray.length === 0 && <div className='text-center mt-5 font-bold text-3xl'>No Passwords to Show</div>}
                {credentialArray.length != 0 &&
                    <table className='w-full'>
                        <thead className='bg-white text-black text-center'>
                            <tr>
                                <th>WebSite</th>
                                <th>Username</th>
                                <th>Password</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='text-center'>
                            {credentialArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='cursor-pointer'><a target='_blank' href={item.url}>{item.url}</a></td>

                                    <td className='relative'><span>{item.username}</span><span onClick={copy(item.username)} className='absolute right-2 copy-btn'><img src="icons/copy.svg" alt="copy-btn" /></span></td>

                                    <td className='relative'><span>{"●".repeat(item.password.length)}</span><span onClick={copy(item.password)} className='absolute right-2 copy-btn'><img src="icons/copy.svg" alt="copy-btn" /></span></td>

                                    <td>
                                        <div className='flex w-full gap-7 justify-center items-center'>
                                            <span><img src="icons/edit.svg" alt="edit-btn" /></span>
                                            <span onClick={deleteCredentials}><img src="icons/delete.svg" alt="delete-btn" /></span>
                                        </div>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>}
            </section>
        </main>
    )
}

export default Content
