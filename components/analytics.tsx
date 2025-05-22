'use client'

import Script from "next/script"

export const Analytics = () => (
  <>
    <Script
      src="https://www.googletagmanager.com/gtag/js?id=G-VQYVCB6GFM"
      strategy="afterInteractive"
    />
    <Script id="google-analytics" strategy="afterInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-VQVVCB6GFM');
      `}
    </Script>
  </>
)
