import { Group } from "../Group";

export interface GetGroupsResponse {
    result: 1 | 0,
    data?: Group[]
}