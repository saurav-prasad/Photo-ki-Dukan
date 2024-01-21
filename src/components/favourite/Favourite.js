import React, { useEffect, useState } from 'react'
import supabaseClient from '../../functions/supabaseClient';
import sortArray from '../../functions/sortArray'
import { SkeletonTheme } from 'react-loading-skeleton';
import { CardSkeleton } from '../cardLists/CardLists';
import Card from '../card/Card';
import { Slide } from 'react-awesome-reveal';
import { useDispatch, useSelector } from 'react-redux';
import { createFavourite } from '../../redux/features/favourite';
import { useNavigate } from 'react-router-dom';

function Favourite() {
    const [data, setData] = useState()
    const favourite = useSelector(state => state.favouriteReducer)
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.authReducer)
    const navigate = useNavigate()

    useEffect(() => {
        async function fetchData() {
            try {
                if (favourite.length === 0) {
                    const imageData = await supabaseClient
                        .from('favourite')
                        .select('*')
                    // setData(sortArray(imageData.data))
                    dispatch(createFavourite(imageData.data))
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        setData(sortArray(favourite))
    }, [favourite])

    useEffect(() => {
        if (!user) {
            navigate('/')
        }
    }, [user])

    return (
        <div className="md:mt-10 mt-5 absolute w-full">
            <Slide triggerOnce direction='up' duration={250}>
                <section className='text-white text-4xl md:text-5xl font-bold flex flex-col gap-2 mt-20 select-none'>
                    <span className='w-full text-center'>Favourites</span>
                </section>

                <section className="bg-white mt-12 h-full">
                    <div className="lg:mx-12 px-3 py-10 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 h-full">
                        {
                            data ? data?.map((image) =>

                                <Card alterValues={true} key={image.id} data={image} />
                            ) :

                                <SkeletonTheme baseColor="#d4d4d4" highlightColor="#858383">
                                    {
                                        Array.from({ length: 7 }).map((e, index) => <CardSkeleton key={index} />)
                                    }
                                </SkeletonTheme>
                        }
                    </div>
                    {
                        data?.length <= 0 && <div className="h-[55vh] flex justify-center items-center">
                            <h1 className='text-center text-4xl font-semibold text-gray-900 '>No favourites</h1>
                        </div>
                    }
                </section>
            </Slide>
        </div >
    )
}

export default Favourite