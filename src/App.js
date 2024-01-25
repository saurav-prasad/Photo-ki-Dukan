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
import Error from './components/error/Error';
import HistoFav from './components/histoFav/HistoFav';
import { AlertCircle } from 'lucide-react';
import ScrollToTop from './components/scrollToTop/ScrollToTop';

function App() {
  const [alert, setAlert] = useState(false)
  const [alertText, setAlertText] = useState()
  const [bgImage, setBgImage] = useState('https://pixabay.com/get/geedac2bec0326b5eae8a1be0f544aac6a6af62d2eba6d279f13f37560e09fc797e76422f3c46f0ce252ee8f7743117bd6fe3f610e6542d69656a1ce631955858_1280.jpg')

  // show alert function
  const showAlert = (e) => {
    setAlert(true)
    setAlertText(e)
    setTimeout(() => {
      setAlert(false)
      setAlertText()
    }, 1600);
  }

  // images search query
  const bgImageSearchQuery = ['flower', 'art', 'animal', 'hide', 'monkey', 'love', 'forest', 'river', 'rose', 'lights', 'rain', 'blossom', 'dogs', 'landscape', 'cat', 'texture', 'object', 'blackrose', 'kids', 'nebula', 'tree', 'dark', 'black and white', 'dew', 'road', 'dirty', 'gorilla', 'horse', 'elephant', 'wolf', 'illustrations', 'autumn leaf', 'hollow', 'birds', 'crow', 'crows', 'bulb', 'street', 'old', 'donkey', 'cow', 'cattle', 'grazing', 'pastures', 'lama', 'monk', 'Buddhism', 'temple', 'arches', 'architecture', 'cave', 'sandstone', 'benagil', 'canyon', 'stones', 'books', 'ancient', 'metal', 'pyrites', 'minerals', 'coast', 'Lake Sunset trees', 'sunset trees', 'sunset forest', 'sunset road', 'field', 'Mountain landscape', 'mushrooms', 'tree trunk', 'turtle', 'flora', 'Cherry Blossoms', 'sakura',]

  // getting the image by query
  useEffect(() => {
    async function fetchData() {
      try {
        const imageData = await searchPhoto.get('', {
          params: {
            q: bgImageSearchQuery[Math.floor(Math.random() * (bgImageSearchQuery.length))],
            per_page: 3
          }
        })
        setBgImage(imageData.data.hits[Math.floor(Math.random() * (imageData.data.hits.length))].largeImageURL)
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
        <Header showAlert={showAlert} />
        <Title />
        <SearchBar />
        <Trendings />
      </>
    },
    {
      path: '/preview/:id',
      element: <>
        <Header showAlert={showAlert} />
        <Title />
        <SearchBar />
        <Trendings />
        <CardDetail showAlert={showAlert} />
      </>
    },
    {
      path: '/search/:query',
      element: <>
        <Header showAlert={showAlert} />
        <SearchBar />
        <CardLists />
      </>
    },
    {
      path: '/search/:query/preview/:id',
      element: <>
        <Header showAlert={showAlert} />
        <SearchBar />
        <CardLists />
        <CardDetail showAlert={showAlert} />
      </>
    },
    {
      path: '/login',
      element: <>
        <Header showAlert={showAlert} />
        <Login />
      </>
    },
    {
      path: '/favourite',
      element: <>
        <Header showAlert={showAlert} />
        <SearchBar />
        <Trendings />
        <HistoFav showAlert={showAlert} type='favourite' />
      </>
    },
    {
      path: '/favourite/preview/:id',
      element: <>
        <Header showAlert={showAlert} />
        <SearchBar />
        <Trendings />
        <HistoFav showAlert={showAlert} type='favourite' />
        <CardDetail showAlert={showAlert} />
      </>
    },
    {
      path: '/downloads',
      element: <>
        <Header showAlert={showAlert} />
        <SearchBar />
        <Trendings />
        <HistoFav type='downloads' />
      </>
    },
    {
      path: '/downloads/preview/:id',
      element: <>
        <Header showAlert={showAlert} />
        <SearchBar />
        <Trendings />
        <HistoFav type='downloads' />
        <CardDetail showAlert={showAlert} />
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
      {/* alert notification */}
      <div className={`flex justify-center items-center fixed bottom-0 z-[100] w-full transition-all duration-300 ${alert ? "translate-y-[0%]" : "translate-y-[150%]"}`}>
        <div className="select-none mx-auto flex items-center px-4 py-2 mb-4 text-lg rounded-b-md rounded-t-sm border-t-[5px] border-[#ff2929] bg-[#f7f8f7] text-[#000000] shadow-[0px_5px_16px_#ff00007a]" role="alert">
          <span className="font-medium flex justify-center items-center gap-1"><AlertCircle size={17} strokeWidth={2} />{alertText}</span>
        </div>
      </div >
      <div className={`flex justify-center items-center fixed bottom-4 z-[10] right-4 transition-all duration-300 `}  >
        <ScrollToTop />
      </div>
      <div className='relative h-full'>

        {/* background image */}
        <div
          style={{ backgroundImage: `url(${bgImage})` }}
          className="bg-[#af977f] bg-cover bg-center bg-no-repeat absolute h-screen top-0 bottom-0 left-0 right-0 brightness-[0.85] z-[-1]" />

        {/* components */}
        <div className='z-[10] min-h-svh'>
          <RouterProvider router={router} />
        </div>

      </div>
    </>
  )
}

export default App;
