import { useGate } from 'effector-react';
import AsideMenu from '../../modules/HomePage/AsideMenu/AsideMenu';
import Header from '../../modules/HomePage/Header/Header';
import OutlayTable from '../../modules/HomePage/OutlayTable/OutlayTable';
import '../../../context/outlay/init';
import { HomePageGate } from '../../../context/outlay';
import './styles.scss';

export default function HomePage() {
  useGate(HomePageGate)

  return (
    <>
      <Header />
      <main>
        <section className='outlay'>
          <div className="outlay__top">
            <div className="container outlay__top__container">
              <button className='outlay__select btn_reset'>
                <span>Название проекта</span>
                <span>Аббревиатура</span>
              </button>
              <button className='outlay__tab btn_reset'>
                Строительно-монтажные работы
              </button>
            </div>
          </div>
          <div className="container outlay__container">
            <AsideMenu />
            <div className="outlay__inner">
              <OutlayTable />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
