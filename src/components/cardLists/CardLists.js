import React from 'react'
import Card from '../card/Card'
import './cardLists.css'

function CardLists() {
    const products = [
        {
            id: 1,
            name: 'Basic Tee',
            href: '#',
            imageSrc: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
            imageAlt: "Front of men's Basic Tee in black.",
            price: '$35',
            color: 'Black',
        },
        {
            id: 1,
            name: 'Basic Tee',
            href: '#',
            imageSrc: 'https://cdn.pixabay.com/photo/2018/01/12/14/24/night-3078326_1280.jpg',
            imageAlt: "Front of men's Basic Tee in black.",
            price: '$35',
            color: 'Black',
        },
        {
            id: 1,
            name: 'Basic Tee',
            href: '#',
            imageSrc: 'https://cdn.pixabay.com/photo/2016/05/24/16/48/mountains-1412683_1280.png',
            imageAlt: "Front of men's Basic Tee in black.",
            price: '$35',
            color: 'Black',
        },
        {
            id: 1,
            name: 'Basic Tee',
            href: '#',
            imageSrc: 'https://cdn.pixabay.com/photo/2024/01/07/00/36/woman-8492233_1280.jpg',
            imageAlt: "Front of men's Basic Tee in black.",
            price: '$35',
            color: 'Black',
        },
        {
            id: 1,
            name: 'Basic Tee',
            href: '#',
            imageSrc: 'https://cdn.pixabay.com/photo/2024/01/07/14/12/man-8493244_1280.jpg',
            imageAlt: "Front of men's Basic Tee in black.",
            price: '$35',
            color: 'Black',
        },
        {
            id: 1,
            name: 'Basic Tee',
            href: '#',
            imageSrc: 'https://cdn.pixabay.com/photo/2023/06/10/14/48/giraffe-8054174_1280.jpg',
            imageAlt: "Front of men's Basic Tee in black.",
            price: '$35',
            color: 'Black',
        },

        // More products...
    ]
    const search = ['Finance', 'Technology', 'Fitness', 'Fitness', 'Technology', 'Fitness', 'Fitness']

    return (
        <div className="md:mt-10 mt-5 absolute w-full">
            <section className='text-white text-4xl md:text-5xl font-bold flex flex-col gap-2 mt-20 select-none'>
                <span className='w-full text-center'>Results: Technology</span>
            </section>

            <section className="bg-white mt-12 h-full">
                <div className='cardListsTabs bg-[#F5F5F5] flex flex-row justify-start items-center gap-5 px-3 py-5'>
                    {
                        search.map((e, index) =>
                            <span className='cursor-pointer hover:bg-[#dadada5e] transition-all select-none px-10 py-2 font-medium text-sm text-[#767676] border rounded-md border-[#d1d1d1]' key={index}>
                                {e}
                            </span>
                        )
                    }
                </div>
                <div className="lg:mx-12 px-3 py-12 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 h-full">
                    {products.map((product, index) =>
                        <Card key={index} color={product.color} price={product.price} imageAlt={product.imageAlt} imageSrc={product.imageSrc} href={product.href} name={product.name} id={product.id} />
                    )}
                </div>
            </section>
        </div>
    )
}

export default CardLists