import React, { Component } from 'react';
import items from './data';

const RoomContext = React.createContext();

class RoomProvider extends Component {
  state = {
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true,
    type: 'all',
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false
  };

  componentDidMount() {
    let rooms = this.formatData(items);
    let featuredRooms = rooms.filter(room => room.featured);
    let maxPrice = Math.max(...rooms.map(item => item.price));
    let maxSize = Math.max(...rooms.map(item => item.size));

    this.setState({
      rooms,
      featuredRooms,
      sortedRooms: rooms,
      loading: false,
      price: maxPrice,
      maxPrice,
      maxSize
    });
  }

  formatData(items) {
    let tmpItems = items.map(item => {
      let id = item.sys.id;
      let images = item.fields.images.map(image => image.fields.file.url);
      let room = { ...item.fields, id, images };
      return room;
    });
    return tmpItems;
  }

  getRoom = slug => {
    let tmpRooms = [...this.state.rooms];
    const room = tmpRooms.find(room => room.slug === slug);

    return room;
  };

  handleChange = event => {
    const type = event.target.type;
    const name = event.target.name;
    const value =
      type === 'checkbox' ? event.target.checked : event.target.value;

    this.setState(
      {
        [name]: value
      },
      this.filterRooms
    );
  };

  filterRooms = () => {
    let {
      type,
      rooms,
      capacity,
      price,
      minSize,
      maxSize,
      breakfast,
      pets
    } = this.state;

    let tmpRooms = [...rooms];
    capacity = parseInt(capacity);
    price = parseInt(price);

    if (type !== 'all') {
      tmpRooms = tmpRooms.filter(room => room.type === type);
    }

    if (capacity !== 1) {
      tmpRooms = tmpRooms.filter(room => room.capacity >= capacity);
    }

    tmpRooms = tmpRooms.filter(room => room.price <= price);

    tmpRooms = tmpRooms.filter(
      room => room.size >= minSize && room.size <= maxSize
    );

    if (breakfast) {
      tmpRooms = tmpRooms.filter(room => room.breakfast);
    }

    if (pets) {
      tmpRooms = tmpRooms.filter(room => room.pets);
    }

    this.setState({
      sortedRooms: tmpRooms
    });
  };

  render() {
    return (
      <RoomContext.Provider
        value={{
          ...this.state,
          handleChange: this.handleChange,
          getRoom: this.getRoom
        }}
      >
        {this.props.children}
      </RoomContext.Provider>
    );
  }
}

const RoomConsumer = RoomContext.Consumer;

// HOC
export function withRoomConsumer(Component) {
  return function ComsumerWrapper(props) {
    return (
      <RoomConsumer>
        {value => <Component {...props} context={value} />}
      </RoomConsumer>
    );
  };
}

export { RoomContext, RoomProvider, RoomConsumer };
