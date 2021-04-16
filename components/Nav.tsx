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
          <Link href="WindTurbine">WindTurbine</Link>
        </li>
        <li>
          <Link href="chart">Chart</Link>
        </li>
        <li>
          <Link href="chart2">Chart2</Link>
        </li>
      </ul>
    </nav>
  );
}
