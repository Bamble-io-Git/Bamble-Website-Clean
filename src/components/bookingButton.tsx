"use client";

import { Button, ButtonProps } from '@/components/ui/button'; // 1. Import ButtonProps
import Script from 'next/script';
import { useState } from "react";

// 2. Extend the standard ButtonProps so we inherit 'variant', 'size', etc.
interface BookingButtonProps extends ButtonProps {}

const BookingButton = ({ children, onClick, ...props }: BookingButtonProps) => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  const handleBooking = (e: React.MouseEvent<HTMLButtonElement>) => {
    // If the user passed an onClick prop, run it (optional best practice)
    if (onClick) onClick(e);
    
    e.preventDefault();

    // @ts-ignore
    if (window.Calendly) {
      // @ts-ignore
      window.Calendly.initPopupWidget({
        url: 'https://calendly.com/ayodaramola/bamble'
      });
    } else {
      console.error("Calendly script is not loaded yet.");
    }
  };

  return (
    <>
      <Script 
        src="https://assets.calendly.com/assets/external/widget.js" 
        strategy="afterInteractive"
        onLoad={() => setIsScriptLoaded(true)}
      />


      <Button 
        onClick={handleBooking}
        {...props} 
      >
        {children}
      </Button>
    </>
  );
};

export default BookingButton;
