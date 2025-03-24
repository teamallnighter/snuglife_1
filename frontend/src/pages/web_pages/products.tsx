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
  FeaturesDesigns,
  GalleryPortfolioDesigns,
  PricingDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import FeaturesSection from '../../components/WebPageComponents/FeaturesComponent';

import GalleryPortfolioSection from '../../components/WebPageComponents/GalleryPortfolioComponent';

import { getMultiplePexelsImages } from '../../helpers/pexels';

import PricingSection from '../../components/WebPageComponents/PricingComponent';

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
      name: 'Extensive Product Range',
      description:
        'Explore a wide variety of clothing options, from casual wear to formal attire. Our collection caters to all styles and preferences.',
      icon: 'mdiWardrobe',
    },
    {
      name: 'Detailed Product Information',
      description:
        'Get comprehensive details on each product, including size, material, and care instructions. Make informed decisions with ease.',
      icon: 'mdiInformationOutline',
    },
    {
      name: 'User-Friendly Navigation',
      description:
        'Enjoy a seamless browsing experience with our intuitive interface. Find your desired products quickly and effortlessly.',
      icon: 'mdiNavigationOutline',
    },
  ];

  const [images, setImages] = useState([]);
  const pexelsQueriesWebSite = [
    'Casual summer dresses display',
    'Elegant evening gowns rack',
    'Trendy streetwear collection',
    'Formal business attire lineup',
    'Colorful activewear assortment',
    'Chic accessories and handbags',
  ];
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const images = await getMultiplePexelsImages(pexelsQueriesWebSite);
        const formattedImages = images.map((image) => ({
          src: image.src || undefined,
          photographer: image.photographer || undefined,
          photographer_url: image.photographer_url || undefined,
        }));
        setImages(formattedImages);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  const pricing_features = {
    standard: {
      features: [
        'Access to basic product range',
        'Standard customer support',
        'Monthly newsletter',
      ],
      limited_features: [
        'Limited access to premium products',
        'Basic customization options',
      ],
    },
    premium: {
      features: [
        'Access to full product range',
        'Priority customer support',
        'Monthly newsletter',
      ],
      also_included: ['Exclusive discounts', 'Advanced customization options'],
    },
    business: {
      features: [
        'Access to full product range',
        'Dedicated account manager',
        'Customizable solutions',
        'Priority customer support',
      ],
    },
  };

  const description = {
    standard:
      'The Standard plan is perfect for individuals looking to explore our basic product range with essential support and updates.',
    premium:
      'The Premium plan is ideal for small startups or agencies seeking full access to our product range, priority support, and exclusive benefits.',
    business:
      'The Business plan caters to enterprises requiring comprehensive access, dedicated support, and customizable solutions for their needs.',
  };

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Explore Our Exclusive Product Range`}</title>
        <meta
          name='description'
          content={`Browse through our extensive collection of stylish and modern apparel. Discover the perfect fit and style for every occasion at our online clothing store.`}
        />
      </Head>
      <WebSiteHeader projectName={'snuglife'} pages={pages} />
      <main className={`flex-grow  ${bgColor}    rounded-none  `}>
        <HeroSection
          projectName={'snuglife'}
          image={['Stylish clothing on display']}
          mainText={`Discover Your Perfect Style at ${projectName}`}
          subTitle={`Explore our exclusive range of apparel designed to suit every taste and occasion. At ${projectName}, we bring you the latest trends with a touch of elegance and comfort.`}
          design={HeroDesigns.IMAGE_BG || ''}
          buttonText={`Shop Now`}
        />

        <FeaturesSection
          projectName={'snuglife'}
          image={['Diverse clothing options']}
          withBg={0}
          features={features_points}
          mainText={`Unveil the Unique Features of ${projectName}`}
          subTitle={`Discover the exceptional features that make shopping at ${projectName} a delightful experience. From variety to convenience, we have it all.`}
          design={FeaturesDesigns.CARDS_GRID_WITH_ICONS || ''}
        />

        <GalleryPortfolioSection
          projectName={'snuglife'}
          images={images}
          mainText={`Explore Our Fashion Collection`}
          design={GalleryPortfolioDesigns.OVERLAPPING_CENTRAL_IMAGE || ''}
        />

        <PricingSection
          projectName={'snuglife'}
          withBg={0}
          features={pricing_features}
          description={description}
        />
      </main>
      <WebSiteFooter projectName={'snuglife'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
