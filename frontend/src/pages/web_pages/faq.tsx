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
  FaqDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import FaqSection from '../../components/WebPageComponents/FaqComponent';

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

  const faqs = [
    {
      question: 'What is the return policy?',
      answer:
        'We offer a 30-day return policy for unused items in their original packaging. Contact our support team to initiate a return and receive further instructions.',
    },
    {
      question: 'How do I track my order?',
      answer:
        "Once your order is shipped, you will receive a tracking number via email. Use this number to track your package on our website or the carrier's site.",
    },
    {
      question: 'Can I change my order after placing it?',
      answer:
        'Yes, you can modify your order within 24 hours of placing it. Contact our support team for assistance with changes.',
    },
    {
      question: 'What payment methods are accepted?',
      answer:
        'We accept various payment methods including credit/debit cards, PayPal, and Stripe. Choose the option that best suits you during checkout.',
    },
    {
      question: 'How do I contact customer support?',
      answer:
        'You can reach our customer support team via the contact form on our website or by emailing support@projectname.com. We aim to respond within 24 hours.',
    },
    {
      question: 'Are there any discounts available?',
      answer:
        'We offer seasonal discounts and promotions. Subscribe to our newsletter or follow us on social media to stay updated on the latest offers.',
    },
    {
      question: 'How do I create an account?',
      answer:
        "Creating an account is easy. Click on the 'Sign Up' button on our homepage, fill in your details, and follow the instructions to set up your account.",
    },
  ];

  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>{`Frequently Asked Questions`}</title>
        <meta
          name='description'
          content={`Find answers to common questions about our products, services, and policies. Get the information you need quickly and easily.`}
        />
      </Head>
      <WebSiteHeader projectName={'snuglife'} pages={pages} />
      <main className={`flex-grow  ${bgColor}    rounded-none  `}>
        <HeroSection
          projectName={'snuglife'}
          image={['Person reading FAQ document']}
          mainText={`Your Questions Answered at ${projectName}`}
          subTitle={`Explore our comprehensive FAQ section to find answers to your most pressing questions about ${projectName}. We're here to help you every step of the way.`}
          design={HeroDesigns.TEXT_CENTER || ''}
          buttonText={`Learn More`}
        />

        <FaqSection
          projectName={'snuglife'}
          design={FaqDesigns.TWO_COLUMN || ''}
          faqs={faqs}
          mainText={`Common Questions About ${projectName} `}
        />
      </main>
      <WebSiteFooter projectName={'snuglife'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
