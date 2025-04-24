import NavBar from '@/components/NavBar';
import { Outlet } from 'react-router-dom';

export default function GlobleLayout() {
  return (
    <>
      <NavBar />
      <main>
        <Outlet />
      </main>
    </>
  );
}
