import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/lib/content';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = pageMetadata('Privacy', 'How Python Electric handles information submitted through its website quote form.', '/privacy');

export default function PrivacyPage() {
  return <section className="legal-page shell">
    <span className="eyebrow">Privacy / Python Electric</span>
    <h1>Privacy</h1>
    <p className="legal-lead">This page explains how information submitted through the website enquiry form is handled.</p>
    <h2>What you send us</h2>
    <p>The quote form asks for your name, a way to contact you, your service interest, your city or area, and a brief description of the project. Please do not include sensitive personal information in the project description.</p>
    <h2>How it is used</h2>
    <p>Enquiry details are used to review and respond to your request. The form sends them to a designated Python Electric inbox through Resend when delivery is configured.</p>
    <h2>Technical information</h2>
    <p>The form uses a hidden spam check and a request limit through Upstash Redis. A short-lived, one-way identifier based on your network address may be stored there to help prevent abuse. Hosting and delivery services may process technical logs needed to operate the site.</p>
    <h2>Analytics and cookies</h2>
    <p>This website does not add analytics or advertising pixels. Essential hosting functions may still use technical cookies or logs.</p>
    <h2>Questions about your information</h2>
    <p>You can ask how your enquiry information is handled by using the contact form.</p>
    <h2>External links</h2>
    <p>Links to Instagram lead to a separate service with its own privacy practices.</p>
    <p className="legal-end">{site.name} · {site.location}<br /><Link href="/contact">Return to contact</Link></p>
  </section>;
}
