import React, { useEffect, useState } from 'react'
import supabaseClient from '../../functions/supabaseClient';
import sortArray from '../../functions/sortArray'
import { SkeletonTheme } from 'react-loading-skeleton';
import { CardSkeleton } from '../cardLists/CardLists';
import Card from '../card/Card';
import { Slide } from 'react-awesome-reveal';
import { useDispatch, useSelector } from 'react-redux';
import { createFavourite } from '../../redux/features/favourite';
import { createDownloads } from '../../redux/features/downloads';
import { useLocation, useNavigate } from 'react-router-dom';

function HistoFav({ type }) {
    const [data, setData] = useState()
    const histoFavState = useSelector(state => state[`${type}Reducer`])
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.authReducer)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        async function fetchData() {
            try {
                if (histoFavState.length === 0) {
                    const imageData = await supabaseClient
                        .from(type)
                        .select('*')
                    // setData(sortArray(imageData.data))
                    dispatch(type === 'favourite' ? createFavourite(imageData.data) : createDownloads(imageData.data))
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, [location])

    useEffect(() => {
        console.log(histoFavState);
        setData(sortArray(histoFavState))
    }, [histoFavState,location])

    useEffect(() => {
        if (!user) {
            navigate('/')
        }
    }, [user])

    return (
        <div className={`md:mt-36 mt-20 absolute w-full`}>
            <Slide triggerOnce direction='up' duration={250}>
                <section className='text-white text-4xl md:text-5xl font-bold flex flex-col gap-2 mt-20 select-none'>
                    <span className='w-full text-center capitalize'>{type}</span>
                </section>

                <section className="bg-white mt-12 h-full">
                    <div className="lg:mx-12 px-3 py-10 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 h-full">
                        {
                            data ? data?.map((image) =>

                                <Card favBtn={type === 'favourite' && true} alterValues={true} key={image.id} data={image} />
                            ) :

                                <SkeletonTheme baseColor="#d4d4d4" highlightColor="#858383">
                                    {
                                        Array.from({ length: 7 }).map((e, index) => <CardSkeleton key={index} />)
                                    }
                                </SkeletonTheme>
                        }
                    </div>
                    {
                        data?.length <= 0 && <div className="md:h-[38vh] h-[55vh] flex justify-center items-center">
                            <h1 className='text-center text-4xl font-semibold text-gray-900 '>No {type}</h1>
                        </div>
                    }
                </section>
            </Slide>
        </div >
    )
}

export default HistoFav