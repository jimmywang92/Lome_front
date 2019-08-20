// @flow
import * as _ from "lodash";

const data = require("./data");

export type Picture = {
    uri: string,
    preview: string
};

export type Profile = {
    picture: Picture,
    name: string,
    outline: string
};

export type Post = {
    uid: string,
    id: string,
    likes: string[],
    comments: number,
    timestamp: number,
    text: string,
    picture: Picture
};

export type Comment = {
    id: string,
    text: string,
    uid: string,
    timestamp: number
};

export default class APIStore {

    static me(): string {
        return "09003f2b-a0f5-4b6a-b66a-d3446df71728";
    }

    static profile(uid: string): Profile {
        return data.users[uid];
    }

    static posts(): Post[] {
        return _.sortBy(data.posts, ["timestamp"]).reverse();
    }

    static addPost(post: Post) {
        data.posts.push(post);
    }

    static post(id: string): Post {
        return data.posts.filter(post => post.id === id)[0];
    }

    static comments(post: string): Comment[] {
        if (!data.comments[post]) {
            data.comments[post] = [];
        }
        return _.sortBy(data.comments[post], ["timestamp"]).reverse();
    }

    static like(id: string, uid: string): string[] {
        const post = APIStore.post(id);
        const idx = post.likes.indexOf(uid);
        if (idx === -1) {
            post.likes.push(uid);
        } else {
            post.likes.splice(idx, 1);
        }
        return post.likes;
    }

    static addComment(post: string, comment: Comment) {
        if (!data.comments[post]) {
            data.comments[post] = [];
        }
        APIStore.post(post).comments = APIStore.post(post).comments + 1;
        data.comments[post].push(comment);
    }
}
