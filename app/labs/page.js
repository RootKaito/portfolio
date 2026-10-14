import HomeClient from "../HomeClient";

export const metadata = {
  title: "Security Labs | Lucas Rocha",
  description: "Independent security experiments with public code and documented evidence across application, defensive and mobile security.",
  openGraph: { title: "Security Labs | Lucas Rocha", description: "Built to understand. Documented to share.", type: "website" },
};

export default function LabsPage() {
  return <HomeClient labsPage />;
}
