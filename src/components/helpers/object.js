/**
 * 在球场
 * zaiqiuchang.com
 */

export function userFromCache(object, userId) {
  let user = object.users[userId];
  if (!user) {
    console.warn(`user ${userId} not in cache`);
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
    console.warn(`post ${postId} not in cache`);
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
    .map((v) => fileFromCache(object, v))
    .filter((v) => v !== null);
  let stat = postStatFromCache(object, post.id);
  if (!stat) {
    return null;
  }
  return Object.assign({}, post, {creator, court, imageFiles, stat});
}

export function courtFromCache(object, courtId) {
  let court = object.courts[courtId];
  if (!court) {
    console.warn(`court ${courtId} not in cache`);
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
    console.warn(`file ${fileId} not in cache`);
    return null;
  }
  return file;
}

export function userStatFromCache(object, userId) {
  let userStat = object.userStats[userId];
  if (!userStat) {
    console.warn(`userStat ${userId} not in cache`);
    return null;
  }
  return userStat;
}

export function postStatFromCache(object, postId) {
  let postStat = object.postStats[postId];
  if (!postStat) {
    console.warn(`postStat ${postId} not in cache`);
    return null;
  }
  return postStat;
}

export function courtStatFromCache(object, courtId) {
  let courtStat = object.courtStats[courtId];
  if (!courtStat) {
    console.warn(`courtStat ${courtId} not in cache`);
    return null;
  }
  return courtStat;
}
