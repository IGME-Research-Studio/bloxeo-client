import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import colorTheme from '../colorTheme';

import ErrorSnackbar from '../components/ErrorSnackbar';
import FeatureButton from '../components/UI/FeatureButton';

import bloxeoImg from '../assets/bloxeo.png';
import magicImg from '../assets/MAGIC.png';
import igmImg from '../assets/IGM.png';
import nmdImg from '../assets/NMD.png';
import codyImg from '../assets/Cody.png';
import dougImg from '../assets/Doug.png';
import shoesImg from '../assets/DougShoes.png';
import laptopImg from '../assets/Laptop.png';
import whiteboardImg from '../assets/Whiteboard.png';
import eggImg from '../assets/Egg.png';

import ErrorStore from '../stores/ErrorStore';

// Add state logic for ErrorSnackbar component. Find a way to use props instead

class LandingContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 'error': '', 'errorOpen': false };
  }

  componentDidMount() {
    ErrorStore.addErrorListener(this._onError);
  }

  componentWillUnmount() {
    ErrorStore.removeErrorListener(this._onError);
  }

  _closeErrorSnackbar = () => {
    this.setState({errorOpen: false});
  }

  _onError = ({error, errorOpen}) => {
    this.setState({error, errorOpen});
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={colorTheme}>

      <div className="landingPage">
        <main>

          <section id="slide-1" className="homeSlide">
            <div className="page bcg page1">
              <div className="contentContainer hscontainer centered">
                <div className="content column centered">
                  <div className="header">
                    <img className="poweredByImg" src={ bloxeoImg } />
                    <h1 className="bloxeoTitle"> bloxeo </h1>
                  </div>
                  <div className="contentRow row">
                    <div className="textCopy">
                      <h1> Let&rsquo;s make your Eureka moment happen. </h1>
                    </div>
                    <div className="joinLinks">

                      <FeatureButton
                        secondary
                        url='/create'
                        label='Create a room'
                      />

                      <FeatureButton
                        primary
                        url='/join'
                        label='Join a room'
                      />
                    </div>
                  </div>
                </div>
                <div className="images">
                  <img className="codyImg" src={ codyImg } />
                  <img className="dougImg" src={ dougImg } />
                  <img className="dougShoesImg" src={ shoesImg } />
                </div>
               </div>
              <div className="footer">
                <p> What is Bloxeo? </p>
              </div>
            </div>
          </section>

          <section id="slide-2" className="homeSlide" >
            <div className="page page2 bcg">
              <div className="contentContainer hsContainer column centered">
                <div className="images">
                  <img className="laptopImg" src={ laptopImg } />
                </div>
                <div className="textContainer">
                  <h1>This is Bloxeo </h1>
                  <p>Whether you need a new product, a sweet hackathon idea,
                   or you just want to make the world a better place, bloxeo
                   can help. Gather your team to create ideas and group them
                   together. Once you have your groupings, vote or agree on
                   the right one - then the rest is up to you.</p>
                 </div>
              </div>
            </div>
          </section>

          <section id="slide-3" className="homeSlide">
            <div className="page page3 bcg">
              <div className="contentContainer hsContainer row centered">
                <div className="textContainer">
                  <h1> Drag & Drop Ideas </h1>
                  <p>
                    Generate ideas to be added to a growing bank of idea blocks.
                  </p>
                </div>
                <div className="images">
                  <img className="whiteboardImg" src={ whiteboardImg } />
               </div>
              </div>
            </div>
          </section>

          <section id="slide-4" className="homeSlide">
            <div className="page page4 bcg">
              <div className="contentContainer hsContainer column centered">
                <div className="content">
                  <div className="textContent">
                    <p> Bloxeo is powered by the students and faculty of</p>
                  </div>
                </div>
                <div className="images">
                  <img className="poweredByImg" src={ magicImg } />
                  <img className="poweredByImg" src={ igmImg } />
                  <img className="poweredByImg" src={ nmdImg } />
                </div>
              </div>
            </div>
          </section>

          <section id="slide-5" className="homeSlide" >

            <div className="page page5 bcg">
              <div className="contentContainer hsContainer column homeSlide" >

                <div className="images">
                  <img className="eggImg" src={ eggImg } />
                </div>

                <div className="content">
                  <div className="textContent">
                    <h1>What are you waiting for?</h1>
                    <h1>Get started.</h1>
                  </div>

                  <div>
                    <FeatureButton
                      secondary
                      fullWidth={false}
                      url='/create'
                      label='Create a room'
                    />
                  </div>
                 </div>
              </div>
            </div>
          </section>
        </main>
        {this.props.children}
        <ErrorSnackbar
          error={this.state.error}
          open={this.state.errorOpen}
          close={this._closeErrorSnackbar}
        />
      </div>

    </MuiThemeProvider>
    );
  }
}

module.exports = LandingContainer;
