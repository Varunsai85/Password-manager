import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Content = () => {
    const ref = useRef();
    const passType = useRef();
    const [form, setform] = useState({ id: "", url: "", username: "", password: "" });
    const [credentialArray, setcredentialArray] = useState([])
    const [edit_status, setedit_status] = useState(false)
    const [updateFlag, setUpdateFlag] = useState(false);

    const getData = async () => {
        let req = await fetch("http://localhost:3000");
        let data = await req.json();
        setcredentialArray(data);
    }

    useEffect(() => {
        getData();
    }, [updateFlag])


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
    const saveCredentials = async (e) => {
        if (!form.url || !form.username || !form.password) {
            alert("Please fill out all fields!");
            e.preventDefault();
            return;
        }
        if(edit_status){
            e.preventDefault();
            await fetch("http://localhost:3000",
                {
                    method:"PUT",
                    headers:{"content-type":"application/json"},
                    body:JSON.stringify({...form,id:form.id})
                }
            )
            setform({ id: "", url: "", username: "", password: "" });
            toast('Credential Updated Successfully', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark"
            });
            setedit_status(!edit_status);
            console.log(edit_status);
        }else{
            e.preventDefault();
            await fetch("http://localhost:3000", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...form, id: uuidv4() }) })
            setform({ id: "", url: "", username: "", password: "" })
            toast('Credential Saved Successfully', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark"
            });
        }
        setUpdateFlag(!updateFlag);
    }

    const deleteCredentials = async (id) => {
        let c = confirm("Are you sure to delete credentials");
        if (c) {
            try{
                await fetch("http://localhost:3000", { method: "DELETE", headers: { "content-type": "application/json" }, body: JSON.stringify({id}) })
                console.log(`The document with id:${id} is deleted`);
                toast('Credential Deleted Successfully', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark"
                });
                setUpdateFlag(!updateFlag);
            }catch(err){
                toast('Error deleting credentials. Please try again.', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark"
                });
            }
        }
    }

    const editCredentials = async (id) => {
        // Confirm user action
        const confirmEdit = confirm("Are you sure you want to edit the credentials?");
        if (confirmEdit) {
            setedit_status(!edit_status);
            setform(credentialArray.filter(i=>i.id===id)[0]);
        }
    };

    const copy = (text) => {
        toast('Copied to clipboard', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark"
        });
        navigator.clipboard.writeText(text).then(() => {console.log("Text-copied");}).catch(err => console.error("Failed to copy text: ", err));
    }

    return (
        <>
            <ToastContainer />
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
                    <div className='text-center text-xl font-bold'>Your Credentials</div>
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

                                        <td className='relative'><span>{item.username}</span><span onClick={()=>copy(item.username)} className='absolute right-2 copy-btn'><img src="icons/copy.svg" alt="copy-btn" /></span></td>

                                        <td className='relative'><span>{"●".repeat(item.password.length)}</span><span onClick={()=>copy(item.password)} className='absolute right-2 copy-btn'><img src="icons/copy.svg" alt="copy-btn" /></span></td>

                                        <td>
                                            <div className='flex w-full gap-7 justify-center items-center'>
                                                <span onClick={()=>editCredentials(item.id)}><img src="icons/edit.svg" alt="edit-btn" /></span>
                                                <span onClick={()=>deleteCredentials(item.id)}><img src="icons/delete.svg" alt="delete-btn" /></span>
                                            </div>
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>}
                </section>
            </main>
        </>
    )
}

export default Content
