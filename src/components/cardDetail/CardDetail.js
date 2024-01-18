import React from 'react'
import { Zoom } from 'react-awesome-reveal'
import downloadImage from '../../functions/downloadImage';

function CardDetail({ toggle, setToggle, image }) {
    const imageInfo = [

        {
            name: "User",
            data: "Saurav12"
        },

        {
            name: "User ID",
            data: "4823"
        },
        {
            name: "Type",
            data: "Photo"
        },

        {
            name: "View",
            data: "2052"
        },

        {
            name: "Downloads",
            data: "6,8,95"
        },

        {
            name: "Likes",
            data: "6581"
        },

    ]

    const download = async () => {
        try {
            downloadImage(image)
        } catch (error) {
            console.log(error);
        }
    };

    const handleModalOpen = () => {
        setToggle(!toggle);
        // Add the 'overflow: hidden' style when the modal is open

    };
    const handleZoomClick = (event) => {
        // Prevent the click event from propagating to the parent div
        event.stopPropagation();
    };
    return (
        <div onClick={handleModalOpen} className='transition-all z-10 overflow-y-hidden flex justify-center items-center fixed  bg-[#00000080] top-0 bottom-0 left-0 right-0 bg-[rgba(0, 0, 0, 0.50)]'>
            <Zoom duration={200} className='flex justify-center items-center z-20'>
                <div onClick={handleZoomClick} className='bg-white rounded-lg max-w-[95%] max-h-[80%]'>
                    {/* header */}
                    <div className='flex justify-between items-center h-16 px-5 bg-[#F5F5F5] rounded-t-lg'>
                        <h1 className='text-[#3B4043] font-medium text-xl'>
                            Preview ID: 4877
                        </h1>
                        <div onClick={() => handleModalOpen()} className='cursor-pointer'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="33" viewBox="0 0 32 33" fill="none">
                                <path d="M11.8451 20.3409L20.2303 11.9557M20.2303 20.3409L11.8451 11.9557M11.5933 30.9631H20.4822C27.8896 30.9631 30.8525 28.0002 30.8525 20.5928V11.7039C30.8525 4.29646 27.8896 1.3335 20.4822 1.3335H11.5933C4.18586 1.3335 1.2229 4.29646 1.2229 11.7039V20.5928C1.2229 28.0002 4.18586 30.9631 11.5933 30.9631Z" stroke="#3B4043" stroke-width="2.22138" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                    </div>
                    {/* image and image details */}
                    <div className='flex flex-row px-5 gap-5 py-6'>
                        {/* imgaes */}
                        <div className='flex-1'>
                            <img className=' object-contain w-full max-h-[40rem] rounded-md' src={image} alt="" />
                        </div>
                        {/* image details */}
                        <aside className='w-[30%]'>
                            {/* download section */}
                            <div>
                                <h1 className='text-xl font-semibold text-[#3B4043] mb-5'>Download</h1>
                                <div className='flex flex-col px-2'>
                                    {
                                        imageInfo.map((e, index) =>
                                            <div key={index} className='flex flex-row justify-between items-center border px-3 py-2'>
                                                <span className='font-medium text-sm text-[#717579]'>{e.name}</span>
                                                <span className='font-semibold text-base text-[#3B4043]'>{e.data}</span>
                                            </div>
                                        )
                                    }
                                    <button onClick={download} className='w-full text-center mt-4 bg-[#4BC34B] py-2 rounded-md text-white font-semibold'>
                                        Download for free!
                                    </button>
                                </div>
                            </div>
                            {/* image informations */}
                            <div className='mt-5'>
                                <h1 className='text-xl font-semibold text-[#3B4043] mb-5'>Information</h1>
                                <div className='grid grid-cols-3 gap-4'>
                                    {
                                        imageInfo.map((e, index) =>
                                            <div key={index} className='flex flex-col justify-center items-start'>
                                                <span className='font-medium text-sm text-[#717579]'>{e.name}</span>
                                                <span className='font-semibold text-base text-[#3B4043]'>{e.data}</span>
                                            </div>
                                        )
                                    }

                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </Zoom>
        </div>
    )
}

export default CardDetail