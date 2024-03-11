import {makeAutoObservable} from "mobx";
import { User } from "../models/User";
import { Group } from "../models/Group";
import fetchGroups from "../services/FetchData";
import FilterOptions, { AvatarColor, HasFriends, Policy } from "../models/FiltersOptions";

export default class Store {
    groups = [] as Group[]
    filteredGroups = [] as Group[];
    isLoading = false;
    selectedGroup = 0 as number;
    selectedFriends = [] as User[];
    filterOptions : FilterOptions= {
        policy: 'any',
        avatarColor: 'any',
        hasFriends: null
    };

    constructor() {
        makeAutoObservable(this);
    };

    setGroups(groups: Group[]) {
        this.groups = groups;
        if (this.filterOptions.avatarColor === 'any' && this.filterOptions.policy === 'any' && this.filterOptions.hasFriends === null) {
            this.filteredGroups = groups;
        }
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
        if(this.filterOptions.policy !== 'any') {
            this.filteredGroups = this.filteredGroups.filter((item) => item.closed === changePrivacy)
        }
        if(this.filterOptions.avatarColor !== 'any') {
            this.filteredGroups = this.filteredGroups.filter((item) => item.closed === changePrivacy)
        }
        if(this.filterOptions.hasFriends !== null) {
            this.filteredGroups = this.filteredGroups.filter((item) => item.friends.length > 0)
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