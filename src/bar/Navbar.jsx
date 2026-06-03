import '../styles/navbar.scss';

import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';

import {
  HiOutlineHome,
  HiOutlineChartBar,
  HiOutlineCalendar,
  HiOutlineSparkles,
  HiOutlineEllipsisHorizontal,
} from 'react-icons/hi2';

function Navbar() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar ${hidden ? 'hidden' : ''}`}>
      <NavLink to="/home" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
        <HiOutlineHome />
      </NavLink>

      <NavLink
        to="/history"
        className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
      >
        <HiOutlineCalendar />
      </NavLink>

      <NavLink
        to="/stats"
        className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
      >
        <HiOutlineChartBar />
      </NavLink>

      <NavLink
        to="/insight"
        className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
      >
        <HiOutlineSparkles />
      </NavLink>

      <NavLink to="/more" className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}>
        <HiOutlineEllipsisHorizontal />
      </NavLink>
    </nav>
  );
}

export default Navbar;
