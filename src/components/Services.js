import React, { Component } from 'react';
import { FaCocktail, FaHiking, FaShuttleVan, FaBeer } from 'react-icons/fa';
import Title from './Title';

export default class Services extends Component {
  state = {
    services: [
      {
        icon: <FaCocktail />,
        title: 'Free cocktails',
        info: 'Lorem ipsum dolor sit amet'
      },
      {
        icon: <FaHiking />,
        title: 'Endless Hiking',
        info: 'Lorem ipsum dolor sit amet'
      },
      {
        icon: <FaShuttleVan />,
        title: 'Free shuttle',
        info: 'Lorem ipsum dolor sit amet'
      },
      {
        icon: <FaBeer />,
        title: 'Strongest Beer',
        info: 'Lorem ipsum dolor sit amet'
      }
    ]
  };
  render() {
    return (
      <div>
        <Title title="services" />
      </div>
    );
  }
}
