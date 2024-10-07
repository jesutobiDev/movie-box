'use client'
import { Provider } from "react-redux";
import "./globals.css";
import store from "./redux/store"
import Header from "./components/Header";


// export const metadata = {
//   title: "Movie Box",
//   description: "Add app description later",
// };

export default function RootLayout({ children }) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body
          className="relative w-screen overflow-x-hidden"
        >
          <Header />
          <main className="mt-16">
            {children}
          </main>
        </body>
      </html>
    </Provider>
  );
}
