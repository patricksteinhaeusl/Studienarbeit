'use strict';

const GlobalConfig = require('../configs/index');
const LogUtil = require('../utils/log');
const fs = require('fs');
const path = require('path');
const Post = require('../models/post');

let data = {
  drop: function(callback) {
    Post.remove({}, function(err) {
      if(err) LogUtil.writeError(err);
      LogUtil.writeInfo('Post removed');

      fs.readdir(GlobalConfig.postImages.directory, (error, files) => {
        if(error) throw error;

        for(const file of files) {
          if(GlobalConfig.postImages.defaultImages.indexOf(file.toLowerCase()) === -1) {
            fs.unlink(path.join(GlobalConfig.postImages.directory, file), error => {
              if(error) throw error;
              LogUtil.writeInfo('Post Image removed');
            });
          }
        }
        return callback();
      });
    });
  },
  create: function(callback) {
    let post0 = new Post({
      title: 'Post Title 1',
      text: 'Post Text 1',
      image: 'default.png'
    })
    .save(function(err) {
      if(err) LogUtil.writeError(err);
      LogUtil.writeInfo('Post saved');

      let post1 = new Post({
        title: 'Post Title 2',
        text: 'Post Text 2',
        image: 'default.png'
      })
      .save(function(err) {
        if(err) LogUtil.writeError(err);
        LogUtil.writeInfo('Post saved');

        let post2 = new Post({
          title: 'Post Title 3',
          text: 'Post Text 3',
          image: 'default.png'
        })
        .save(function(err) {
          if(err) LogUtil.writeError(err);
          LogUtil.writeInfo('Post saved');
          return callback();
        });
      });
    });
  }
};

module.exports = data;