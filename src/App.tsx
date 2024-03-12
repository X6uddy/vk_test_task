import { useEffect, FC, useContext } from 'react';
import { observer } from 'mobx-react-lite';

import GroupItem from './components/groupItem//GroupItem';
import { Context } from './index';
import { Group } from './models/Group';
import { HasFriends, Policy } from './models/FiltersOptions';

import logo from './resources/icons//logo.svg';
import './style.css';



const App: FC = () => {
  
  const {store} = useContext(Context);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await store.getAllGroups();
      } catch (e) {
        throw new Error('Error fetching')
      }
    }

    fetchData();
  }, [store]);

  return (
    <div>
      <header className="header">
        <img src={logo} alt="logoVk" />
        <h1 className="header__name">вконтакте</h1>
      </header>

      <main>
        <div className="container">
          <div className="filters">
            <div>
              <select 
                disabled={store.isLoading}
                id='privacy'
                name="groupsFilter" 
                className="groupsFilter"
                onChange={(e) => store.setPolicy(e.target.value as Policy)} >
                <option value="any">Любой</option>
                <option value="closed">Closed</option>
                <option value="open">Open</option>
              </select>
              <label htmlFor="privacy">Тип приватности</label>
            </div>

            <div>
              <select
                disabled={store.isLoading}
                id='avatarColor'
                className="groupsFilter"
                onChange={(e) => store.setAvatarColor(e.target.value)}
              >
                <option value="any">Любой</option>
                {store.avatarColors.map((item, i) => (
                  <option style={{color: item}} value={item} key={i}>{item}</option>
                ))}
              </select>
              <label htmlFor="avatarColor">Цвет аватарки</label>
            </div>

            <div>
              <select
                disabled={store.isLoading}
                id='hasFriends'
                className="groupsFilter"
                onChange={(e) =>
                  store.setHasFriends(e.target.value as HasFriends)
                }
              >
                <option value="any">Неважно</option>
                <option value="true">Есть друзья в группе</option>
                <option value="false">Нет друзей в группе</option>
              </select>
              <label htmlFor="hasFriends">Наличие друзей в группе</label>
            </div>
          </div>

          {/* <input
            type="checkbox"
            checked={store.filterOptions.hasFriends ? store.filterOptions.hasFriends : undefined}
            onChange={(e) => store.setHasFriends(e.target.checked)}
          /> Наличие друзей в группе */} 
          {/* Изначально я хотел сделать чтобы по чекбоксу определялось наличие друзей, но не совсем ясно должен ли чекбокс при checked=false 
          показывать только группы где нет друзей или должен показывать все группы(и с друзьями и без). поэтому я выбрал селект взамен чекбокса */}
          {store.isLoading ?  
            <h2>Loading data...</h2> 
            : 
            <>
              <p className='groups__title'>Количество групп: {store.filteredGroups.length}</p>
              <ul className="groups">
                {store.filteredGroups.length > 0 ? 
                  store.filteredGroups.map((item: Group) => ( <GroupItem group={item} key={item.id} />))
                  :
                  <p>Групп, удовлетворяющих таким фильтрам нет *_*</p>
                }
              </ul>
            </>
          }
        </div>
      </main>
    </div>
  );
};

export default observer(App)