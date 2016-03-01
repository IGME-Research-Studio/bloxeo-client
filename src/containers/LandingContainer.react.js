import React from 'react';
import MuiThemeProvider from 'material-ui/lib/MuiThemeProvider';
import colorTheme from '../colorTheme';

import FeatureButton from '../components/UI/FeatureButton.react';
import SocketStore from '../stores/SocketStore';

function getStates() {
  return {
    joinError: SocketStore.getErrorMessage(),
  };
}

const LandingContainer = React.createClass({

  getInitialState: function() {
    return getStates();
  },

  componentDidMount: function() {
    SocketStore.addErrorListener(this._onChange);
  },

  componentWillUnmount: function() {
    SocketStore.removeErrorListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getStates());
  },

  render: function() {
    return (
      <MuiThemeProvider muiTheme={colorTheme}>

      <div classNameName="landingPage">
        <main>

          <section id="slide-1" className="homeSlide">
            <div className="page bcg page1">
              <div className="contentContainer hscontainer centered">
                <div className="content column centered">
                  <div className="header">
                    <img className="poweredByImg" src="/assets/bloxeo.png" />
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

                      <p>
                        By creating a room, you are agreeing to our
                        <a className="termsOfService">Terms of Service</a>.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="images">
                  <img className="codyImg" src="/assets/Cody.png" />
                  <img className="dougImg" src="/assets/Doug.png" />
                  <img className="dougShoesImg" src="/assets/DougShoes.png" />
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
                  <img className="laptopImg" src="/assets/Laptop.png" />
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
                  <img className="whiteboardImg" src="/assets/Whiteboard.png" />
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
                  <img className="poweredByImg" src="/assets/MAGIC.png" />
                  <img className="poweredByImg" src="/assets/IGM.png" />
                  <img className="poweredByImg" src="/assets/NMD.png" />
                </div>
              </div>
            </div>
          </section>

          <section id="slide-5" className="homeSlide" >

            <div className="page page5 bcg">
              <div className="contentContainer hsContainer column homeSlide" >

                <div className="images">
                  <img className="eggImg" src="/assets/Egg.png" />
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

                  <p>
                    By creating a room you&rsquo;re agreeing to our
                    <a className="termsOfService">Terms of Service</a>.
                  </p>
                 </div>
              </div>
            </div>
          </section>
        </main>
        {this.props.children}
      </div>

    </MuiThemeProvider>
    );
  },
});

module.exports = LandingContainer;
