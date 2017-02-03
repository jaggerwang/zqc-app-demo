/**
 * 在球场
 * zaiqiuchang.com
 */

export function userFromCache(object, userId) {
  let user = object.users[userId];
  if (!user) {
    console.debug(`user ${userId} not in cache`);
    return null;
  }
  let avatarFile = null;
  if (user.avatarType == 'custom') {
    avatarFile = fileFromCache(object, user.avatarId);
    if (!avatarFile) {
      return null;
    }
  }
  let stat = userStatFromCache(object, user.id);
  if (!stat) {
    return null;
  }
  return Object.assign({}, user, {avatarFile, stat});
}

export function postFromCache(object, postId) {
  let post = object.posts[postId];
  if (!post) {
    console.debug(`post ${postId} not in cache`);
    return null;
  }
  let creator = userFromCache(object, post.creatorId);
  if (!creator) {
    return null;
  }
  let court = courtFromCache(object, post.courtId);
  if (!court) {
    return null;
  }
  let imageFiles = post.imageIds
    .map(v => fileFromCache(object, v))
    .filter(v => v);
  let stat = postStatFromCache(object, post.id);
  if (!stat) {
    return null;
  }
  return Object.assign({}, post, {creator, court, imageFiles, stat});
}

export function postLikeFromCache(object, postLike) {
  let user = userFromCache(object, postLike.userId);
  if (!user) {
    return null;
  }
  let post = postFromCache(object, postLike.postId);
  if (!post) {
    return null;
  }
  return Object.assign({}, postLike, {user, post});
}

export function postCommentFromCache(object, postCommentId) {
  let postComment = object.postComments[postCommentId];
  if (!postComment) {
    console.debug(`postComment ${postCommentId} not in cache`);
    return null;
  }
  let creator = userFromCache(object, postComment.creatorId);
  if (!creator) {
    return null;
  }
  let post = postFromCache(object, postComment.postId);
  if (!post) {
    return null;
  }
  return Object.assign({}, postComment, {creator, post});
}

export function courtFromCache(object, courtId) {
  let court = object.courts[courtId];
  if (!court) {
    console.debug(`court ${courtId} not in cache`);
    return null;
  }
  let stat = courtStatFromCache(object, court.id);
  if (!stat) {
    return null;
  }
  return Object.assign({}, court, {stat});
}

export function fileFromCache(object, fileId) {
  let file = object.files[fileId];
  if (!file) {
    console.debug(`file ${fileId} not in cache`);
    return null;
  }
  let stat = fileStatFromCache(object, file.id);
  if (!stat) {
    return null;
  }
  return Object.assign({}, file, {stat});
}

export function fileFavorFromCache(object, fileFavor) {
  let user = userFromCache(object, fileFavor.userId);
  if (!user) {
    return null;
  }
  let file = fileFromCache(object, fileFavor.fileId);
  if (!file) {
    return null;
  }
  let post = null;
  if (fileFavor.postId) {
    post = postFromCache(object, fileFavor.postId);
    if (!post) {
      return null;
    }
  }
  return Object.assign({}, fileFavor, {user, file, post});
}

export function userStatFromCache(object, userId) {
  let userStat = object.userStats[userId];
  if (!userStat) {
    console.debug(`userStat ${userId} not in cache`);
    return null;
  }
  return userStat;
}

export function postStatFromCache(object, postId) {
  let postStat = object.postStats[postId];
  if (!postStat) {
    console.debug(`postStat ${postId} not in cache`);
    return null;
  }
  return postStat;
}

export function courtStatFromCache(object, courtId) {
  let courtStat = object.courtStats[courtId];
  if (!courtStat) {
    console.debug(`courtStat ${courtId} not in cache`);
    return null;
  }
  return courtStat;
}

export function fileStatFromCache(object, fileId) {
  let fileStat = object.fileStats[fileId];
  if (!fileStat) {
    console.debug(`fileStat ${fileId} not in cache`);
    return null;
  }
  return fileStat;
}
