import React, { useEffect, useState } from 'react';
import { User } from '../../../features/types';
import userService from '../../../services/userService';
import UserInfo from './UserInfo';
import UserData from './UserData';

const PeoplePage = () => {
    const [people, setPeople] = useState<User[]>([]);
    useEffect(() => {
        const getPeople = async () => {
            try {
                const people = await userService.getAll();
                setPeople(people);
            } catch (e) {
                console.log(e);
            }
        };
        getPeople();
    }, []);
    return (
        <section className="people">
            <h4 className="h4-subtitle">POPULAR PEOPLE</h4>
            <div className="grid-container">
                <article>
                    <p>NAME</p>
                    <p>WATCHED</p>
                    <p>FOLLOWING</p>
                    <p>FOLLOWERS</p>
                </article>
                {people.length
                    ? people.map((user) => (
                          <article key={user._id}>
                              <UserInfo user={user} />
                              <UserData classname="watched" amount={user.watched_movies.length} />
                              <UserData
                                  classname="following"
                                  amount={user.following?.length || 0}
                              />
                              <UserData
                                  classname="followers"
                                  amount={user.followers?.length || 0}
                              />
                          </article>
                      ))
                    : ''}
            </div>
        </section>
    );
};

export default PeoplePage;
