import { FC } from "react";

import { User } from "../../models/User";

interface FriendListProps {
  friends: User[];
}
  // хочу сказать, что если бы я знал что данных будет намного больше, то я бы делал отдельный запрос на список друзей.
  // но я подумал и решил, что не буду делать лишнего (просто хочу чтобы вы знали какой у меня ход мыслей)  
  // А вообще я бы простенький бек написал, но в ТЗ написано что данные замокать с groups.json, поэтому бек писать не стал
  const FriendList: FC<FriendListProps> = ({ friends }) => (
    <div className="friends" style={{width: '250px'}}>
      <p>Друзья в сообществе: </p>
      <ul style={{listStyleType: 'none', padding: '0', width: '100%'}}>
        {friends.map((friend: User, i) => (
          <li key={`${friend.first_name}-${friend.last_name}`}>
              <span className="friends__fullname">{`${i+1}) ${friend.first_name} ${friend.last_name}`}</span>
          </li>
        ))}
      </ul>
    </div>
  );
  
  export default FriendList;