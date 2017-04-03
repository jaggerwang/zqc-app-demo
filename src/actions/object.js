/**
 * 在球场
 * zaiqiuchang.com
 */

import * as apis from '../apis';
import * as helpers from '../helpers';

export const RESET_OBJECT_CACHE = 'reset_object_cache';
export const CACHE_OBJECTS = 'cache_objects';

export function resetObjectCache() {
  return {
    type: RESET_OBJECT_CACHE,
  };
}

export function cacheObjects({users, userIds, posts, postIds, postComments, 
  postCommentIds, courts, courtIds, files, fileIds, userStats, userStatIds, 
  postStats, postStatIds, courtStats, courtStatIds, fileStats, fileStatIds}) {
  let aToO = (objects, objectIds) => {
    let o = objects.reduce((o, v) => {
      o[v.id] = v;
      return o;
    }, {});
    if (objectIds !== undefined) {
      objectIds.forEach(v => {
        if (o[v] === undefined) {
          o[v] = null;
        }
      });
    }
    return o;
  };

  let action = {
    type: CACHE_OBJECTS,
  };
  if (users !== undefined) {
    action.users = aToO(users, userIds);
  }
  if (posts !== undefined) {
    action.posts = aToO(posts, postIds);
  }
  if (postComments !== undefined) {
    action.postComments = aToO(postComments, postCommentIds);
  }
  if (courts !== undefined) {
    action.courts = aToO(courts, courtIds);
  }
  if (files !== undefined) {
    action.files = aToO(files, fileIds);
  }
  if (userStats !== undefined) {
    action.userStats = aToO(userStats, userStatIds);
  }
  if (postStats !== undefined) {
    action.postStats = aToO(postStats, postStatIds);
  }
  if (courtStats !== undefined) {
    action.courtStats = aToO(courtStats, courtStatIds);
  }
  if (fileStats !== undefined) {
    action.fileStats = aToO(fileStats, fileStatIds);
  }

  return action;
}

export function cacheUsers({users, userIds}) {
  return (dispatch, getState) => {
    let ps = [dispatch(cacheObjects({users, userIds}))];

    let avatarIds = [];
    let avatarFiles = [];
    users.filter(v => v !== null).forEach(user => {
      if (user.avatarType == 'custom') {
        avatarIds.push(user.avatarId);
        if (user.avatarFile) {
          avatarFiles.push(user.avatarFile);
          delete user.avatarFile;
        }
      }
    });
    if (avatarFiles.length > 0) {
      ps.push(dispatch(cacheFiles({files: avatarFiles, fileIds: avatarIds})));
    } else {
      ps.push(dispatch(cacheFileByIds({fileIds: avatarIds})));
    }

    let userStatIds = [];
    let userStats = [];
    users.filter(v => v !== null).forEach(user => {
      userStatIds.push(user.id);
      if (user.stat) {
        userStats.push(user.stat);
        delete user.stat;
      }
    });
    if (userStats.length > 0) {
      ps.push(dispatch(cacheUserStats({userStats})));
    } else {
      ps.push(dispatch(cacheUserStatByIds({userStatIds})));
    }

    return Promise.all(ps)
      .then(() => {
        let {object} = getState();
        return users.map(v => helpers.userFromCache(object, v.id));
      });
  };
}

export function cacheUserByIds({userIds, update = false}) {
  return (dispatch, getState) => {
    let {object} = getState();
    userIds = Array.from(new Set(userIds));
    if (!update) {
      userIds = userIds.filter(v => object.users[v] === undefined);
    }
    if (userIds.length > 0) {
      return apis.userInfos(userIds)
        .then(response => {
          let {data: {users}} = response;
          return dispatch(cacheUsers({users, userIds}));
        });
    } else {
      return [];
    }
  };
}

export function cachePosts({posts, postIds}) {
  return (dispatch, getState) => {
    let ps = [dispatch(cacheObjects({posts, postIds}))];

    let creatorIds = [];
    let creators = [];
    posts.filter(v => v !== null).forEach(post => {
      creatorIds.push(post.creatorId);
      if (post.creator) {
        creators.push(post.creator);
        delete post.creator;
      }
    });
    if (creators.length > 0) {
      ps.push(dispatch(cacheUsers({users: creators, userIds: creatorIds})));
    } else {
      ps.push(dispatch(cacheUserByIds({userIds: creatorIds})));
    }

    let courtIds = [];
    let courts = [];
    posts.filter(v => v !== null).forEach(post => {
      courtIds.push(post.courtId);
      if (post.court) {
        courts.push(post.court);
        delete post.court;
      }
    });
    if (courts.length > 0) {
      ps.push(dispatch(cacheCourts({courts, courtIds})));
    } else {
      ps.push(dispatch(cacheCourtByIds({courtIds})));
    }

    let imageIds = [];
    let imageFiles = [];
    posts.filter(v => v !== null).forEach(post => {
      imageIds = imageIds.concat(post.imageIds);
      if (post.imageFiles) {
        imageFiles = imageFiles.concat(post.imageFiles);
        delete post.imageFiles;
      }
    });
    if (imageFiles.length > 0) {
      ps.push(dispatch(cacheFiles({files: imageFiles, fileIds: imageIds})));
    } else {
      ps.push(dispatch(cacheFileByIds({fileIds: imageIds})));
    }

    let postStatIds = [];
    let postStats = [];
    posts.filter(v => v !== null).forEach(post => {
      postStatIds.push(post.id);
      if (post.stat) {
        postStats.push(post.stat);
        delete post.stat;
      }
    });
    if (postStats.length > 0) {
      ps.push(dispatch(cachePostStats({postStats})));
    } else {
      ps.push(dispatch(cachePostStatByIds({postStatIds})));
    }

    return Promise.all(ps)
      .then(() => {
        let {object} = getState();
        return posts.map(v => helpers.postFromCache(object, v.id));
      });
  };
}

export function cachePostByIds({postIds, update = false}) {
  return (dispatch, getState) => {
    let {object} = getState();
    postIds = Array.from(new Set(postIds));
    if (!update) {
      postIds = postIds.filter(v => object.posts[v] === undefined);
    }
    if (postIds.length > 0) {
      return apis.postInfos(postIds)
        .then(response => {
          let {data: {posts}} = response;
          return dispatch(cachePosts({posts, postIds}));
        });
    } else {
      return [];
    }
  };
}

export function cachePostLikes({postLikes}) {
  return (dispatch, getState) => {
    let ps = [];

    let userIds = [];
    let users = [];
    postLikes.filter(v => v !== null).forEach(postLike => {
      userIds.push(postLike.userId);
      if (postLike.user) {
        users.push(postLike.user);
        delete postLike.user;
      }
    });
    if (users.length > 0) {
      ps.push(dispatch(cacheUsers({users, userIds})));
    } else {
      ps.push(dispatch(cacheUserByIds({userIds})));
    }

    let postIds = [];
    let posts = [];
    postLikes.filter(v => v !== null).forEach(postLike => {
      postIds.push(postLike.postId);
      if (postLike.post) {
        posts.push(postLike.post);
        delete postLike.post;
      }
    });
    if (posts.length > 0) {
      ps.push(dispatch(cachePosts({posts, postIds})));
    } else {
      ps.push(dispatch(cachePostByIds({postIds})));
    }

    return Promise.all(ps)
      .then(() => {
        let {object} = getState();
        return postLikes.map(v => helpers.postLikeFromCache(object, v));
      });
  };
}

export function cachePostComments({postComments, postCommentIds}) {
  return (dispatch, getState) => {
    let ps = [dispatch(cacheObjects({postComments, postCommentIds}))];

    let creatorIds = [];
    let creators = [];
    postComments.filter(v => v !== null).forEach(postComment => {
      creatorIds.push(postComment.creatorId);
      if (postComment.creator) {
        creators.push(postComment.creator);
        delete postComment.creator;
      }
    });
    if (creators.length > 0) {
      ps.push(dispatch(cacheUsers({users: creators, userIds: creatorIds})));
    } else {
      ps.push(dispatch(cacheUserByIds({userIds: creatorIds})));
    }

    let postIds = [];
    let posts = [];
    postComments.filter(v => v !== null).forEach(postComment => {
      postIds.push(postComment.postId);
      if (postComment.post) {
        posts.push(postComment.post);
        delete postComment.post;
      }
    });
    if (posts.length > 0) {
      ps.push(dispatch(cachePosts({posts, postIds})));
    } else {
      ps.push(dispatch(cachePostByIds({postIds})));
    }

    return Promise.all(ps)
      .then(() => {
        let {object} = getState();
        return postComments.map(
          v => helpers.postCommentFromCache(object, v.id));
      });
  };
}

export function cachePostCommentByIds({postCommentIds, update = false}) {
  return (dispatch, getState) => {
    let {object} = getState();
    postCommentIds = Array.from(new Set(postCommentIds));
    if (!update) {
      postCommentIds = postCommentIds.filter(
        v => object.postComments[v] === undefined);
    }
    if (postCommentIds.length > 0) {
      return apis.postCommentInfos(postCommentIds)
        .then(response => {
          let {data: {comments: postComments}} = response;
          return dispatch(cachePostComments({postComments, postCommentIds}));
        });
    } else {
      return [];
    }
  };
}

export function cacheCourts({courts, courtIds}) {
  return (dispatch, getState) => {
    let ps = [dispatch(cacheObjects({courts, courtIds}))];

    let courtStatIds = [];
    let courtStats = [];
    courts.filter(v => v !== null).forEach(court => {
      courtStatIds.push(court.id);
      if (court.stat) {
        courtStats.push(court.stat);
        delete court.stat;
      }
    });
    if (courtStats.length > 0) {
      ps.push(dispatch(cacheCourtStats({courtStats})));
    } else {
      ps.push(dispatch(cacheCourtStatByIds({courtStatIds})));
    }

    return Promise.all(ps)
      .then(() => {
        let {object} = getState();
        return courts.map(v => helpers.courtFromCache(object, v.id));
      });
  };
}

export function cacheCourtByIds({courtIds, update = false}) {
  return (dispatch, getState) => {
    let {object} = getState();
    courtIds = Array.from(new Set(courtIds));
    if (!update) {
      courtIds = courtIds.filter(v => object.courts[v] === undefined);
    }
    if (courtIds.length > 0) {
      return apis.courtInfos(courtIds)
        .then(response => {
          let {data: {courts}} = response;
          return dispatch(cacheCourts({courts, courtIds}));
        });
    } else {
      return [];
    }
  };
}

export function cacheFiles({files, fileIds}) {
  return (dispatch, getState) => {
    let ps = [dispatch(cacheObjects({files, fileIds}))];

    let fileStatIds = [];
    let fileStats = [];
    files.filter(v => v !== null).forEach(file => {
      fileStatIds.push(file.id);
      if (file.stat) {
        fileStats.push(file.stat);
        delete file.stat;
      }
    });
    if (fileStats.length > 0) {
      ps.push(dispatch(cacheFileStats({fileStats})));
    } else {
      ps.push(dispatch(cacheFileStatByIds({fileStatIds})));
    }

    return Promise.all(ps)
      .then(() => {
        let {object} = getState();
        return files.map(v => helpers.fileFromCache(object, v.id));
      });
  };
}

export function cacheFileByIds({fileIds, update = false}) {
  return (dispatch, getState) => {
    let {object} = getState();
    fileIds = Array.from(new Set(fileIds));
    if (!update) {
      fileIds = fileIds.filter(v => object.files[v] === undefined);
    }
    if (fileIds.length > 0) {
      return apis.fileInfos(fileIds)
        .then(response => {
          let {data: {files}} = response;
          return dispatch(cacheFiles({files, fileIds}));
        });
    } else {
      return [];
    }
  };
}

export function cacheFileFavors({fileFavors}) {
  return (dispatch, getState) => {
    let ps = [];

    let userIds = [];
    let users = [];
    fileFavors.filter(v => v !== null).forEach(fileFavor => {
      userIds.push(fileFavor.userId);
      if (fileFavor.user) {
        users.push(fileFavor.user);
        delete fileFavor.user;
      }
    });
    if (users.length > 0) {
      ps.push(dispatch(cacheUsers({users, userIds})));
    } else {
      ps.push(dispatch(cacheUserByIds({userIds})));
    }

    let fileIds = [];
    let files = [];
    fileFavors.filter(v => v !== null).forEach(fileFavor => {
      fileIds.push(fileFavor.fileId);
      if (fileFavor.file) {
        files.push(fileFavor.file);
        delete fileFavor.file;
      }
    });
    if (files.length > 0) {
      ps.push(dispatch(cacheFiles({files, fileIds})));
    } else {
      ps.push(dispatch(cacheFileByIds({fileIds})));
    }

    let postIds = [];
    let posts = [];
    fileFavors.filter(v => v !== null && v.postId).forEach(fileFavor => {
      postIds.push(fileFavor.postId);
      if (fileFavor.post) {
        posts.push(fileFavor.post);
        delete fileFavor.post;
      }
    });
    if (posts.length > 0) {
      ps.push(dispatch(cachePosts({posts, postIds})));
    } else {
      ps.push(dispatch(cachePostByIds({postIds})));
    }

    return Promise.all(ps)
      .then(() => {
        let {object} = getState();
        return fileFavors.map(v => helpers.fileFavorFromCache(object, v));
      });
  };
}

export function cacheUserStats({userStats, userStatIds}) {
  return (dispatch, getState) => {
    let ps = [];

    ps.push(dispatch(cacheObjects({userStats, userStatIds})));

    return Promise.all(ps)
      .then(() => {
        let {object} = getState();
        return userStats.map(v => helpers.userStatFromCache(object, v.id));
      });
  };
}

export function cacheUserStatByIds({userStatIds, update = false}) {
  return (dispatch, getState) => {
    let {object} = getState();
    userStatIds = Array.from(new Set(userStatIds));
    if (!update) {
      userStatIds = userStatIds.filter(v => object.userStats[v] === undefined);
    }
    if (userStatIds.length > 0) {
      return apis.userStats(userStatIds)
        .then(response => {
          let {data: {stats: userStats}} = response;
          return dispatch(cacheUserStats({userStats}));
        });
    } else {
      return [];
    }
  };
}

export function cachePostStats({postStats, postStatIds}) {
  return (dispatch, getState) => {
    let ps = [];

    ps.push(dispatch(cacheObjects({postStats, postStatIds})));

    return Promise.all(ps)
      .then(() => {
        let {object} = getState();
        return postStats.map(v => helpers.postStatFromCache(object, v.id));
      });
  };
}

export function cachePostStatByIds({postStatIds, update = false}) {
  return (dispatch, getState) => {
    let {object} = getState();
    postStatIds = Array.from(new Set(postStatIds));
    if (!update) {
      postStatIds = postStatIds.filter(v => object.postStats[v] === undefined);
    }
    if (postStatIds.length > 0) {
      return apis.postStats(postStatIds)
        .then(response => {
          let {data: {stats: postStats}} = response;
          return dispatch(cachePostStats({postStats}));
        });
    } else {
      return [];
    }
  };
}

export function cacheCourtStats({courtStats, courtStatIds}) {
  return (dispatch, getState) => {
    let ps = [];

    ps.push(dispatch(cacheObjects({courtStats, courtStatIds})));

    return Promise.all(ps)
      .then(() => {
        let {object} = getState();
        return courtStats.map(v => helpers.courtStatFromCache(object, v.id));
      });
  };
}

export function cacheCourtStatByIds({courtStatIds, update = false}) {
  return (dispatch, getState) => {
    let {object} = getState();
    courtStatIds = Array.from(new Set(courtStatIds));
    if (!update) {
      courtStatIds = courtStatIds.filter(
        v => object.courtStats[v] === undefined);
    }
    if (courtStatIds.length > 0) {
      return apis.courtStats(courtStatIds)
        .then(response => {
          let {data: {stats: courtStats}} = response;
          return dispatch(cacheCourtStats({courtStats}));
        });
    } else {
      return [];
    }
  };
}

export function cacheFileStats({fileStats, fileStatIds}) {
  return (dispatch, getState) => {
    let ps = [];

    ps.push(dispatch(cacheObjects({fileStats, fileStatIds})));

    return Promise.all(ps)
      .then(() => {
        let {object} = getState();
        return fileStats.map(v => helpers.fileStatFromCache(object, v.id));
      });
  };
}

export function cacheFileStatByIds({fileStatIds, update = false}) {
  return (dispatch, getState) => {
    let {object} = getState();
    fileStatIds = Array.from(new Set(fileStatIds));
    if (!update) {
      fileStatIds = fileStatIds.filter(v => object.fileStats[v] === undefined);
    }
    if (fileStatIds.length > 0) {
      return apis.fileStats(fileStatIds)
        .then(response => {
          let {data: {stats: fileStats}} = response;
          return dispatch(cacheFileStats({fileStats}));
        });
    } else {
      return [];
    }
  };
}
