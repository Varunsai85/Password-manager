import React from 'react'

const Navbar = () => {
    return (
        <nav className='flex justify-between'>
            <div className='flex items-center gap-1 cursor-pointer'>
                <div>
                    <lord-icon
                        src="https://cdn.lordicon.com/fgxwhgfp.json"
                        trigger="hover"
                        stroke="bold"
                        colors="primary:#ffffff,secondary:#ffffff"
                        style={{width:"50px",height:"50px"}}>
                    </lord-icon>
                </div>
                <div className='font-bold text-2xl'>
                    SealPass
                </div>
            </div>
            <div className='flex gap-1 items-center'>
                <p>Source Code : </p>
                <a className='font-bold' target='_blank' href="https://github.com/Varunsai85/Password-manager">Github</a>
            </div>
        </nav>
    )
}

export default Navbar
