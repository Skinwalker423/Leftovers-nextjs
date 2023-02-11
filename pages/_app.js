import * as React from 'react';
import '../styles/globals.css';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider } from '@emotion/react';
import { ColorModeContext, useMode } from '../config/theme';
import createEmotionCache from '../config/createEmotionCache';
import { SessionProvider } from 'next-auth/react';
import UserProvider from '../store/UserContext';
import Layout from './layout/layout';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
	const [theme, colorMode] = useMode();

	const {
		Component,
		emotionCache = clientSideEmotionCache,
		pageProps: { session, ...pageProps },
	} = props;
	return (
		<UserProvider>
			<CacheProvider value={emotionCache}>
				<Head>
					<meta name='description' content='Lefovers' />
					<meta name='viewport' content='initial-scale=1, width=device-width' />
					<link rel='icon' href='/icons8-connect.svg' />
					<link rel='preconnect' href='https://fonts.googleapis.com' />
					<link rel='preconnect' href='https://fonts.gstatic.com' crossorigin />
					<link
						href='https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600;700&display=swap'
						rel='stylesheet'
					/>
				</Head>
				<ColorModeContext.Provider value={colorMode}>
					<ThemeProvider theme={theme}>
						<CssBaseline />
						<SessionProvider session={session}>
							<Layout>
								<Component {...pageProps} />
							</Layout>
						</SessionProvider>
					</ThemeProvider>
				</ColorModeContext.Provider>
			</CacheProvider>
		</UserProvider>
	);
}
