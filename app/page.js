import HomeClient from "./HomeClient";
import { getEnglishArticleCards } from "./lib/english-articles";

export default function Home() {
  return <HomeClient articles={getEnglishArticleCards()} />;
}
