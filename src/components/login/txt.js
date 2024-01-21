import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClient } from '@supabase/supabase-js'
import React, { useEffect, useState } from 'react'
import { Zoom } from 'react-awesome-reveal'
import { useNavigate } from 'react-router-dom'


const supabase = createClient(
    "https://kheueafubbxnachgmzyh.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtoZXVlYWZ1YmJ4bmFjaGdtenloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDU3NDgyOTYsImV4cCI6MjAyMTMyNDI5Nn0.SQ8Qj5Ecp8SnUq1Jd02_sgvudShlweY_LQJ02FPdQ-E"
)
function Login() {
    const navigate = useNavigate()
    const [user, setUser] = useState()

    useEffect(() => {
        async function fetchData() {
            try {
                await supabase.auth.getUser().then((value) => {
                    if (value.data?.user) {
                        console.log(value.data.user);
                        setUser(true)
                    }
                })
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, [])

    supabase.auth.onAuthStateChange(async (event) => {
        console.log(event);
        user && navigate('/')
        if (event !== 'SIGNED_OUT') {
            // navigate('/')
        } else {
            navigate('/login')
            console.log("object2");
        }
    })

    return (
        <div className='transition-all z-10 overflow-y-hidden flex justify-center items-center fixed bg-[#00000080] top-0 bottom-0 left-0 right-0 bg-[rgba(0, 0, 0, 0.50)]'>
            <Zoom duration={200} className='detailContainer z-20 width-[70vw]'>
                <div className='detailSubContainer py-7 px-5 bg-[#F5F5F5] rounded-lg md:min-w-[50vw] md:rounded-lg md:max-w-[95%] md:max-h-[80%]'>
                    {/* header */}
                    <div className='flex justify-end items-center h-16 px-5 bg-[#F5F5F5] rounded-t-lg'>
                        <div onClick={() => navigate('/')} className='cursor-pointer'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="33" viewBox="0 0 32 33" fill="none">
                                <path d="M11.8451 20.3409L20.2303 11.9557M20.2303 20.3409L11.8451 11.9557M11.5933 30.9631H20.4822C27.8896 30.9631 30.8525 28.0002 30.8525 20.5928V11.7039C30.8525 4.29646 27.8896 1.3335 20.4822 1.3335H11.5933C4.18586 1.3335 1.2229 4.29646 1.2229 11.7039V20.5928C1.2229 28.0002 4.18586 30.9631 11.5933 30.9631Z" stroke="#3B4043" strokeWidth="2.22138" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                    </div>
                    <Auth
                        supabaseClient={supabase}
                        appearance={{ theme: ThemeSupa }}
                        theme='dark'
                        providers={[""]}
                    />
                </div>
            </Zoom>
        </div>
    )
}

export default Login