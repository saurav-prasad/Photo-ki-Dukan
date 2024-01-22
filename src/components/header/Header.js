import React, { useEffect, useState } from 'react'
import './header.css'
import { AlignRight, Download, Star, X } from 'lucide-react'
import { Slide } from 'react-awesome-reveal'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signIn, signOut } from '../../redux/features/auth'
import supabaseClient from '../../functions/supabaseClient'


function Header() {
    // const [user, setUser] = useState()
    const dispatch = useDispatch()

    const { user } = useSelector(state => state.authReducer)

    useEffect(() => {
        async function fetchData() {
            // console.log("object");
            try {
                await supabaseClient.auth.getUser().then((value) => {
                    if (value.data?.user) {
                        //  console.log(value.data.user);
                        dispatch(signIn(value.data.user))
                        // setUser(true)
                    }
                })
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, [])

    const logOutUser = async (e) => {
        e?.preventDefault()
        try {
            const a = await supabaseClient.auth.signOut();
            // setUser(false)
            dispatch(signOut())
            // console.log(a);
        } catch (error) {
            console.log(error);
        }
    }
    const [toggleMenu, setToggleMenu] = useState(false)
    const navigate = useNavigate()

    return (
        <header className='md:mx-7 mx-2 pt-3 md:pt-6 relative z-[10]'>
            <div className='headerContainer flex justify-between items-center gap-4 rounded-lg px-3 md:px-6 py-3 md:py-4'>
                {/* header title */}
                <div>
                    <h1 onClick={() => { navigate('/') }} className='hover:underline transition-all cursor-pointer select-none font-semibold text-lg text-white'>Homepage</h1>
                </div>
                {/* signin/ signup */}
                <div className='flex justify-between items-center gap-5'>
                    <div className='md:hidden block relative z-[10]'>
                        <AlignRight onClick={() => setToggleMenu(true)} strokeWidth={3} size={27} className='cursor-pointer text-white' />
                        {
                            toggleMenu &&
                            <div className='absolute right-0 top-0'>
                                <Slide direction='down' duration={200}>
                                    <HeaderMenu logOutUser={logOutUser} user={user} setToggleMenu={setToggleMenu} />
                                </Slide>
                            </div>
                        }

                    </div>
                    {/* Login button */}
                    {
                        !user && <>
                            <div className='md:block hidden'>
                                <span onClick={() => { navigate('/login') }} className='transition-all hover:underline cursor-pointer select-none font-semibold text-lg text-white'>Login</span>
                            </div>
                            {/* signup button */}
                            <div className='md:block hidden'>
                                <span onClick={() => { navigate('/login') }}
                                    className='border-2 transition-all hover:bg-[#00000024] px-2 rounded-lg cursor-pointer select-none font-semibold text-lg text-white'
                                >
                                    Create Account
                                </span>
                            </div>
                        </>
                    }
                    {/* signup button */}
                    {user && <>
                        <div className='md:block hidden'>
                            <span onClick={() => { navigate('/favourite') }} className='transition-all hover:underline cursor-pointer select-none font-semibold text-lg text-white'>Favourite</span>
                        </div>
                        <div className='md:block hidden'>
                            <span onClick={() => { navigate('/downloads') }} className='transition-all hover:underline cursor-pointer select-none font-semibold text-lg text-white'>Downloads</span>
                        </div>
                        <div className='md:block hidden'>
                            <button
                                onClick={logOutUser}
                                className='border-2 transition-all hover:bg-[#00000024] px-2 rounded-lg cursor-pointer select-none font-semibold text-lg text-white'
                            >
                                Logout
                            </button>
                        </div></>}
                </div>
            </div>
        </header>
    )
}

export default Header


export const HeaderMenu = ({ setToggleMenu, user, logOutUser }) => {
    const navigate = useNavigate()

    return (
        <>
            <div className='flex border rounded-md justify-center items-start flex-col bg-white px-1'>
                <div className='w-full float-right flex justify-end'>
                    <X onClick={() => { setToggleMenu(false) }} size={32} className='text-right cursor-pointer pr-1 pt-1' />
                </div>
                {!user && <>
                    <span onClick={() => { navigate('/login'); setToggleMenu(false) }} className='rounded-sm transition-all font-medium hover:bg-[#f5f5f5] text-[#475467] cursor-pointer select-none pl-2 py-3 pr-10 w-full text-nowrap'>
                        Login
                    </span>
                    <span onClick={() => { navigate('/login'); setToggleMenu(false) }} className='rounded-sm transition-all font-medium hover:bg-[#f5f5f5] border-t text-[#475467] cursor-pointer select-none pl-2 py-3 pr-10 w-full text-nowrap'>
                        Create Account
                    </span>
                </>
                }
                {user && <>
                    <span onClick={() => { navigate('/favourite'); setToggleMenu(false) }} className='flex justify-start items-center gap-1 rounded-sm transition-all font-medium hover:bg-[#F5F5F5] text-[#475467] cursor-pointer select-none pl-2 py-3 pr-10 w-full text-nowrap'>
                        <Star size={20} className='text-amber-500 fill-amber-400' />Favourite
                    </span>
                    <span onClick={() => { navigate('/downloads'); setToggleMenu(false) }} className='flex justify-start items-center gap-1 rounded-sm transition-all font-medium hover:bg-[#F5F5F5] border-t text-[#475467] cursor-pointer select-none pl-2 py-3 pr-10 w-full text-nowrap'>
                        <Download size={20} className='text-amber-500 fill-amber-400' />Downloads
                    </span>
                    <span onClick={() => { logOutUser(); setToggleMenu(false) }} className='rounded-sm transition-all font-medium hover:bg-[#F5F5F5] border-t text-[#475467] cursor-pointer select-none pl-2 py-3 pr-10 w-full text-nowrap'>
                        Logout
                    </span>
                </>}
            </div >
        </>
    )
}