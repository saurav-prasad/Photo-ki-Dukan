import React, { useEffect, useState } from 'react'
import Card from '../card/Card'
import './cardLists.css'
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { searchPhoto } from '../../axios/axios'
import 'react-loading-skeleton/dist/skeleton.css'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { Slide } from 'react-awesome-reveal'


function CardLists() {
    const [data, setData] = useState()
    const navigate = useNavigate()
    const imageQuery = useParams().query

    const search = ['Digital', 'Computer', 'Codierung', 'Tech', 'Netz', 'Code', 'Finanzieren', 'Marketing']
    const onClick = (e) => {
        navigate(`/search/${e}`)
    }
    useEffect(() => {
        async function fetchData() {
            try {

                const data = await searchPhoto.get('', {
                    params: {
                        q: imageQuery,
                    }
                })
                setData(data.data.hits)
                // console.log(data.data.hits);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, [imageQuery])

    return (
        <div className="md:mt-10 mt-5 absolute w-full">
            <Slide triggerOnce direction='up' duration={250}>
                <section className='text-white text-4xl md:text-5xl font-bold flex flex-col gap-2 mt-20 select-none'>
                    <span className='w-full text-center'>Results: <span className='capitalize'>{imageQuery}</span></span>
                </section>

                <section className="bg-white mt-12 h-full">
                    <div className='cardListsTabs bg-[#F5F5F5] flex flex-row justify-start items-center gap-5 px-3 py-5'>
                        {
                            search.map((e, index) =>
                                <span onClick={() => onClick(e)} className='cursor-pointer hover:bg-[#dadada5e] transition-all select-none px-10 py-2 font-medium text-sm text-[#767676] border rounded-md border-[#d1d1d1]' key={index}>
                                    {e}
                                </span>
                            )
                        }
                    </div>
                    <div className="lg:mx-12 px-3 py-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 h-full">
                        {
                            data ? data.map((image) =>
                                <Card key={image.id} data={image} />
                            ) :
                                <SkeletonTheme baseColor="#d4d4d4" highlightColor="#858383">
                                    {
                                        Array.from({ length: 7 }).map((e, index) => <CardSkeleton key={index} />)
                                    }
                                </SkeletonTheme>
                        }
                    </div>
                    {data?.length <= 0 && <div className="h-[55vh] flex justify-center items-center">
                        <h1 className='text-center text-4xl font-semibold text-gray-900 '>Image not found!</h1>
                    </div>}
                </section>
            </Slide>
        </div>
    )
}

export default CardLists


export const CardSkeleton = () => {
    return (
        <>
            <div className="relative">
                <div className="h-64 w-full ">
                    <Skeleton
                        className="h-full w-full object-cover object-center rounded-md cursor-pointer hover:brightness-[0.83] transition-brightness duration-450"
                    />
                </div>
                <div className="mt-3 flex justify-start items-center gap-3">
                    {
                        Array.from({ length: 3 }).map((e, index) =>
                            <Skeleton width={30} key={index} className='bg-[#f5f5f5] text-[#767676] font-normal px-2 capitalize' />
                        )
                    }
                </div>
            </div>
        </>
    )
}