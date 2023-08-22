import '@/styles/globals.css'
import type { AppProps } from 'next/app';
import { SnackbarProvider } from "notistack";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { ligthTheme, darkTheme } from '@/themes';
import { UIProvider } from '@/context/ui';
import { EntriesProvider } from '@/context/entries';



export default function App({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider maxSnack={3}>
      <EntriesProvider>
        <UIProvider>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </UIProvider>
      </EntriesProvider>
    </SnackbarProvider>
    
    
  
  );
}
