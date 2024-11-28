import React from 'react'

const Footer = () => {
    return (
        <footer className='border-t-8 border-neutral-900 px-8 py-2'>
            <div className='w-[40%] mx-auto flex justify-between'>
                <div className='flex flex-col gap-3'>
                    <div className='font-extrabold text-lg'>
                        Contact
                    </div>
                    <ul className='font-light flex flex-col gap-2'>
                        <li><a target='_blank' href="mailto:varunsaitsd@gmail.com">Email</a></li>
                        <li><a target='_blank' href="https://x.com/varunnadiminti">X(Formerly Twitter)</a></li>
                    </ul>
                </div>
                <div className='flex flex-col gap-3'>
                    <div className='font-extrabold text-lg'>
                        Contribute
                    </div>
                    <ul className='font-light flex flex-col gap-2'>
                        <li><a target='_blank' href="https://github.com/Varunsai85">Github</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default Footer
