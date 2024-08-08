import './styles.scss'

export default function Header() {
  return (
    <header className='header'>
      <div className="container header__container">
        <button className='header__burger btn_reset' />
        <button className='header__back btn_reset' />
        <nav className='header__nav'>
          <ul className='header__nav__list list_reset'>
            <li className='header__nav__list__item'>
              <button
                className='header__nav__list__item__btn btn_reset is_active'
              >
                Просмотр
              </button>
            </li>
            <li className='header__nav__list__item'>
              <button
                className='header__nav__list__item__btn btn_reset'
              >
                Управление
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
