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
    const [confirmAction, setconfirmAction] = useState(null);
    const [dialog, setdialog] = useState(false)
    const [choice, setchoice] = useState("")

    const serverURL=`${import.meta.env.VITE_SERVER_URL}`;

    const getData = async () => {
        let req = await fetch(serverURL);
        let data = await req.json();
        setcredentialArray(data);
    }

    useEffect(() => {
        getData();
    }, [updateFlag])

    const confirmChoice = (onConfirm) => {
        setconfirmAction(()=>onConfirm);
        setdialog(true);
    }

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
        if (edit_status) {
            e.preventDefault();
            await fetch(serverURL,
                {
                    method: "PUT",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify({ ...form, id: form.id })
                }
            )
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
            setform({ id: "", url: "", username: "", password: "" });
            setedit_status(!edit_status);
            console.log(edit_status);
        } else {
            e.preventDefault();
            await fetch(serverURL, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ ...form, id: uuidv4() }) })
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
            setform({ id: "", url: "", username: "", password: "" })
        }
        setUpdateFlag(!updateFlag);
    }

    const deleteCredentials = async (id) => {
        setchoice("delete");
        confirmChoice(async () => {
            try {
                const res=await fetch(serverURL, { 
                    method: "DELETE", 
                    headers: { "content-type": "application/json" }, 
                    body: JSON.stringify({ id }) 
                });
                if(res.ok){
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
                }else{
                    toast('Failed to delete credential', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark"
                    });
                    throw new Error('Failed to delete the credential');
                }
            } catch (err) {
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
        })
    }

    const editCredentials = async (id) => {
        setchoice("edit")
        confirmChoice(()=>{
            try{
                setedit_status(!edit_status);
                setform(credentialArray.filter(i => i.id === id)[0]);
            }catch(err){
                console.log(`Failed to edit with error ${err}`);
            }
        })
    };

    const copy = async(text) => {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            try {
                await navigator.clipboard.writeText(text);
                console.log("Text copied to clipboard!");
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
            } catch (err) {
                console.error("Failed to copy text: ", err);
            }
        } else {
            // Fallback for unsupported environments
            const textarea = document.createElement("textarea");
            textarea.value = text;
            textarea.style.position = "fixed"; // Prevent scrolling to the bottom of the page
            document.body.appendChild(textarea);
            textarea.focus();
            textarea.select();
            try {
                document.execCommand("copy");
                console.log("Text copied to clipboard using fallback!");
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
            } catch (err) {
                console.error("Fallback: Unable to copy text", err);
            }
            document.body.removeChild(textarea);
        }
    }

    return (
        <>
            {dialog &&
                <div className='flex glass-filter mx-auto w-[100%] h-[100%] justify-center items-center z-10 fixed top-0 left-0 rounded-lg'>
                    <div className='confirm-btn bg-black w-[35%] h-[35%] rounded-xl flex flex-col items-center justify-center gap-6'>
                        <div className='font-bold text-2xl'>
                            Are you sure to {choice} credentials
                        </div>
                        <div className='flex gap-14'>
                            <button onClick={() => { confirmAction(); setdialog(false); }} className='hover:bg-white hover:text-black font-bold px-5 py-2 rounded-full outline outline-white active:bg-slate-200'>Yes</button>
                            <button onClick={() => setdialog(false)} className='hover:bg-white hover:text-black font-bold px-5 py-2 rounded-full outline outline-white active:bg-slate-200'>Cancel</button>
                        </div>
                    </div>
                </div>
            }
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
                    <input onChange={handleChange} value={form.url} className='bg-neutral-900 rounded-full py-3 px-5 outline-none w-full hover:bg-neutral-800 focus-within:outline-white focus-within:outline' type="text" name='url' placeholder='Website URL' />
                    <div className='flex gap-3'>
                        <input onChange={handleChange} value={form.username} autoComplete="username" className='bg-neutral-900 rounded-full py-3 px-5 outline-none w-full hover:bg-neutral-800 focus-within:outline-white focus-within:outline' type="text" name='username' placeholder='Username' />
                        <div className='group relative w-full hover:bg-neutral-800 rounded-full focus-within:outline-white focus-within:outline'>
                            <input onChange={handleChange} value={form.password} ref={passType} className='bg-neutral-900 relative rounded-full py-3 px-5 outline-none w-full group-hover:bg-neutral-800' type="password" name='password' placeholder='Password' autoComplete="current-password" required />
                            <span className='absolute right-2 top-1 rounded-r-full bg-neutral-900 p-2 group-hover:bg-neutral-800'><img ref={ref} className='invert size-6 cursor-pointer' onClick={passVisibility} src="icons/eye-close.svg" alt="hide" /></span>
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
                    <div className='text-center text-xl font-bold mb-3'>Your Credentials</div>
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

                                        <td className='relative'><span>{item.username}</span><span onClick={() => copy(item.username)} className='absolute right-2 copy-btn'><img src="icons/copy.svg" alt="copy-btn" /></span></td>

                                        <td className='relative'><span>{"●".repeat(item.password.length)}</span><span onClick={() => copy(item.password)} className='absolute right-2 copy-btn'><img src="icons/copy.svg" alt="copy-btn" /></span></td>

                                        <td>
                                            <div className='flex w-full gap-7 justify-center items-center'>
                                                <span onClick={() => editCredentials(item.id)}><img src="icons/edit.svg" alt="edit-btn" /></span>
                                                <span onClick={() => deleteCredentials(item.id)}><img src="icons/delete.svg" alt="delete-btn" /></span>
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
