var _ = require('lodash');
var React = require('react');
var Reflux = require('reflux');
var Actions = require('../../actions');
var Router = require('react-router');
var Navigation = Router.Navigation;

var LessonConfigStore = require('../../stores/LessonConfigStore');
var VideoPlayer = require('./ConfigVideoPlayer.jsx');
var ExerciseTypes = require('./ExerciseTypes.jsx');
var CurrentExercisesList = require('./CurrentExercisesList.jsx');

var MultiChoiceCreation = require('../basicExercises/MultiChoiceCreation.jsx');
var TrueFalseCreation = require('../basicExercises/TrueFalseCreation.jsx');
var ShortAnswerCreation = require('../basicExercises/ShortAnswerCreation.jsx');


var LessonConfiguration = React.createClass({
  mixins: [Reflux.connect(LessonConfigStore, "lesson"), Navigation],

  getInitialState: function() {
    return {
      editing : null
    }
  },

  componentWillMount: function() {
    Actions.triggerConfigStore();
  },

  mapExerciseType: function() {
    var exerciseTypeMap = {
      'multiplechoice' : <MultiChoiceCreation exerciseState={this.state.exerciseState || {}} onComplete={this.setEditing}/>,
      'truefalse' : <TrueFalseCreation exerciseState={this.state.exerciseState || {}} onComplete={this.setEditing}/>,
      'shortanswer' : <ShortAnswerCreation exerciseState={this.state.exerciseState || {}} onComplete={this.setEditing}/>,
    }

    return exerciseTypeMap[this.state.editing];
  },

  loadExercise: function(exerciseInfo) {
    var exercise = exerciseInfo.exercise;
    this.setState({
      editing: exercise.type,
      exerciseState : exercise
    })
  },

  render: function() {
    return (
      <div className="container">
        <ul className="list-group row config-container">
          <li className="list-group-item col-md-8">
            <VideoPlayer />
          </li>
          {this.state.lesson && <CurrentExercisesList onPublish={this.publishLesson} reloadExercise={this.loadExercise} exercises={this.state.lesson.exercises}/>}

          <li className="list-group-item col-md-12">
            {!this.state.editing &&
            <ExerciseTypes chooseType={this.setEditing} />}
          </li>
        </ul>
          <div className="panel panel-default">
            {this.state.editing &&
            this.mapExerciseType()}
          </div>
      </div>
    );
  },

  publishLesson: function() {
    var self = this;

    Actions.publish(this.state.lesson)
    .then(function(res) {
      console.log("published: ", res);
      self.transitionTo('/library');
    })
  },

  setEditing: function(exerciseType) {
    this.setState({
      editing : exerciseType
    })
  }

});

module.exports = LessonConfiguration;
