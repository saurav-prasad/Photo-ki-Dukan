import './App.css';
import CardDetail from './components/cardDetail/CardDetail';
import CardLists from './components/cardLists/CardLists';
import Header from './components/header/Header';
import SearchBar from './components/searchBar/SearchBar';
import Title from './components/title/Title';
import Trendings from './components/trendings/Trendings';

function App() {
  return (
    <>
      <div className='relative h-full'>
        {/* background image */}
        <div
          className="
          bg-[#d3d3d3]
      bg-[url('https://s3-alpha-sig.figma.com/img/4612/66c8/4c5ae5807660eb18152caeff2019dde6?Expires=1706486400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=FvX6cB-JOKiICE8vcy73FJVcapTGqunvcuXCt-Jfnxmrpdcc2ZM6k~kGi~eFmTLe69Tch0Fa-MjplyevZqCy9e0d7~vcbMtnvXITFP7VZ1IqGqHFV09wyviG8h06uxVMOxHmWOrEonpGD3gR~DKIAIfji7L36s54tVNfwrFOsM1Wa4f1OG3LHPxt1WeG7DRJqiXrKpIFdD~ypdjFk85WMaVFYGtiDsgNhY~G5EpCzKL3ogJqPEkWbbUjaGVOO5BuLPBepsxhDs30qvEJNVcO-B8kpTyisJtz5wwMbiDsK5Tjr9SmbZagKtJyPIMy96nOOdNHpF8pl-uzLQJIhsnPZg__')]
      bg-cover 
      bg-center
      bg-no-repeat
      absolute
      h-screen
      top-0
      bottom-0
      left-0
      right-0
      brightness-[0.90]
      z-[-1]"/>
        {/* components */}
        <div className='z-1'>
          <Header />
          {/* <Title/> */}
          <SearchBar />
          {/* <Trendings/> */}
          {/* <CardDetail/> */}
        </div>
        <CardLists />
      </div>
    </>
  )
}

export default App;
