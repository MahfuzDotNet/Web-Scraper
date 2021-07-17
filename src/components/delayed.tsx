import React, { useState, useEffect } from 'react';
import Loader from "./loader";

type Props = {
  children: React.ReactNode;
  waitBeforeShow?: number;
};

const Delayed = ({ children, waitBeforeShow } : any) => {
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsShown(true);
    }, waitBeforeShow);
  }, [waitBeforeShow]);

  return  isShown ? children : null;
  
};

export default Delayed;