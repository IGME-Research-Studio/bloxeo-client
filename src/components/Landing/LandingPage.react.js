const React = require('react');
const CreateRoom = require('./CreateRoom.react');
const JoinRoom = require('./JoinRoom.react');
const skrollr = require('../../../lib/skrollr.min.js');
const LandingPage = React.createClass({
	componentDidMount: function() {
		console.log("initializing");
		if(skrollr.get()) {
			console.log("destroying old one");
			skrollr.get().destroy();
		}
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
				          <h1 className="bloxeoTitle"> bloxeo </h1>
				          <ul className="landingNav">
				            <li className="landingNavEl"> Learn </li>
				            <li className="landingNavEl"> Blog </li>
				            <li className="landingNavEl"> Who We Are </li>
				          </ul>
				        </div>
								<div className="content">
			            <div className="textCopy">
			              <h1> Lets make your Eureka moment happen. </h1>
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
				        <div className="textContainer">
				          <h1> this is bloxeo </h1>
				          <p> Whether you need a new product, a sweet hackathon idea, 
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
					    <div className="contentContainer hsContainer">
						    <div className="textContainer">
									<h1> how it all works </h1>
									<p>Just like you used to do on the whiteboard, bloxeo lets your team 
									brainstorm in real time. Everyone contributes to an pulls from the idea bank. 
									Then drag cool ideas to the workspace to group them! When activity slows, it	O&#769;s 
									time to take a vote. Or just save your final groups and away you go! </p>
								</div>
					    </div>
					  </div>
					</section>
					<section id="slide-4" className="homeSlide">
						<div className="page page4 bcg">
			        <div className="contentContainer hsContainer">
			          <h1>what are you waiting for?</h1>
			          <h1>get started now!</h1>
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
