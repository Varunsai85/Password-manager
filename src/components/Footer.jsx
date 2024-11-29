import React from 'react'

const Footer = () => {
    return (
        <footer className='border-t-8 border-neutral-900 px-8 py-2'>
            <div className='flex gap-28 py-2'>
                <div className='w-[50%]'>
                    <div className='flex items-center gap-1 cursor-pointer'>
                        <div>
                            <lord-icon
                                src="https://cdn.lordicon.com/fgxwhgfp.json"
                                trigger="hover"
                                stroke="bold"
                                colors="primary:#ffffff,secondary:#ffffff"
                                style={{ width: "70px", height: "70px" }}>
                            </lord-icon>
                        </div>
                        <div className='font-bold text-3xl'>
                            SealPass
                        </div>
                    </div>
                    <p className='px-3'>
                        Your trusted password manager. Safeguard your website credentials, usernames, and passwords securely in one place. Simplify your digital life with privacy and convenience at the core. SealPass ensures your data is always protected and easily accessible when you need it.
                    </p>
                </div>
                <div className='flex gap-10'>
                    <div>
                        <h3>Contact</h3>
                        <ul>
                            <li><a target='_blank' href="mailto:varunsainadiminti@gmail.com">Email</a></li>
                            <li><a target='_blank' href="https://x.com/varunnadiminti">X(formerly twitter)</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3>Contribute</h3>
                        <ul>
                            <li><a target='_blank' href="https://github.com/Varunsai85">Github</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <hr className='border-t-neutral-700'/>
            <div className='text-center my-1'>Copyright&copy; 2024 | All rights are reserved </div>
        </footer>
    )
}

export default Footer
