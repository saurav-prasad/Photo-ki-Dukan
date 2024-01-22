import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/header/Header';
import SearchBar from './components/searchBar/SearchBar';
import Title from './components/title/Title';
import Trendings from './components/trendings/Trendings';
import { searchPhoto } from './axios/axios';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import CardLists from './components/cardLists/CardLists';
import CardDetail from './components/cardDetail/CardDetail';
import Login from './components/login/Login';
import Downloads from './components/downloads/Downloads';
import Favourite from './components/favourite/Favourite';
import Error from './components/error/Error';
import HistoFav from './components/histoFav/HistoFav';

function App() {
  const [bgImage, setBgImage] = useState('https://pixabay.com/get/geedac2bec0326b5eae8a1be0f544aac6a6af62d2eba6d279f13f37560e09fc797e76422f3c46f0ce252ee8f7743117bd6fe3f610e6542d69656a1ce631955858_1280.jpg')

  const bgImageSearchQuery = ['flower', 'art', 'animal', 'hide', 'monkey', 'love', 'forest', 'river', 'rose', 'lights', 'rain', 'blossom', 'dogs', 'landscape', 'cat', 'texture', 'object', 'blackrose', 'kids', 'nebula', 'tree', 'dark', 'black and white', 'dew', 'road', 'dirty', 'gorilla', 'horse', 'elephant', 'wolf', 'illustrations', 'autumn leaf', 'hollow', 'birds', 'crow', 'crows', 'bulb', 'street', 'old', 'donkey', 'cow', 'cattle', 'grazing', 'pastures', 'lama', 'monk', 'Buddhism', 'temple', 'arches', 'architecture', 'cave', 'sandstone', 'benagil', 'canyon', 'stones', 'books', 'ancient', 'metal', 'pyrites', 'minerals','coast',]

  useEffect(() => {
    async function fetchData() {
      try {
        const imageData = await searchPhoto.get('', {
          params: {
            q: bgImageSearchQuery[Math.floor(Math.random() * (bgImageSearchQuery.length))],
            per_page: 3
          }
        })
        // console.log(Math.floor(Math.random() * (imageData.data.hits.length)))
        // console.log(Math.floor(Math.random() * (bgImageSearchQuery.length)))
        setBgImage(imageData.data.hits[Math.floor(Math.random() * (imageData.data.hits.length))].largeImageURL)

        // console.log(bgImageSearchQuery[Math.floor(Math.random() * bgImageSearchQuery.length - 1)]);
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
      path: '/preview/:id',
      element: <>
        <Header />
        <Title />
        <SearchBar />
        <Trendings />
        <CardDetail />
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
    {
      path: '/login',
      element: <>
        <Header />
        <Login />
      </>
    },
    {
      path: '/favourite',
      element: <>
        <Header />
        <SearchBar />
        <HistoFav type='favourite' />
      </>
    },
    {
      path: '/favourite/preview/:id',
      element: <>
        <Header />
        <SearchBar />
        <HistoFav type='favourite' />
        <CardDetail />
      </>
    },
    {
      path: '/downloads',
      element: <>
        <Header />
        <SearchBar />
        <HistoFav type='downloads' />
      </>
    },
    {
      path: '/downloads/preview/:id',
      element: <>
        <Header />
        <SearchBar />
        <HistoFav type='downloads' />
        <CardDetail />
      </>
    },
    {
      path: '*',
      element: <>
        <Error />
      </>
    }
  ])

  return (
    <>
      <div className='relative h-full'>
        {/* background image */}
        <div
          style={{ backgroundImage: `url(${bgImage})` }}
          className="bg-[#af977f] bg-cover bg-center bg-no-repeat absolute h-screen top-0 bottom-0 left-0 right-0 brightness-[0.85] z-[-1]" />
        {/* components */}
        <div className='z-[10]'>
          <RouterProvider router={router} />
        </div>
      </div>
    </>
  )
}

export default App;
