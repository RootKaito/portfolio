import "./globals.css";

export const metadata = {
  title: "Lucas Rocha — Engineering Manager & Application Security",
  description:
    "Engineering manager with 10+ years in software engineering, specializing in Application Security, secure development and technical leadership.",
  openGraph: {
    title: "Lucas Rocha — Engineering Manager & Application Security",
    description: "I build security into software systems.",
    type: "website",
  },
  icons: {
    icon: "/assets/favicon.svg",
  },
};

export const viewport = {
  themeColor: "#090d12",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
