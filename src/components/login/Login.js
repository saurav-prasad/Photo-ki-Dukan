import { useState, useEffect } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useNavigate } from 'react-router-dom'
import { Zoom } from 'react-awesome-reveal'
import { useDispatch } from 'react-redux'
import { signIn } from '../../redux/features/auth'
import './login.css'
import supabaseClient from '../../functions/supabaseClient'


export default function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [session, setSession] = useState(null)

    useEffect(() => {
        supabaseClient.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        const { data: { subscription }, } = supabaseClient.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })

        return () => subscription.unsubscribe()
    }, [])

    const handleZoomClick = (event) => {
        event.stopPropagation();
    };

    if (!session) {
        return (
            <div onClick={() => navigate(-1)} className='transition-all z-10 overflow-y-hidden flex justify-center items-center fixed bg-[#00000080] top-0 bottom-0 left-0 right-0 bg-[rgba(0, 0, 0, 0.50)]'>
                <Zoom duration={200} className='loginContainer z-20 '>
                    <div onClick={handleZoomClick} className='loginSubContainer py-7 px-5 bg-[#F5F5F5] rounded-lg sm:min-w-[70vw] md:min-w-[50vw] lg:min-w-[40vw] xl:min-w-[30vw] sm:rounded-lg sm:max-w-[10%] sm:max-h-[80%]'>
                        {/* modal close icon */}
                        <div className='flex justify-end items-center h-16 px-5 bg-[#F5F5F5] rounded-t-lg'>
                            <div onClick={() => navigate('/')} className='cursor-pointer'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="33" viewBox="0 0 32 33" fill="none">
                                    <path d="M11.8451 20.3409L20.2303 11.9557M20.2303 20.3409L11.8451 11.9557M11.5933 30.9631H20.4822C27.8896 30.9631 30.8525 28.0002 30.8525 20.5928V11.7039C30.8525 4.29646 27.8896 1.3335 20.4822 1.3335H11.5933C4.18586 1.3335 1.2229 4.29646 1.2229 11.7039V20.5928C1.2229 28.0002 4.18586 30.9631 11.5933 30.9631Z" stroke="#3B4043" strokeWidth="2.22138" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                        <Auth providers={['google']} supabaseClient={supabaseClient} appearance={{ theme: ThemeSupa }} />
                    </div>
                </Zoom>
            </div>
        )
    }
    else {
        // add the user to redux store
        dispatch(signIn(session.user))
        navigate('/')
        return (<></>)
    }
}