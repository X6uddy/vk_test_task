import { useState, useEffect, FC, useContext } from 'react';
import { observer } from 'mobx-react-lite';

import GroupItem from './components/groupItem//GroupItem';
import { Context } from './index';
import fetchGroups from './services/FetchData';
import { User } from './models/User';

import './style.css';
import { Group } from './models/Group';



const App: FC = () => {
  
  const {store} = useContext(Context);

  useEffect(() => {
    const fetchData = async () => {
      const res = await store.getAllGroups();
        if (res?.result === 1 && res?.data !== undefined) {
          store.setGroups(res.data)
        }
    }

    fetchData();
  }, []);


  // const applyFilters = () => {
  //   let filtered = state.groups;

  //   if (state.filterOptions.privacy !== 'all') {
  //     filtered = filtered.filter((group) =>
  //       state.filterOptions.privacy === 'closed' ? group.closed : !group.closed
  //     );
  //   }

  //   if (state.filterOptions.avatarColor !== 'any') {
  //     filtered = filtered.filter((group) =>
  //       group.avatar_color === state.filterOptions.avatarColor
  //     );
  //   }

  //   if (state.filterOptions.hasFriends) {
  //     filtered = filtered.filter((group) => group.friends && group.friends.length > 0);
  //   }

  //   setState((prevState) => ({ ...prevState, filteredGroups: filtered }));
  // };

  // const handleFilterChange = (key: keyof AppState['filterOptions'], value: any) => {
  //   setState((prevState) => ({
  //     ...prevState,
  //     filterOptions: { ...prevState.filterOptions, [key]: value },
  //   }));
  // };

  return (
    <div>
      {/* <div>
        <label>Privacy:</label>
        <select
          value={state.filterOptions.privacy}
          onChange={(e) => handleFilterChange('privacy', e.target.value as 'all' | 'closed' | 'open')}
        >
          <option value="all">All</option>
          <option value="closed">Closed</option>
          <option value="open">Open</option>
        </select>
      </div>

      <div>
        <label>Avatar Color:</label>
        <select
          value={state.filterOptions.avatarColor}
          onChange={(e) =>
            handleFilterChange('avatarColor', e.target.value as 'any' | string)
          }
        >
          <option value="any">Any</option>
        </select>
      </div>

      <div>
        <label>Has Friends:</label>
        <input
          type="checkbox"
          checked={state.filterOptions.hasFriends}
          onChange={(e) => handleFilterChange('hasFriends', e.target.checked)}
        />
      </div> */}

      <>
        <header className="header">
          {/* <p className="header__name">вконтакте</p> */}
        </header>

        <main>
          <div className="container">
            <select 
              name="groupsFilter" 
              id="groupsFilter"
              onChange={(e) => store.setFilteredByPrivacy(e.target.value as 'any' | 'closed' | 'open')} >
              <option value="any">Все сообщества</option>
              <option value="closed">Closed</option>
              <option value="open">Open</option>
            </select>

            <select
              onChange={(e) =>
                store.setFilteredByColor(e.target.value as 'any' | 'red')
              }
            >
              <option value="any">Any</option>
              <option value="red">Red</option>
            </select>
            
            <ul className="groups">
              {store.filteredGroups.length > 0 ? 
                store.filteredGroups.map((item: Group) => ( <GroupItem group={item} key={item.id} />))
                :
                store.groups.map((item: Group) => ( <GroupItem group={item} key={item.id} />))
              }
            </ul>
          </div>
        </main>
      </>
    </div>
  );
};

export default observer(App)