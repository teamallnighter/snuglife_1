import React, { useEffect, useState } from 'react';
import type { ReactElement } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useAppSelector } from '../stores/hooks';
import LayoutGuest from '../layouts/Guest';
import WebSiteHeader from '../components/WebPageComponents/Header';
import WebSiteFooter from '../components/WebPageComponents/Footer';
import {
  HeroDesigns,
  FeaturesDesigns,
  TestimonialsDesigns,
  AboutUsDesigns,
  ContactFormDesigns,
} from '../components/WebPageComponents/designs';

import HeroSection from '../components/WebPageComponents/HeroComponent';

import FeaturesSection from '../components/WebPageComponents/FeaturesComponent';

import TestimonialsSection from '../components/WebPageComponents/TestimonialsComponent';

import AboutUsSection from '../components/WebPageComponents/AboutUsComponent';

import ContactFormSection from '../components/WebPageComponents/ContactFormComponent';

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

  const features_points = [
    {
      name: 'Seamless Shopping Experience',
      description:
        'Enjoy a user-friendly interface that makes browsing and purchasing your favorite apparel a breeze. Navigate effortlessly through our diverse collection.',
      icon: 'mdiShopping',
    },
    {
      name: 'Customizable Product Options',
      description:
        'Select from a variety of sizes, colors, and styles to find the perfect fit. Our detailed product pages ensure you have all the information you need.',
      icon: 'mdiPalette',
    },
    {
      name: 'Efficient Order Management',
      description:
        'Admins can easily manage orders, update product listings, and communicate with customers. Keep your store running smoothly with our intuitive tools.',
      icon: 'mdiClipboardListOutline',
    },
  ];

  const testimonials = [
    {
      text: '${projectName} has completely transformed my shopping experience. The variety and quality are unmatched!',
      company: 'Fashion Forward Inc.',
      user_name: 'Emily Johnson, Head of Marketing',
    },
    {
      text: "I love how easy it is to find exactly what I'm looking for. The customer service is top-notch!",
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
        <title>{`Welcome to Your Ultimate Online Clothing Store`}</title>
        <meta
          name='description'
          content={`Discover a vibrant and modern online clothing store offering a wide range of apparel. Explore our features, read customer testimonials, and learn more about our mission and values.`}
        />
      </Head>
      <WebSiteHeader projectName={'snuglife'} pages={pages} />
      <main className={`flex-grow  ${bgColor}    rounded-none  `}>
        <HeroSection
          projectName={'snuglife'}
          image={['Colorful clothing display']}
          mainText={`Discover Your Style at ${projectName}`}
          subTitle={`Welcome to ${projectName}, your ultimate destination for vibrant and modern apparel. Explore our diverse collection and find the perfect fit for every occasion.`}
          design={HeroDesigns.IMAGE_BG || ''}
          buttonText={`Shop Now`}
        />

        <FeaturesSection
          projectName={'snuglife'}
          image={['Stylish apparel showcase']}
          withBg={1}
          features={features_points}
          mainText={`Explore ${projectName} Features`}
          subTitle={`Discover the key features that make ${projectName} your go-to online clothing store. Experience seamless shopping and management.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS || ''}
        />

        <TestimonialsSection
          projectName={'snuglife'}
          design={TestimonialsDesigns.MULTI_CARD_DISPLAY || ''}
          testimonials={testimonials}
          mainText={`What Our Customers Say About ${projectName} `}
        />

        <AboutUsSection
          projectName={'snuglife'}
          image={['Team collaborating in vibrant office']}
          mainText={`Discover the Heart of ${projectName}`}
          subTitle={`At ${projectName}, we are passionate about bringing you the latest in fashion with a touch of fun and modernity. Our mission is to provide a seamless shopping experience that caters to your unique style.`}
          design={AboutUsDesigns.IMAGE_RIGHT || ''}
          buttonText={`Learn More`}
        />

        <ContactFormSection
          projectName={'snuglife'}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Person typing on a laptop']}
          mainText={`Get in Touch with ${projectName} `}
          subTitle={`We're here to help! Reach out to us anytime, and we'll respond promptly to assist with your inquiries. Your satisfaction is our priority at ${projectName}.`}
        />
      </main>
      <WebSiteFooter projectName={'snuglife'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
