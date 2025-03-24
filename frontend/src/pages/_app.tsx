import React from 'react';
import type { AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { store } from '../stores/store';
import { Provider } from 'react-redux';
import '../css/main.css';
import axios from 'axios';
import { baseURLApi } from '../config';
import { useRouter } from 'next/router';
import ErrorBoundary from '../components/ErrorBoundary';
import 'intro.js/introjs.css';
import IntroGuide from '../components/IntroGuide';
import {
  appSteps,
  landingSteps,
  loginSteps,
  usersSteps,
  rolesSteps,
} from '../stores/introSteps';

export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<
  P,
  IP
> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);

  if (typeof window !== 'undefined') {
    // Perform localStorage action
    console.log(
      'process.env.NEXT_PUBLIC_BACK_API',
      process.env.NEXT_PUBLIC_BACK_API,
    );
    axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACK_API
      ? process.env.NEXT_PUBLIC_BACK_API
      : baseURLApi;
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    }
  }

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleMessage = (event) => {
        if (event.data === 'getLocation') {
          event.source.postMessage(
            { iframeLocation: window.location.pathname },
            event.origin,
          );
        }
      };

      window.addEventListener('message', handleMessage);

      // Cleanup listener on unmount
      return () => {
        window.removeEventListener('message', handleMessage);
      };
    }
  }, []);

  const title = 'snuglife';

  const description = 'snuglife generated by Flatlogic';

  const url = 'https://flatlogic.com/';

  const image = `https://flatlogic.com/logo.svg`;

  const imageWidth = '1920';

  const imageHeight = '960';

  const [stepsEnabled, setStepsEnabled] = React.useState(true);
  const [stepName, setStepName] = React.useState('');
  const [steps, setSteps] = React.useState([]);
  const router = useRouter();
  React.useEffect(() => {
    const isCompleted = (stepKey: string) => {
      return localStorage.getItem(`completed_${stepKey}`) === 'true';
    };
    if (router.pathname === '/login' && !isCompleted('loginSteps')) {
      setSteps(loginSteps);
      setStepName('loginSteps');
      setStepsEnabled(true);
    } else if (router.pathname === '/' && !isCompleted('landingSteps')) {
      setSteps(landingSteps);
      setStepName('landingSteps');
      setStepsEnabled(true);
    } else if (router.pathname === '/dashboard' && !isCompleted('appSteps')) {
      setTimeout(() => {
        setSteps(appSteps);
        setStepName('appSteps');
        setStepsEnabled(true);
      }, 1000);
    } else if (
      router.pathname === '/users/users-list' &&
      !isCompleted('usersSteps')
    ) {
      setTimeout(() => {
        setSteps(usersSteps);
        setStepName('usersSteps');
        setStepsEnabled(true);
      }, 1000);
    } else if (
      router.pathname === '/roles/roles-list' &&
      !isCompleted('rolesSteps')
    ) {
      setTimeout(() => {
        setSteps(rolesSteps);
        setStepName('rolesSteps');
        setStepsEnabled(true);
      }, 1000);
    } else {
      setSteps([]);
      setStepsEnabled(false);
    }
  }, [router.pathname]);

  const handleExit = () => {
    setStepsEnabled(false);
  };

  return (
    <Provider store={store}>
      {getLayout(
        <>
          <Head>
            <meta name='description' content={description} />

            <meta property='og:url' content={url} />
            <meta property='og:site_name' content='https://flatlogic.com/' />
            <meta property='og:title' content={title} />
            <meta property='og:description' content={description} />
            <meta property='og:image' content={image} />
            <meta property='og:image:type' content='image/png' />
            <meta property='og:image:width' content={imageWidth} />
            <meta property='og:image:height' content={imageHeight} />

            <meta property='twitter:card' content='summary_large_image' />
            <meta property='twitter:title' content={title} />
            <meta property='twitter:description' content={description} />
            <meta property='twitter:image:src' content={image} />
            <meta property='twitter:image:width' content={imageWidth} />
            <meta property='twitter:image:height' content={imageHeight} />

            <link rel='icon' href='/favicon.svg' />
          </Head>

          <ErrorBoundary>
            <Component {...pageProps} />
          </ErrorBoundary>
          <IntroGuide
            steps={steps}
            stepsName={stepName}
            stepsEnabled={stepsEnabled}
            onExit={handleExit}
          />
        </>,
      )}
    </Provider>
  );
}

export default MyApp;
