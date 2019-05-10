import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Banner from '../components/Banner';

export default function Home() {
  return (
    <Hero>
      <Banner title="Title" subtitle="Sub Title">
        <Link to="/rooms" className="btn-primary">
          Our rooms
        </Link>
      </Banner>
    </Hero>
  );
}
