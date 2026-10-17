import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { MapPage } from './pages/MapPage';
import { RelicsPage } from './pages/RelicsPage';
import { RelicCalculatorPage } from './pages/RelicCalculatorPage';
import { DpsAnalysisPage } from './pages/DpsAnalysisPage';
import { SuperEasterEggPage } from './pages/SuperEasterEggPage';
import { RunLogPage } from './pages/RunLogPage';
import { MysteryBoxPage } from './pages/MysteryBoxPage';
import { VendingMachinePage } from './pages/VendingMachinePage';
import { MultiPackPage } from './pages/MultiPackPage';
import { PeeksPage } from './pages/PeeksPage';
import { FreePerksPage } from './pages/FreePerksPage';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="map/:slug" element={<MapPage />} />
          <Route path="map/:slug/relics" element={<RelicsPage />} />
          <Route path="relic-calculator" element={<RelicCalculatorPage />} />
          <Route path="dps-analysis" element={<DpsAnalysisPage />} />
          <Route path="super-easter-egg" element={<SuperEasterEggPage />} />
          <Route path="run-log" element={<RunLogPage />} />
          <Route path="mystery-box" element={<MysteryBoxPage />} />
          <Route path="vending-machine" element={<VendingMachinePage />} />
          <Route path="multi-pack" element={<MultiPackPage />} />
          <Route path="peeks" element={<PeeksPage />} />
          <Route path="free-perks" element={<FreePerksPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
