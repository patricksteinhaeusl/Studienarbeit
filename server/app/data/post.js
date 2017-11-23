'use strict';

let LogUtil = require('../utils/log');
let Post = require('../models/post');

let data = {
  drop: function () {
    Post.remove({}, function(err) {
      if(err) return LogUtil.writeError(err);
      return LogUtil.writeInfo('Post removed');
    });
  },
  create: function() {
    let post0 = new Post({
      title: 'Post Title 1',
      text: 'Post Text 1',
      image: '9a216635b88bb6193d46be93980244011511455183855.jpeg'
    })
    .save(function(err) {
      if(err) return LogUtil.writeError(err);
      return LogUtil.writeInfo('Post saved');
    });

    let post1 = new Post({
      title: 'Post Title 2',
      text: 'Post Text 2',
      image: '9a216635b88bb6193d46be93980244011511455183855.jpeg'
    })
    .save(function(err) {
      if(err) return LogUtil.writeError(err);
      return LogUtil.writeInfo('Post saved');
    });

    let post2 = new Post({
      title: 'Post Title 3',
      text: 'Post Text 3',
      image: '9a216635b88bb6193d46be93980244011511455183855.jpeg'
    })
    .save(function(err) {
      if(err) return LogUtil.writeError(err);
      return LogUtil.writeInfo('Post saved');
    });
  }
};

module.exports = data;