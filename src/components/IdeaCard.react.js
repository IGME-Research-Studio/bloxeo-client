const React = require('react');
//const interact = require('interact.js');
const jqueryUI = require('jquery-ui');
const $ = require('jquery');
const jqueryDraggable = require('jquery-ui/draggable');
const jqueryDroppable = require('jquery-ui/droppable');
const IdeaCard = React.createClass({

  
  getInitialState: function() {
    var ideaGroup = [];
    return {
      x: 0,
      y: 0,
      sizeTimeout: undefined, 
      attachTimeout: undefined, 
      ideas: ideaGroup
    };
  },
  /** Enables interact functionality after component is mounted
   *
   */
  componentDidMount: function() {
    // Add draggable functionality to component
    $(".bankCard").draggable({
      connectToSortable: ".sortable",
      opacity: 0.7, 
      helper: "clone"
    });
    $(".workspaceCard").draggable({
      snap: true, 
      connectToSortable: ".sortable",
      cursor: "move",
      cursorAt: { top: 56, left: 56 },
      disabled: false, //will make not draggable
      containment: ".dragContainer",
      snapTolerance: 20, //default, 
      stack: ".draggable",
      drag: this._drag,
      snapped: this._snapped,
      detach: this._detach
    });

    $(".draggable").droppable({
      hoverClass: ".drop-zone",
      drop: this._onDrop,
      over: this._over
    });
  },
  _drag: function(event, ui){
    //console.log("dragging");
    //console.log(event);
    /*var draggable = $(ui).data("ui-draggable");
    console.log(draggable);
      /*
        * draggable.snapElements is an array updated for every drag event
              It is an array of the potentially "snappable elements"

      */
      //http://jsfiddle.net/fhamidi/PjmJe/1/
            /*$.each(draggable.snapElements, function(index, element) {
              /* For each element in the draggables snap elements, 
                  update the element (ui) to have the correct snapping
                  (ui.snapping is set to true)*/
                /*ui = $.extend({}, ui, {
                    snapElement: $(element.item),
                    snapping: element.snapping
                }); 
                //console.log($(element.item));
                //if the element has snapped
                if (element.snapping) {
                  //and we didnt already know that
                    if (!element.snappingKnown) {
                        //make a note that we know now that the element has snapped
                        element.snappingKnown = true;
                        //trigger the snap event
                        draggable._trigger("snapped", event, ui);
                    }
                } else { //if the element is not snapping (it was moved or never snapped)
                    //make a note that we know that it is not snapping anymore/still
                    if(element.snappingKnown) {
                      element.snappingKnown = false;
                      draggable._trigger("detach", event, ui);
                    }
                    
                }
            });*/
  },
  /**
   * @return {object}
   */
  _style: function() {
    return {
      transform: `translate(${this.state.x}px,${this.state.y}px)`,
    };
  },
  /**
   * @param event: event obj
   */
  _snapped: function(event, ui) {
    console.log("snapped");

    /*
    ui.snapElement.toggleClass("ui-state-highlight ui-state-default");
    this.props.attachTimeout = setTimeout(function(){
      $(event.toElement).addClass("ui-state-highlight");
    }, 1500);*/
  },
  _detach: function(event, ui) {
    console.log("unsnapped");

    /*
    ui.snapElement.addClass("ui-state-default").removeClass("ui-state-highlight");
    $(event.toElement).removeClass("ui-state-highlight");
    clearTimeout(this.props.attachTimeout);*/
  },
  _onDrop: function(event, ui) {
    console.log("card is dropped");
    /* Add the new card to our array to add it to the group of data */
    //console.log(ui.draggable);
    //console.log(this.props.ideas);
    //console.log(this.props.ideas.length)
    this.props.ideas.push(ui.draggable);
    //console.log(this.props.ideas);
    //console.log(this.props.ideas.length);
    this.forceUpdate();
  },
  /**
   * @return {object}
   */
  _over: function(event, ui) {
    console.log("hovering");

  },
  _out: function(event, ui) {
    console.log("not hovering");
  },

  render: function() {
    const idea = this.props.idea;
    const ideaString = idea.content.toString();

    if(this.props.ideas.length == 1) {
      return (
        <div className="drag draggable workspaceCard ui-widget-content drop-zone ui-state-default" style={this._style()}>
          {ideaString}
        </div>
      );
    }
    else {
      console.log(this.props.ideas.length);
      return (
      <div className="ideaGroup">
        {this.props.ideas.map( function(item, i) {
          <div className="drag draggable workspaceCard ui-widget-content drop-zone ui-state-default">
            {ideaString}
          </div>
        })}
      </div>
    );
    }
    
  },
});

module.exports = IdeaCard;
