import React from 'react';
import NavigationLogo from './NavigationLogo';
import NavigationButton from './NavigationButton';

const Navigation = () => {
  return (
    <nav>
      <NavigationLogo />
      <NavigationButton />
      <NavigationButton />
      <NavigationButton />
      <NavigationButton />
      <NavigationButton />
    </nav>
  );
};

export default Navigation;
