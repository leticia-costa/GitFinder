import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SearchPage } from "../features/search/pages/SearchPage";
import { UserPage } from "../features/user/pages/UserPage";
import { RepositoryPage } from "../features/repository/pages/RepositoryPage";   

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/user/:userName" element={<UserPage />} />
        <Route path="/user/:userName/repo/:repo" element={<RepositoryPage />} />
      </Routes>
    </BrowserRouter>
  );
}