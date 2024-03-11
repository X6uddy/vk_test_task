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
    };
    setAvatarColor(color: AvatarColor){
        this.filterOptions.avatarColor = color;
    }
    setHasFriends(hasFriend: HasFriends){
        this.filterOptions.hasFriends = hasFriend;
    }


    setFilteredByOptions(privacy: 'any' | 'closed' | 'open') {
        let changePrivacy: boolean;
        changePrivacy = privacy === 'open' ? false : true;
        if(privacy === 'any') {
            this.filteredGroups = this.groups;
        } else {
            changePrivacy = privacy === 'open' ? false : true;

            this.filteredGroups = this.filteredGroups.length > 0 ? 
                this.filteredGroups.filter((item) => item.closed === changePrivacy)
                :
                this.groups.filter((item) => item.closed === changePrivacy)
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