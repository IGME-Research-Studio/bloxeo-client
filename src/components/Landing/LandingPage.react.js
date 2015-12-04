const React = require('react');
const CreateRoom = require('./CreateRoom.react');
const JoinRoom = require('./JoinRoom.react');
const skrollr = require('../../../lib/skrollr.min.js');

const LandingPage = React.createClass({
	componentDidMount: function() {
		var s = skrollr.init({ 
			smoothScrolling: false,
		});
	},
  render: function() {
    return (

      <div classNameName="landingPage">
      	<main>
			    <section id="slide-1" className="homeSlide">
				    <div className="page bcg page1">
				      <div className="contentContainer hscontainer">
				        <div className="header">
				          <h1 className="bloxeoTitle"> Bloxeo </h1>
				          <ul className="landingNav">
				            <li className="landingNavEl"> Learn </li>
				            <li className="landingNavEl"> Demo </li>
				            <li className="landingNavEl"> Blog </li>
				          </ul>
				        </div>
								<div className="content">
			            <div className="textCopy">
			              <h1> A brainstorming app for teams </h1>
			              <p> We&rsquo;re so sophisticated that our own devs
			              can&rsquo;t even figure out how to use this. </p>
			            </div>
			            <div className="joinLinks">
			              <CreateRoom />
			              <JoinRoom />
			              <p> By creating a room, you are agreeing to our
			              (a bit unethical) Terms of Service </p>
			            </div>
			          </div>
				      </div>
				      <div className="footer">
			      		<p> What is Bloxeo? </p>
			    		</div>
			    	</div>
			  	</section>   
				  <section id="slide-2" className="homeSlide" data-anchor-target="#slide-1" data-center-center="top:-100%;" data-top-bottom="top:0%;">
				    <div className="page page2 bcg">
			        <div className="contentContainer hsContainer">
			          <h1> My girlfriend found out I was cheating. </h1>
			          <p> How? She found the letters I have been hiding.
			            She got real mad and said she would never play Scrabble
			            with me ever again.</p>
			        </div>
			      </div>
				  </section>
				    
					<section id="slide-3" className="homeSlide">
						<div className="page page3 bcg">
					    <div className="contentContainer hsContainer">
								<h1> Does anyone watch the flash? </h1>
					    </div> 	
					  </div>
					</section>
					
					<section id="slide-4" className="homeSlide">
						<div className="page page4 bcg">
			        <div className="contentContainer hsContainer">
			          <h1>Chuck Norris doesn&rsquo;t need an account. </h1>
			          <h1>He just logs in. </h1>
			          <input type="text" name="projectName" placeholder="What's your project name?"/>
			          <input type="text" name="projectName" placeholder="What's your name?"/>
			          <CreateRoom />
			          <p> By creating a room you&rsquo;re agreeing to our Terms of Service
			          (It&rsquo;s a bit unethical).</p>
			        </div>
			      </div>
					</section>    
				</main>
        <CreateRoom />
      </div>
    );
  },
});

module.exports = LandingPage;
