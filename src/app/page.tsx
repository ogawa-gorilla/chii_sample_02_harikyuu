'use client'

import { useAppSelector } from "./hooks";
import NotImplementedPage from "./NotImplementedPage";
import { Page } from "./types/Page";


const showPage = (page: Page) => {
  switch (page) {
    case Page.HOME:
      return <NotImplementedPage />
    default:
      return <NotImplementedPage />
  }
}

const Home = () => {
  const currentPage = useAppSelector((state) => state.navigation.currentPage);

  return (
    <div>
    {
      showPage(currentPage)
    }
    </div>
  );
}

export default Home;
