import { ReactElement, useEffect, useRef, useState } from 'react';
import Footer from '../components/footer/Footer';
import { NextPage } from 'next';
import Header from '../components/header/Header';
import Categorie from '../components/categorie/Categorie';
import { fetchSearchActivity } from '../hooks';
import DownloadAppCard from '../components/ui/DownloadAppCard';
import { useGeolocated } from 'react-geolocated';
import Draggable from 'react-draggable';
import { useWindowSize } from '../hooks/useWindowSize'
import {api} from '../config/api';
import { useAuth } from "../context/AuthContext";
import { toast, ToastContainer } from 'react-toastify';

type CustomProps = {
  children: ReactElement;
  title: string;
};

const Custom: NextPage<CustomProps> = ({children}) => {
  const {user, geolocation, fetchGeolocation} = useAuth()
  const [offsetTranslate, setOffsetTranslate] = useState(0);
  const [hasDragLoaded, setHasDragLoaded] = useState(false);
  const themeGroupRef = useRef<HTMLDivElement>(null);
  const dragWrapperRef = useRef<HTMLDivElement>(null);
  const windowSize = useWindowSize();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    try {
      const form = event.currentTarget;
      let values = Object.fromEntries(new FormData(form));

      fetchSearchActivity(values.search).then((data) => {
        if (!(data === '') && data) {
          window.location.href = `/search/filterActivity?filter=${values.search}`;
        }
      });
    } catch (e: any) {
      console.log(Error(e.message));
    }
  };

  useEffect(() => {
    const dragWrapperWidth = dragWrapperRef.current?.offsetWidth || 0;
    const themeGroupWidth = themeGroupRef.current?.offsetWidth || 0;
    setOffsetTranslate(themeGroupWidth - dragWrapperWidth);
    setHasDragLoaded(dragWrapperWidth !== 0);
  }, [themeGroupRef, dragWrapperRef.current?.offsetWidth, windowSize]);

  return (
    <>
      <div className="c-hero">
        <Header/>
        <div className="c-hero__content">
          <h1 className="c-hero__content__title">
            Trouvez ce qui se passe autour de vous
          </h1>
          <ToastContainer/>
          <form onSubmit={handleSubmit}>
            <div className="c-searchbox mt-10">
              <button className="btn-menu" onClick={fetchGeolocation} type={'button'}>
                <span className="btn-menu__wrapper">
                 <i className="ri-map-pin-fill ri-xl"></i>
                </span>
              </button>
              <div className="search">
                <span className="search__subtitle mb-[5px]">
                 {geolocation && geolocation !== '' ? geolocation.localisation : 'Localisation'}
                </span>
                <input
                  className="search__input"
                  type="text"
                  placeholder="Rechercher des activites"
                  name="search"
                  data-lpignore="true"
                  size={1}
                />
              </div>
              <button className="btn-search">
                <span className="btn-search__wrapper">
                 <i className="ri-search-line ri-xl"></i>
                </span>
              </button>
            </div>
          </form>

          <div className="c-group-button mt-8" ref={themeGroupRef}>
            <Draggable
              axis="x"
              handle=".js-drag"
              defaultPosition={{x: 0, y: 0}}
              scale={1}
              bounds={{left: offsetTranslate, right: 0}}
              disabled={!hasDragLoaded}
            >
              <div className='c-group-button__inside js-drag' ref={dragWrapperRef}>
                {/*<Categorie/>*/}
              </div>
            </Draggable>
          </div>
        </div>
      </div>
      <main className="o-container o-container--margin">{children}</main>
      <section className="u-bg-primary">
        <div className="o-container">
          <DownloadAppCard
            title={'Téléchargez notre application mobile'}
            description={
              "Faites de votre prochaine expérience un chemin sans encombre avec l'application Let's GO. Utilisez-la pour découvrir des activitées, planifier au fur et à mesure, stocker vos billets en hors ligne et profiter des avantages exclusifs de l'application."
            }
            backgroundColor={'#4376FF'}
            label={'PlayStore'}
            secondLabel={'AppleStore'}
            src={'/img/mobile-letsgo.png'}
          />
        </div>
      </section>
      <Footer/>
    </>
  );
};

export default Custom;
