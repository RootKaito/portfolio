import HomeClient from "./HomeClient";
import { getNewsletterArticles } from "./lib/newsletter";

export default async function Home() {
  const articles = await getNewsletterArticles();
  return <HomeClient articles={articles} />;
}
