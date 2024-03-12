import axios from "axios";

import { GetGroupsResponse } from "../models/response/GetGroupsResponse ";
import { Group } from "../models/Group";


const fetchGroups = async (): Promise<GetGroupsResponse> => {
  try {
    const res = await axios.get<Group[]>('http://localhost:3001/groups');
    return { result: 1, data: res.data };
  } catch (e) {
    console.error('Error:', e);
    return { result: 0 };
  }
};

export default fetchGroups;