import { createTheme, PaletteMode, useMediaQuery } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useEffect, useMemo, useState } from "react";
import GoogleTagManager, { GoogleTagManagerId } from "../src/components/gtm";
import Header from "../src/components/header";
import { googleTagManagerId } from "../src/utils/gtm";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  // theme setting
  const [mode, setMode] = useState<PaletteMode>("dark");
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)", {
    noSsr: true
  });

  // localStorageに保存されているならそれを使い、なければシステムの設定を使う
  useEffect(() => {
    if (localStorage.getItem("colorMode") === "dark") {
      setMode("dark");
    } else if (localStorage.getItem("colorMode") === "light") {
      setMode("light");
    } else if ((prefersDarkMode) === true) {
      setMode("dark");
    } else {
      setMode("light");
    }
  }, [prefersDarkMode]);

  //トグルボタンでテーマを切り替える
  const colorMode = useMemo(() => ({
    toggleColorMode: () => {
      setMode((prevMode: string) => (prevMode === "light" ? "dark" : "light"));
    },
  }
  ), []);

<<<<<<< HEAD
  const toggleColorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setColorMode((prevMode) =>
          prevMode === "light" ? "dark" : "light"
        );
      },
    }),
    []
  );
>>>>>>> f5834c6 (add theme switching function)
=======
  //localStorageに保存
  useEffect(() => {
    if (mode === "dark") {
      localStorage.setItem("colorMode", "dark");
    } else {
      localStorage.setItem("colorMode", "light");
    }
  }, [mode]);
>>>>>>> e684f6d (update theme settings)

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
<<<<<<< HEAD
<<<<<<< HEAD
          mode: mode,
        },
      }),
    [mode],
=======
          mode: colorMode,
        },
      }),
    [colorMode]
>>>>>>> f5834c6 (add theme switching function)
=======
          mode: mode,
        },
      }),
    [mode],
>>>>>>> e684f6d (update theme settings)
  );

  return (
    <>
      <Head>
        <title>OITシラバスアプリ</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#00a1ea" />
        <meta name="description" content="大阪工業大学非公式シラバスアプリ" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />

        {/* OGP */}
        <title>OITシラバスアプリ</title>
        <meta property="og:title" content="OITシラバスアプリ" key="title" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://syllabus.oit.yashikota.com" />
        <meta
          property="og:image"
          content="https://raw.githubusercontent.com/oit-tools/syllabus/master/web/public/icon.webp"
        />
        <meta property="og:site_name" content="OIT Syllabus App" />
        <meta
          property="og:description"
          content="大阪工業大学非公式のシラバスアプリ"
          key="description"
        />
        <meta name="twitter:card" content="summary" />
      </Head>
<<<<<<< HEAD
<<<<<<< HEAD
      <ColorModeContext.Provider value={colorMode}>
=======
>>>>>>> e684f6d (update theme settings)
        <ThemeProvider theme={theme}>
          <Header />
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
<<<<<<< HEAD
      </ColorModeContext.Provider>
=======
      <ThemeProvider theme={theme}>
        <Header />
        <CssBaseline />
        <GoogleTagManager googleTagManagerId={googleTagManagerId as GoogleTagManagerId} />
        <Component {...pageProps} />
      </ThemeProvider>
>>>>>>> 2ac49ec (feat: #14 support google analytics)
=======
>>>>>>> e684f6d (update theme settings)
    </>
  );
}

export default MyApp;
