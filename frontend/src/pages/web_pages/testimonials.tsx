import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAppSelector } from '../../stores/hooks';
import LayoutGuest from '../../layouts/Guest';
import WebSiteHeader from '../../components/WebPageComponents/Header';
import WebSiteFooter from '../../components/WebPageComponents/Footer';
import {
  HeroDesigns,
  TestimonialsDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import TestimonialsSection from '../../components/WebPageComponents/TestimonialsComponent';

export default function WebSite() {
  const cardsStyle = useAppSelector((state) => state.style.cardsStyle);
  const bgColor = useAppSelector((state) => state.style.bgLayoutColor);
  const projectName = 'snuglife';

  useEffect(() => {
    const darkElement = document.querySelector('body .dark');
    if (darkElement) {
      darkElement.classList.remove('dark');
    }
  }, []);
  const pages = [
    {
      href: '/home',
      label: 'home',
    },

    {
      href: '/products',
      label: 'products',
    },

    {
      href: '/contact',
      label: 'contact',
    },

    {
      href: '/faq',
      label: 'FAQ',
    },

    {
      href: '/testimonials',
      label: 'testimonials',
    },
  ];

  const testimonials = [
    {
      text: '${projectName} has revolutionized my shopping experience. The variety and quality are unmatched, and the customer service is exceptional!',
      company: 'Fashion Forward Inc.',
      user_name: 'Emily Johnson, Head of Marketing',
    },
    {
      text: "I love how easy it is to find exactly what I'm looking for. The user-friendly interface makes shopping a breeze.",
      company: 'Style Savvy Co.',
      user_name: 'Michael Smith, CEO',
    },
    {
      text: "The customizable options make it so easy to find the perfect fit. I can't recommend ${projectName} enough!",
      company: 'Chic Boutique',
      user_name: 'Sophia Brown, Fashion Consultant',
    },
    {
      text: 'From browsing to checkout, the process is seamless. ${projectName} is my go-to for all things fashion.',
      company: 'Trendsetters Ltd.',
      user_name: 'James Wilson, Creative Director',
    },
    {
      text: 'The vibrant and modern design of the site makes shopping a joy. I always find something new and exciting!',
      company: 'Urban Elegance',
      user_name: 'Olivia Davis, Style Editor',
    },
    {
      text: "The order management system is a game-changer for our business. It's efficient and easy to use.",
      company: 'Apparel Innovators',
      user_name: 'Liam Martinez, Operations Manager',
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Customer Testimonials`}</title>
        <meta
          name='description'
          content={`Read what our satisfied customers have to say about their experiences with our products and services. Discover why they love shopping with us.`}
        />
      </Head>
      <WebSiteHeader projectName={'snuglife'} pages={pages} />
      <main className={`flex-grow  ${bgColor}    rounded-none  `}>
        <HeroSection
          projectName={'snuglife'}
          image={['Happy customers sharing feedback']}
          mainText={`Hear What Our Customers Say`}
          subTitle={`Discover the experiences of our valued customers and learn why they choose ${projectName} for their fashion needs. Their stories speak volumes about our commitment to quality and service.`}
          design={HeroDesigns.IMAGE_BG || ''}
          buttonText={`Read Testimonials`}
        />

        <TestimonialsSection
          projectName={'snuglife'}
          design={TestimonialsDesigns.MULTI_CARD_DISPLAY || ''}
          testimonials={testimonials}
          mainText={`What Our Customers Love About ${projectName} `}
        />
      </main>
      <WebSiteFooter projectName={'snuglife'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
