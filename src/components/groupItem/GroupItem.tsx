import { FC, useContext, useState } from "react";
import { Group } from "../../models/Group";
import { Context } from "../../index";
import FriendList from "../friendList/FriendList";
import { observer } from 'mobx-react-lite';
interface GroupItemProps {
  group: Group;
}
  
const GroupItem: FC<GroupItemProps> = ({group}) => {
  const {store} = useContext(Context);
  return (
  <li className="groups__item" key={group.id}>
    <div className="groups__item-avatar">
      <div className="avatar" style={{backgroundColor: `${group.avatar_color ? group.avatar_color : '#fff'}` }} >
        {group.avatar_color ? null : <span>not found</span>}
      </div>
    </div>

    <div className="groups__item-info">
      <p className="item__name">{group.name}</p>
      <p className="item__closed">{group.closed ? 'Закрытая группа' : 'Открытая группа'}</p>
      <p className="item__members">{group.members_count} подписчиков</p>
      <p className="item__friends">Друзей в группе:{group.friends ? group.friends.length : 0 }</p>

      {group.friends && group.friends.length > 0 && (
        <>
          <button onClick={() => store.setFriends(group.id, group.friends)} className="btn">Показать друзей</button>
          {store.selectedFriends && store.selectedGroup === group.id && <FriendList friends={group.friends}/>}
        </>
      )}
      
    </div>
  </li>
)};

export default observer(GroupItem);