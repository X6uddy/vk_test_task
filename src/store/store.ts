import {makeAutoObservable} from "mobx";

import { User } from "../models/User";
import { Group } from "../models/Group";
import fetchGroups from "../services/FetchData";
import FilterOptions, { AvatarColor, HasFriends, Policy } from "../models/FiltersOptions";

export default class Store {
    groups = [] as Group[]
    filteredGroups = [] as Group[] | [];
    isLoading = true;
    selectedGroup = 0 as number;
    selectedFriends = [] as User[];
    filterOptions : FilterOptions= {
        policy: 'any',
        avatarColor: 'any',
        hasFriends: 'any'
    };
    avatarColors = [] as (string | undefined)[];

    constructor() {
        makeAutoObservable(this);
    };

    setGroups(groups: Group[]) {
        this.groups = groups;
        this.filteredGroups = this.filteredGroups.length > 0 ? this.filteredGroups : groups
        this.avatarColors = [...new Set(groups.map(group => group.avatar_color))].filter(color => color !== undefined)
    };
    setLoading(bool: boolean) {
        this.isLoading = bool;
    };
    setFriends(groupId: number, friends: User[]) {
        this.selectedGroup = groupId;
        this.selectedFriends = friends;
    };
    setPolicy(policy: Policy) {
        this.filterOptions.policy = policy;
        this.setFilteredByOptions();
    };
    setAvatarColor(color: AvatarColor){
        this.filterOptions.avatarColor = color;
        this.setFilteredByOptions();
    }
    setHasFriends(hasFriend: HasFriends){
        this.filterOptions.hasFriends = hasFriend;
        this.setFilteredByOptions();
    }


    setFilteredByOptions() {
        let changePrivacy: boolean;
        changePrivacy = this.filterOptions.policy === 'open' ? false : true;
        this.filteredGroups = this.groups;
        if(this.filterOptions.policy !== 'any') {
            this.filteredGroups = this.filteredGroups.filter((item) => item.closed === changePrivacy);
        }
        if(this.filterOptions.avatarColor !== 'any') {
            this.filteredGroups = this.filteredGroups.filter((item) => item.avatar_color === this.filterOptions.avatarColor);
        }
        if(this.filterOptions.hasFriends !== 'any') {
            if (this.filterOptions.hasFriends === 'true') {
                this.filteredGroups = this.filteredGroups.filter(item => item.friends);
            } else this.filteredGroups = this.filteredGroups.filter(item => !item.friends);
        }
    }



    async getAllGroups() {
        this.setLoading(true)
        try {
            const res = await fetchGroups();
            if(res.result === 1 && res.data !== undefined) {
                this.setGroups(res.data)
            }
            return {result: 1, data: res.data}
        } catch (e) {
            console.log(e);
        } finally {
            this.setLoading(false);
        }
    }
}