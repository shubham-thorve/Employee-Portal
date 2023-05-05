import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Benefits from '../components/Benefits';
import Panel2 from '../components/Panel2';
import Panel3 from '../components/Panel3';
import Panel from '../components/Panel';


const Home = () => {
  return (
    <div className='main'>
      {/* <Navbar/> */}
      <Panel/>
      <Panel2/>
      <Panel3/>
      <Benefits/>
      {/* <Footer/> */}
    </div>
  )
}

export default Home
