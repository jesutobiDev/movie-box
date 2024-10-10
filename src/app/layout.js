'use client'
import { Provider } from "react-redux";
import "./globals.css";
import store from "./redux/store"


// export const metadata = {
//   title: "Movie Box",
//   description: "Add app description later",
// };

export default function RootLayout({ children }) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body
          className="w-screen overflow-x-hidden"
        >
          <main className="">
            {children}
          </main>
        </body>
      </html>
    </Provider>
  );
}
