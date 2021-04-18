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
        <li>
          <Link href="chart">Chart</Link>
        </li>
        <li>
          <Link href="chart2">Chart2</Link>
        </li>
        <li>
          <Link href="chart3">Chart3</Link>
        </li>
        <li>
          <Link href="chart4">Chart4</Link>
        </li>
      </ul>
    </nav>
  );
}
