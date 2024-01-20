import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/header/Header';
import SearchBar from './components/searchBar/SearchBar';
import Title from './components/title/Title';
import Trendings from './components/trendings/Trendings';
import { searchPhoto } from './axios/axios';
import { Router, RouterProvider, createBrowserRouter } from 'react-router-dom';
import CardLists from './components/cardLists/CardLists';
import { Slide } from 'react-awesome-reveal';
import CardDetail from './components/cardDetail/CardDetail';

function App() {
  const [bgImage, setBgImage] = useState('https://pixabay.com/get/geedac2bec0326b5eae8a1be0f544aac6a6af62d2eba6d279f13f37560e09fc797e76422f3c46f0ce252ee8f7743117bd6fe3f610e6542d69656a1ce631955858_1280.jpg')

  const bgImageSearchQuery = ['flower', 'art', 'animal', 'hide', 'monkey', 'love', 'forest', 'river', 'rose', 'lights', 'rain', 'blossom', 'dogs', 'landscape', 'cat', 'texture', 'object', 'blackrose', 'kids', 'nebula', 'tree', 'dark', 'black and white', 'dew', 'road', 'dirty', 'gorilla']

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await searchPhoto.get('', {
          params: {
            q: bgImageSearchQuery[Math.floor(Math.random() * bgImageSearchQuery.length - 1)],
            per_page: 3
          }
        })
        setBgImage(data.data.hits[Math.floor(Math.random() * 3)].largeImageURL)
      } catch (error) {
        console.log(error);
      }
    }
    fetchData()
  }, [])


  const router = createBrowserRouter([
    {
      path: '/',
      element: <>
        <Header />
        <Title />
        <SearchBar />
        <Trendings />
      </>
    },
    {
      path: '/search/:query',
      element: <>
        <Header />
        <SearchBar />
        <CardLists />
      </>
    },
    {
      path: '/search/:query/preview/:id',
      element: <>
        <Header />
        <SearchBar />
        <CardLists />
        <CardDetail />
      </>
    },
  ])

  return (
    <>
      <div className='relative h-full'>
        {/* background image */}
        <div
          style={{ backgroundImage: `url(${bgImage})` }}
          className="bg-[#d3d3d3] bg-cover bg-center bg-no-repeat absolute h-screen top-0 bottom-0 left-0 right-0 brightness-[0.85] z-[-1]" />
        {/* components */}
        <div className='z-[10]'>
          <RouterProvider router={router} />
        </div>
      </div>
    </>
  )
}

export default App;
