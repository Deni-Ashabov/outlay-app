import { asideMenuItems } from '../../../../constants/homePage';
import './styles.scss'

export default function AsideMenu() {
  return (
    <aside className='aside_menu'>
      <ul className='aside_menu__list list_reset'>
        {asideMenuItems.map((item) => (
          <li
            key={item.id}
            className={`aside_menu__list__item ${item.isActive ? 'is_active' : ''}`}
          >
            <button className='aside_menu__list__item__btn btn_reset'>
              {item.title}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};
