import React, { useEffect, useState } from 'react'
import { Zoom } from 'react-awesome-reveal'
import downloadImage from '../../functions/downloadImage';
import './cardDetail.css'
import Skeleton from 'react-loading-skeleton';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { searchPhoto } from '../../axios/axios';
import sliceString from '../../functions/sliceString';
import { Share, Star } from 'lucide-react';
import supabaseClient from '../../functions/supabaseClient';
import { useDispatch, useSelector } from 'react-redux';
import { addFavourite, deleteFavourite } from '../../redux/features/favourite';
import { addDownloads } from '../../redux/features/downloads';


function CardDetail({ showAlert }) {
    const [cardData, setCardData] = useState()
    const navigate = useNavigate()
    const previewId = useParams().id
    const [fav, setFav] = useState(false)
    const { user } = useSelector(state => state.authReducer)
    const dispatch = useDispatch()
    const currentLocation = useLocation().pathname

    const shareCurrentUrl = () => {
        let currentUrl = window.location.href;
        if (!currentLocation.startsWith('/search')) {
            currentUrl = `/preview${currentLocation.split('/preview')[1]}`
        }

        if (navigator.share) {
            navigator.share({
                title: 'Share the URL',
                url: currentUrl,
            })
                .then(() => console.log('Shared successfully'))
                .catch((error) => console.error('Error sharing:', error));
        } else {
            alert(`Share this URL: ${currentUrl}`);
        }
    };

    const [imageLoad, setimageLoad] = useState()

    const addToFav = async () => {
        try {
            const { data, error } = await supabaseClient
                .from('favourite')
                .insert([
                    {
                        image_id: cardData.id,
                        user_id: user.id,
                        image_url: cardData?.largeImageURL,
                        tags: cardData?.tags
                    },
                ]).select()
            setFav(true)
            !error && dispatch(addFavourite(data[0]))
        } catch (error) {
            console.log(error);
        }
    };

    const addToDownloads = async () => {
        try {
            const { data, error } = await supabaseClient
                .from('downloads')
                .insert([
                    {
                        image_id: cardData.id,
                        user_id: user.id,
                        image_url: cardData?.largeImageURL,
                        tags: cardData?.tags
                    },
                ]).select()
            !error && dispatch(addDownloads(data[0]))
        } catch (error) {
            console.log(error);
        }
    };
    const removeFromFav = async () => {
        try {

            const { error } = await supabaseClient
                .from('favourite')
                .delete()
                .eq('user_id', user.id)
                .eq('image_id', cardData.id)

            setFav(false)
            !error && dispatch(deleteFavourite({ id: cardData.id }))
        } catch (error) {
            console.log(error);
        }
    };

    const location = useLocation()

    const handleModalOpen = () => {
        location.pathname.split('/preview')[0].startsWith('/search') && navigate(location.pathname.split('/preview')[0])
        !location.pathname.split('/preview')[0].startsWith('/search') && navigate('/')
        location.pathname.split('/preview')[0].startsWith('/favourite') && navigate('/favourite')
        location.pathname.split('/preview')[0].startsWith('/downloads') && navigate('/downloads')

        console.log();
    };

    const handleZoomClick = (event) => {
        event.stopPropagation();
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const imageData = await searchPhoto.get('', {
                    params: {
                        id: previewId,
                    }
                })
                setCardData(imageData.data.hits[0])
                const favCheck = await supabaseClient.from('favourite').select('*').eq('user_id', user?.id).eq('image_id', previewId)
                favCheck.data.length > 0 && setFav(true)
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, [previewId])

    const onFavClick = () => {
        if (user) {
            if (fav) {
                removeFromFav()
                showAlert('Image removed from favourite')
            }
            else {
                addToFav()
                showAlert('Image added to favourite')
            }
        }
        else {
            showAlert('Sign-in first!')
        }
    }
    return (
        <>
            <div onClick={handleModalOpen} className='transition-all z-10 overflow-y-hidden flex justify-center items-center fixed bg-[#00000080] top-0 bottom-0 left-0 right-0 bg-[rgba(0, 0, 0, 0.50)]'>
                <Zoom duration={200} className='detailContainer flex justify-center items-center z-20'>
                    <div onClick={handleZoomClick} className={`detailSubContainer bg-white md:rounded-lg md:max-w-[95%] md:max-h-[80%]`}>
                        {/* header */}
                        <div className='flex justify-between items-center h-16 px-5 bg-[#F5F5F5] rounded-t-lg'>
                            <h1 onClick={() => { showAlert("lfsadl") }} className='text-[#3B4043] font-medium text-xl'>
                                Preview ID: {previewId}
                            </h1>
                            <div onClick={() => handleModalOpen()} className='cursor-pointer'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="33" viewBox="0 0 32 33" fill="none">
                                    <path d="M11.8451 20.3409L20.2303 11.9557M20.2303 20.3409L11.8451 11.9557M11.5933 30.9631H20.4822C27.8896 30.9631 30.8525 28.0002 30.8525 20.5928V11.7039C30.8525 4.29646 27.8896 1.3335 20.4822 1.3335H11.5933C4.18586 1.3335 1.2229 4.29646 1.2229 11.7039V20.5928C1.2229 28.0002 4.18586 30.9631 11.5933 30.9631Z" stroke="#3B4043" strokeWidth="2.22138" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        </div>
                        {/* image and image details */}
                        <div className='px-1 md:px-4 md:py-6 py-5'>
                            <div className='flex flex-col md:flex-row gap-5'>
                                {/* imgaes */}
                                <div className={`flex-1 ${!imageLoad && 'md:w-[50vw]'}`}>
                                    {
                                        <img onLoad={() => { setimageLoad(true) }} className=' object-contain w-full max-h-[80vh]  rounded-md' src={cardData?.largeImageURL} alt="" />
                                    }
                                    {!imageLoad && <div className='w-full'>
                                        <Skeleton className='text-[30em] object-containrounded-md' baseColor="#d4d4d4" highlightColor="#858383" />
                                    </div>}
                                </div>
                                {/* image details */}
                                <aside className='md:w-[30%] min-w-60 px-1'>
                                    {/* download section */}
                                    <div>
                                        <div className='flex justify-between items-center mb-5'>
                                            <h1 className='text-xl font-semibold text-[#3B4043]'>Download</h1>
                                            <div className='flex flex-row justify-start items-center gap-5'>
                                                <Share onClick={shareCurrentUrl} className='cursor-pointer' />
                                                <Star onClick={onFavClick} size={27} className={`cursor-pointer text-amber-500 ${fav && "fill-amber-400"}`} />
                                            </div>

                                        </div>
                                        <div className=''>
                                            <DownloadMenu addToDownloads={addToDownloads} data={cardData} />
                                        </div>
                                    </div>
                                    {/* image informations */}
                                    <div className='md:mt-6 mt-8'>
                                        <h1 className='text-xl font-semibold text-[#3B4043] mb-4'>Information</h1>
                                        <ImageInfos user={cardData?.user} userId={cardData?.user_id} type={cardData?.type} views={cardData?.views} downloads={cardData?.downloads} likes={cardData?.likes} />
                                    </div>
                                </aside>
                            </div>
                            {cardData?.tags && <div className='px-1 mt-7 md:mt-5 flex flex-row justify-start flex-wrap items-center gap-2 '>
                                <h1 className='font-semibold text-[#3B4043]'>Tags:</h1>
                                {
                                    cardData?.tags.split(', ').map((e, index) =>
                                        <span className='text-[#767676] rounded-sm py-1  px-3 text-xs bg-[#F5F5F5]' key={index}>{e}</span>
                                    )
                                }
                            </div>}
                        </div>
                    </div>
                </Zoom>
            </div>
        </>
    )
}

export default CardDetail


export const DownloadMenu = ({ data, addToDownloads }) => {
    const [selectSize, setSelectSize] = useState('small')
    const [downloadUrl, setDownloadUrl] = useState(data?.previewURL)


    const download = async () => {
        try {
            if (!downloadUrl) {
                downloadImage(data.previewURL)
                addToDownloads()
            }
            else {
                downloadImage(downloadUrl)
                addToDownloads()
            }
        } catch (error) {
            console.log(error);
        }
    };
    const onClick = (e, imageUrl) => {
        setSelectSize(e)
        setDownloadUrl(imageUrl)
    }

    return (
        <>
            <dl className="divide-y divide-[#DEE8F4] border border-[#DEE8F4] rounded-lg">
                {/* small */}
                <div onClick={() => { onClick('small', data.previewURL) }} className={`cursor-pointer hover:bg-[#F5F5F5] transition-all flex flex-row justify-between items-center py-3 px-3 ${(selectSize === 'small') && 'bg-[#F5F5F5]'}`}>
                    <span className='font-medium text-sm text-[#475467]'>Small</span>
                    <div className=' flex flex-row justify-between items-center gap-3'>
                        <span className='font-medium text-base text-[#475467]'>{data?.previewWidth}x{data?.previewHeight}</span>
                        {
                            selectSize === 'small' ? <div className='rounded-full bg-[#4BC34B] w-4 h-4 flex justify-center items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 10 10" fill="none">
                                    <path d="M8.0709 3.19971L3.99837 7.27224L2.14722 5.42109" stroke="white" strokeWidth="1.48092" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div> :
                                <div className='rounded-full bg-white w-4 h-4 flex justify-center items-center border border-[#DEE8F4]' />
                        }
                    </div>
                </div>
                {/* medium */}
                <div onClick={() => { onClick('medium', data.webformatURL) }} className={`cursor-pointer hover:bg-[#F5F5F5] transition-all flex flex-row justify-between items-center py-3 px-3 ${(selectSize === 'medium') && 'bg-[#F5F5F5]'}`}>
                    <span className='font-medium text-sm text-[#475467]'>Medium</span>
                    <div className=' flex flex-row justify-between items-center gap-3'>
                        <span className='font-medium text-base text-[#475467]'>{data?.webformatWidth}x{data?.webformatHeight}</span>
                        {
                            selectSize === 'medium' ? <div className='rounded-full bg-[#4BC34B] w-4 h-4 flex justify-center items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 10 10" fill="none">
                                    <path d="M8.0709 3.19971L3.99837 7.27224L2.14722 5.42109" stroke="white" strokeWidth="1.48092" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div> :
                                <div className='rounded-full bg-white w-4 h-4 flex justify-center items-center border border-[#DEE8F4]' />
                        }
                    </div>
                </div>
                {/* original */}
                <div onClick={() => { onClick('large', data.largeImageURL) }} className={`cursor-pointer hover:bg-[#F5F5F5] transition-all flex flex-row justify-between items-center py-3 px-3 ${(selectSize === 'large') && 'bg-[#F5F5F5]'}`}>
                    <span className='font-medium text-sm text-[#475467]'>Large</span>
                    <div className=' flex flex-row justify-between items-center gap-3'>
                        <span className='font-medium text-base text-[#475467]'>{data?.imageWidth}x{data?.imageHeight}</span>
                        {
                            selectSize === 'large' ? <div className='rounded-full bg-[#4BC34B] w-4 h-4 flex justify-center items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 10 10" fill="none">
                                    <path d="M8.0709 3.19971L3.99837 7.27224L2.14722 5.42109" stroke="white" strokeWidth="1.48092" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div> :
                                <div className='rounded-full bg-white w-4 h-4 flex justify-center items-center border border-[#DEE8F4]' />
                        }
                    </div>
                </div>
            </dl>
            <button onClick={download} className='w-full h-12 text-center mt-5 md:mt-4 transition-all hover:bg-[#49b649] bg-[#4BC34B] py-3 rounded-md text-white font-semibold'>
                Download for free!
            </button>
        </>
    )
}

export const ImageInfos = ({ user, userId, type, views, downloads, likes }) => {
    return (
        <>
            <div className='grid grid-cols-3 gap-4'>

                <div className='flex flex-col justify-center items-start'>
                    <span className='font-medium text-sm text-[#717579] truncate'>User</span>
                    <span className='font-semibold text-base text-[#3B4043] truncate'>{sliceString(user, 10)}</span>
                </div>
                <div className='flex flex-col justify-center items-start'>
                    <span className='font-medium text-sm text-[#717579] truncate'>User ID</span>
                    <span className='font-semibold text-base text-[#3B4043] truncate'>{userId}</span>
                </div>
                <div className='flex flex-col justify-center items-start'>
                    <span className='font-medium text-sm text-[#717579] truncate'>Type</span>
                    <span className='font-semibold text-base text-[#3B4043] truncate'>{type}</span>
                </div>
                <div className='flex flex-col justify-center items-start'>
                    <span className='font-medium text-sm text-[#717579] truncate'>Views</span>
                    <span className='font-semibold text-base text-[#3B4043] truncate'>{views?.toLocaleString()}</span>
                </div>
                <div className='flex flex-col justify-center items-start'>
                    <span className='font-medium text-sm text-[#717579] truncate'>Downloads</span>
                    <span className='font-semibold text-base text-[#3B4043] truncate'>{downloads?.toLocaleString()}</span>
                </div>
                <div className='flex flex-col justify-center items-start'>
                    <span className='font-medium text-sm text-[#717579] truncate'>Likes</span>
                    <span className='font-semibold text-base text-[#3B4043] truncate'>{likes?.toLocaleString()}</span>
                </div>

            </div>
        </>
    )
}