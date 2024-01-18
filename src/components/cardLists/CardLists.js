import React from 'react'
import Card from '../card/Card'

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
            imageSrc: 'https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_1280.jpg',
            imageAlt: "Front of men's Basic Tee in black.",
            price: '$35',
            color: 'Black',
        },
        {
            id: 1,
            name: 'Basic Tee',
            href: '#',
            imageSrc: 'https://cdn.pixabay.com/photo/2015/11/16/16/28/bird-1045954_1280.jpg',
            imageAlt: "Front of men's Basic Tee in black.",
            price: '$35',
            color: 'Black',
        },
        {
            id: 1,
            name: 'Basic Tee',
            href: '#',
            imageSrc: 'https://cdn.pixabay.com/photo/2024/01/07/00/36/woman-8492233_640.jpg',
            imageAlt: "Front of men's Basic Tee in black.",
            price: '$35',
            color: 'Black',
        },
        // More products...
    ]
    return (
        <div className=" h-full mt-10">
            <section className='text-white text-5xl font-bold flex flex-col gap-2 mt-20 select-none'>
                <span className='w-full text-center'>Results: Technology</span>
            </section>

            <section className="bg-white mt-12">
                <div className='bg-[#767676]'>

                </div>
                <div className="lg:mx-12 px-3 py-12 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                    {products.map((product) =>
                        <Card color={product.color} price={product.price} imageAlt={product.imageAlt} imageSrc={product.imageSrc} href={product.href} name={product.name} id={product.id} />
                    )}
                </div>
            </section>
        </div>
    )
}

export default CardLists