const React = require('react');
//const interact = require('interact.js');
const jqueryUI = require('jquery-ui');
const $ = require('jquery');
const jqueryDraggable = require('jquery-ui/draggable');
const jqueryDroppable = require('jquery-ui/droppable');
const IdeaCard = React.createClass({

  getInitialState: function() {
    return {
      x: 0,
      y: 0,
      sizeTimeout: undefined, 
      attachTimeout: undefined
    };
  },
  /** Enables interact functionality after component is mounted
   *
   */
  componentDidMount: function() {
    // Add draggable functionality to component
    $(".bankCard").draggable({
      opacity: 0.7, 
      helper: "clone"
    });
    $(".workspaceCard").draggable({
      snap: true, 
      cursor: "move",
      cursorAt: { top: 56, left: 56 },
      disabled: false, //will make not draggable
      containment: ".dragContainer",
      snapTolerance: 20, //default, 
      stack: ".draggable",
      drag: this._onDrag,
      snapped: this._onSnapped,
      detach: this._onDetach
    });

    $(".draggable").droppable({
      hoverClass: ".drop-zone",
      drop: this._drop,
      over: this._over
    });
  },
  drag: function(event, ui){
    var draggable = $(this).data("ui-draggable");
      /*
        * draggable.snapElements is an array updated for every drag event
              It is an array of the potentially "snappable elements"

      */
      //http://jsfiddle.net/fhamidi/PjmJe/1/
            $.each(draggable.snapElements, function(index, element) {
              /* For each element in the draggables snap elements, 
                  update the element (ui) to have the correct snapping
                  (ui.snapping is set to true)*/
                ui = $.extend({}, ui, {
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
            });
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
    ui.snapElement.toggleClass("ui-state-highlight ui-state-default");
    this.props.attachTimeout = setTimeout(function(){
      $(event.toElement).addClass("ui-state-highlight");
    }, 1500);
  },
  _detach: function(event, ui) {
    console.log("unsnapped");
    ui.snapElement.addClass("ui-state-default").removeClass("ui-state-highlight");
    $(event.toElement).removeClass("ui-state-highlight");
    clearTimeout(this.props.attachTimeout);
  },
  _onDrop: function(event, ui) {
    if($(ui.draggable).hasClass("isMergable")){
      event.target.textContent += " " + ui.draggable[0].textContent;
      $(ui.draggable).remove();
    } else {
      clearTimeout(this.props.sizeTimeout);
    }
    /*const dropzoneElement = event.target;
    const newContent = [
      dropzoneElement.textContent,
      event.relatedTarget.textContent,
    ];
    const newCard = {
      content: newContent,
      keep: true,
    };
    this.props.parentIdeaMerge(newCard, this.props.ideaID);*/
  },
  /**
   * @return {object}
   */
  _over: function(event, ui) {
    console.log("hovering");
    this.props.sizeTimeout = setTimeout(function(){
      $(event.toElement).addClass("smallPreview isMergable");
    }, 1000);
  },
  _out: function(event, ui) {
    $(".smallPreview").removeClass("smallPreview isMergable");
      clearTimeout(sizeTimeout);
  },

  render: function() {
    const idea = this.props.idea;
    const ideaString = idea.content.toString();

    return (
      <div className="drag bankCard ui-widget-content drop-zone ui-state-default" style={this._style()}>
          {ideaString}
      </div>
    );
  },
});

module.exports = IdeaCard;
