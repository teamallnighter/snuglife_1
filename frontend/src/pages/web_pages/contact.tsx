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
  ContactFormDesigns,
  FaqDesigns,
} from '../../components/WebPageComponents/designs';

import HeroSection from '../../components/WebPageComponents/HeroComponent';

import ContactFormSection from '../../components/WebPageComponents/ContactFormComponent';

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
      question: 'How do I place an order?',
      answer:
        'To place an order, simply browse our product range, select your desired items, and add them to your cart. Proceed to checkout and follow the prompts to complete your purchase.',
    },
    {
      question: 'What payment methods are accepted?',
      answer:
        'We accept various payment methods including credit/debit cards, PayPal, and Stripe. Choose the option that best suits you during checkout.',
    },
    {
      question: 'Can I track my order?',
      answer:
        "Yes, once your order is shipped, you will receive a tracking number via email. Use this number to track your package on our website or the carrier's site.",
    },
    {
      question: 'What is your return policy?',
      answer:
        'We offer a 30-day return policy for unused items in their original packaging. Contact our support team to initiate a return and receive further instructions.',
    },
    {
      question: 'How can I contact customer support?',
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
        <title>{`Get in Touch with Us`}</title>
        <meta
          name='description'
          content={`Reach out to us for any inquiries or support. Our team is here to assist you with all your needs. Explore our FAQs for quick answers.`}
        />
      </Head>
      <WebSiteHeader projectName={'snuglife'} pages={pages} />
      <main className={`flex-grow  ${bgColor}    rounded-none  `}>
        <HeroSection
          projectName={'snuglife'}
          image={['Customer service representative smiling']}
          mainText={`Connect with ${projectName} Today`}
          subTitle={`We're here to help with any questions or support you need. Reach out to our team and let us assist you in your journey with ${projectName}.`}
          design={HeroDesigns.IMAGE_RIGHT || ''}
          buttonText={`Contact Us`}
        />

        <FaqSection
          projectName={'snuglife'}
          design={FaqDesigns.ACCORDION || ''}
          faqs={faqs}
          mainText={`Frequently Asked Questions About ${projectName} `}
        />

        <ContactFormSection
          projectName={'snuglife'}
          design={ContactFormDesigns.WITH_IMAGE || ''}
          image={['Person typing on keyboard']}
          mainText={`Reach Out to ${projectName} Support `}
          subTitle={`Our team is available to assist you with any inquiries. Expect a prompt response to ensure your satisfaction with ${projectName}.`}
        />
      </main>
      <WebSiteFooter projectName={'snuglife'} pages={pages} />
    </div>
  );
}

WebSite.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGuest>{page}</LayoutGuest>;
};
