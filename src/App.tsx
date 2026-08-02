import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { MapPage } from './pages/MapPage';
import { RelicsPage } from './pages/RelicsPage';
import { RunLogPage } from './pages/RunLogPage';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="map/:slug" element={<MapPage />} />
          <Route path="map/:slug/relics" element={<RelicsPage />} />
          <Route path="run-log" element={<RunLogPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
