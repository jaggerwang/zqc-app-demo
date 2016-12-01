/**
 * 在球场
 * zaiqiuchang.com
 */

import logger from '../logger';
import * as apis from '../apis';
import * as actions from './';

export const RESET_OBJECT_CACHE = 'reset_object_cache';
export const CACHE_OBJECTS = 'cache_objects';

export function resetObjectCache() {
  return {
    type: RESET_OBJECT_CACHE,
  };
}

function cacheObjects({users, userIds, posts, postIds, courts, courtIds, 
  files, fileIds, userStats, postStats, courtStats}) {
  let aToO = (objects, objectIds) => {
    let o = objects.reduce((o, v) => {
      o[v.id] = v;
      return o;
    }, {});
    if (objectIds !== undefined) {
      objectIds.forEach((v) => {
        if (o[v] === undefined) {
          o[v] = null;
        }
      });
    }
    return o;
  }

  let action = {
    type: CACHE_OBJECTS,
  };
  if (users !== undefined) {
    action.users = aToO(users, userIds);
  }
  if (posts !== undefined) {
    action.posts = aToO(posts, postIds);
  }
  if (courts !== undefined) {
    action.courts = aToO(courts, courtIds);
  }
  if (files !== undefined) {
    action.files = aToO(files, fileIds);
  }
  if (userStats !== undefined) {
    action.userStats = userStats;
  }
  if (postStats !== undefined) {
    action.postStats = postStats;
  }
  if (courtStats !== undefined) {
    action.courtStats = courtStats;
  }

  return action;
}

function mergeCacheObjectsActions(actions) {
  return actions.reduce(
    (result, action) => {
      if (typeof result == 'object' && result.type == CACHE_OBJECTS 
        && typeof action == 'object' && action.type == CACHE_OBJECTS) {
        for (let [k, v] of Object.entries(action)) {
          if (k == 'type') {
            continue;
          }
          if (result[k] === undefined) {
            result[k] = {};
          }
          result[k] = Object.assign(result[k], v);
        }
      } else {
        result = action;
      }
      return result;
    },
    {
      type: CACHE_OBJECTS,
    }
  );
}

export function cacheUsers(object, users, userIds) {
  let ps = [cacheObjects({users, userIds})];

  let avatarIds = [];
  let avatarFiles = [];
  users.filter((v) => v !== null).forEach((user) => {
    if (user.avatarType == 'custom') {
      avatarIds.push(user.avatarId);
      if (user.avatarFile) {
        avatarFiles.push(user.avatarFile);
        delete user.avatarFile;
      }
    }
  })
  if (avatarFiles.length > 0) {
    ps.push(cacheFiles(avatarFiles, avatarIds));
  } else {
    ps.push(cacheFileByIds(object, avatarIds));
  }

  userIds = [];
  let stats = {};
  users.filter((v) => v !== null).forEach((user) => {
    userIds.push(user.id);
    if (user.stat) {
      stats[user.id] = user.stat;
      delete user.stat;
    }
  })
  if (Object.keys(stats).length > 0) {
    ps.push(cacheUserStats(stats));
  } else {
    ps.push(cacheUserStatByIds(object, userIds));
  }

  return Promise.all(ps).then((actions) => mergeCacheObjectsActions(actions));
}

export async function cacheUserByIds(object, userIds, update=false) {
  userIds = Array.from(new Set(userIds));
  if (!update) {
    userIds = userIds.filter((v) => object.users[v] === undefined);
  }
  if (userIds.length > 0) {
    let response;
    try {
      response = await apis.userInfos(userIds);
    } catch (error) {
      return actions.handleApiError(error);
    }
    let {data: {users}} = response;
    return cacheUsers(object, users, userIds);
  } else {
    return cacheUsers(object, []);
  }
}

export function cachePosts(object, posts, postIds) {
  let ps = [cacheObjects({posts, postIds})];

  let creatorIds = [];
  let creators = [];
  posts.filter((v) => v !== null).forEach((post) => {
    creatorIds.push(post.creatorId);
    if (post.creator) {
      creators.push(post.creator);
      delete post.creator;
    }
  })
  if (creators.length > 0) {
    ps.push(cacheUsers(object, creators, creatorIds));
  } else {
    ps.push(cacheUserByIds(object, creatorIds));
  }

  let courtIds = [];
  let courts = [];
  posts.filter((v) => v !== null).forEach((post) => {
    courtIds.push(post.courtId);
    if (post.court) {
      courts.push(post.court);
      delete post.court;
    }
  })
  if (courts.length > 0) {
    ps.push(cacheCourts(object, courts, courtIds));
  } else {
    ps.push(cacheCourtByIds(object, courtIds));
  }

  let imageIds = [];
  let imageFiles = [];
  posts.filter((v) => v !== null).forEach((post) => {
    imageIds = imageIds.concat(post.imageIds);
    if (post.imageFiles) {
      imageFiles = imageFiles.concat(post.imageFiles);
      delete post.imageFiles;
    }
  })
  if (imageFiles.length > 0) {
    ps.push(cacheFiles(imageFiles, imageIds));
  } else {
    ps.push(cacheFileByIds(object, imageIds));
  }

  postIds = [];
  let stats = [];
  posts.filter((v) => v !== null).forEach((post) => {
    postIds.push(post.id);
    if (post.stat) {
      stats[post.id] = post.stat;
      delete post.stat;
    }
  })
  if (Object.keys(stats).length > 0) {
    ps.push(cachePostStats(stats));
  } else {
    ps.push(cachePostStatByIds(object, postIds));
  }
  
  return Promise.all(ps).then((actions) => mergeCacheObjectsActions(actions));
}

export async function cachePostByIds(object, postIds, update=false) {
  postIds = Array.from(new Set(postIds));
  if (!update) {
    postIds = postIds.filter((v) => object.posts[v] === undefined);
  }
  if (postIds.length > 0) {
    let response;
    try {
      response = await apis.postInfos(postIds);
    } catch (error) {
      return actions.handleApiError(error);
    }
    let {data: {posts}} = response;
    return cachePosts(object, posts, postIds);
  } else {
    return cachePosts(object, []);
  }
}

export function cacheCourts(object, courts, courtIds) {
  let ps = [cacheObjects({courts, courtIds})];

  courtIds = [];
  let stats = [];
  courts.filter((v) => v !== null).forEach((court) => {
    courtIds.push(court.id);
    if (court.stat) {
      stats[court.id] = court.stat;
      delete court.stat;
    }
  })
  if (Object.keys(stats).length > 0) {
    ps.push(cacheCourtStats(stats));
  } else {
    ps.push(cacheCourtStatByIds(object, courtIds));
  }
  
  return Promise.all(ps).then((actions) => mergeCacheObjectsActions(actions));
}

export async function cacheCourtByIds(object, courtIds, update=false) {
  courtIds = Array.from(new Set(courtIds));
  if (!update) {
    courtIds = courtIds.filter((v) => object.courts[v] === undefined);
  }
  if (courtIds.length > 0) {
    let response;
    try {
      response = await apis.courtInfos(courtIds);
    } catch (error) {
      return actions.handleApiError(error);
    }
    let {data: {courts}} = response;
    return cacheCourts(object, courts, courtIds);
  } else {
    return cacheCourts(object, []);
  }
}

export function cacheFiles(files, fileIds) {
  return cacheObjects({files, fileIds});
}

export async function cacheFileByIds(object, fileIds, update=false) {
  fileIds = Array.from(new Set(fileIds));
  if (!update) {
    fileIds = fileIds.filter((v) => object.files[v] === undefined);
  }
  if (fileIds.length > 0) {
    let response;
    try {
      response = await apis.fileInfos(fileIds);
    } catch (error) {
      return actions.handleApiError(error);
    }
    let {data: {files}} = response;
    return cacheFiles(files, fileIds);
  } else {
    return cacheFiles([]);
  }
}

export function cacheUserStats(userStats) {
  return cacheObjects({userStats});
}

export async function cacheUserStatByIds(object, userIds, update=false) {
  userIds = Array.from(new Set(userIds));
  if (!update) {
    userIds = userIds.filter((v) => object.userStats[v] === undefined);
  }
  if (userIds.length > 0) {
    let response;
    try {
      response = await apis.userStats(userIds);
    } catch (error) {
      return actions.handleApiError(error);
    }
    let {data: {stats: userStats}} = response;
    return cacheUserStats(userStats);
  } else {
    return cacheUserStats({});
  }
}

export function cachePostStats(postStats) {
  return cacheObjects({postStats});
}

export async function cachePostStatByIds(object, postIds, update=false) {
  postIds = Array.from(new Set(postIds));
  if (!update) {
    postIds = postIds.filter((v) => object.postStats[v] === undefined);
  }
  if (postIds.length > 0) {
    let response;
    try {
      response = await apis.postStats(postIds);
    } catch (error) {
      return actions.handleApiError(error);
    }
    let {data: {stats: postStats}} = response;
    return cachePostStats(postStats);
  } else {
    return cachePostStats({});
  }
}

export function cacheCourtStats(courtStats) {
  return cacheObjects({courtStats});
}

export async function cacheCourtStatByIds(object, courtIds, update=false) {
  courtIds = Array.from(new Set(courtIds));
  if (!update) {
    courtIds = courtIds.filter((v) => object.courtStats[v] === undefined);
  }
  if (courtIds.length > 0) {
    let response;
    try {
      response = await apis.courtStats(courtIds);
    } catch (error) {
      return actions.handleApiError(error);
    }
    let {data: {stats: courtStats}} = response;
    return cacheCourtStats(courtStats);
  } else {
    return cacheCourtStats({});
  }
}
