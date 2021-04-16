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
          <Link href="WindFarm">WindFarm</Link>
        </li>
        <li>
          <Link href={{ pathname: 'WindTurbine', query: { windfarm: '' } }}>WindTurbine</Link>
        </li>
      </ul>
    </nav>
  );
}
