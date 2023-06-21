import Link from 'next/link';
import navStyles from '../styles/Nav.module.css';
export default function Nav() {
  return (
    <nav className={navStyles.nav}>
      <ul>
        <li>
          <Link href="index">Home</Link>
        </li>
        <li>
          <Link href="windFarm">WindFarm</Link>
        </li>
        <li>
          <Link href={{ pathname: 'windTurbine', query: { windfarm: '' } }}>WindTurbine</Link>
        </li>
        <li>
          <Link href="admin">Admin</Link>
        </li>
      </ul>
    </nav>
  );
}
