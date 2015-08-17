var Reflux = require('reflux');

module.exports = Reflux.createActions([
  'login',
  'authenticate',
  'logout',
  'signup',
  'submitComment',
  'submitReply',
  'fetchLesson',
  'updateUser',
  'deleteComment',
  'likeComment',
  'unlikeComment',
  'starComment',
  'likeReply',
  'unlikeReply',
  'starReply',
  'deleteReply',
  'createLesson',
  'sendLesson',
  'getUser',
  'createExercise',
  'followLesson',
  'togglePublish',
  'deleteLesson'
]);
