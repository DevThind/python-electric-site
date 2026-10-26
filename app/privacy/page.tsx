import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/lib/content';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = pageMetadata('Privacy', 'How Python Electric handles website enquiries and visitor analytics.', '/privacy');

export default function PrivacyPage() {
  return <section className="legal-page shell">
    <span className="eyebrow">Privacy / Python Electric</span>
    <h1>Privacy</h1>
    <p className="legal-lead">This page explains how website enquiry information and visitor analytics are handled.</p>
    <h2>What you send us</h2>
    <p>The quote form asks for your name, a way to contact you, your service interest, your city or area, and a brief description of the project. Please do not include sensitive personal information in the project description.</p>
    <h2>How it is used</h2>
    <p>Enquiry details are used to review and respond to your request. The form sends them to a designated Python Electric inbox through Resend when delivery is configured.</p>
    <h2>Technical information</h2>
    <p>The form uses validation and a hidden spam check to help prevent abuse. Hosting and delivery services may process technical logs needed to operate the site.</p>
    <h2>Analytics and cookies</h2>
    <p>This website uses Vercel Web Analytics to understand visitor numbers and page views. It collects information such as the pages visited, referring website, browser, device type, and approximate location for aggregate statistics, without using tracking cookies. We do not send enquiry form contents to analytics. Essential hosting functions may still use technical cookies or logs. Learn more in <a href="https://vercel.com/docs/analytics/privacy-policy">Vercel&apos;s analytics privacy documentation</a>.</p>
    <h2>Questions about your information</h2>
    <p>You can ask how your enquiry information is handled by emailing <a className="email-link" href={'mailto:' + site.email}>{site.email}</a> or using the contact form.</p>
    <h2>External links</h2>
    <p>Links to Instagram lead to a separate service with its own privacy practices.</p>
    <p className="legal-end">{site.name} · {site.location}<br /><Link href="/contact">Return to contact</Link></p>
  </section>;
}
