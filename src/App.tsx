import { useState } from 'react';
import styled from 'styled-components';
import './App.css';
import Colors from './assets/Colors';

// types
type Users = {
  avatar_url: string; //"https://avatars.githubusercontent.com/u/55601009?v=4"
  created_at: string; //"2019-09-20T18:52:58Z"
  email: string; //null
  followers: number; //9
  following: number; //8
  followers_url: string; //"https://api.github.com/users/maduraaa/followers"
  html_url: string; //"https://github.com/maduraaa"
  id: number; //55601009
  location: string; //"Tbilisi"
  name: string; //"Levan Madurashvili"
  login: string; //"maduraaa"
  public_repos: number; //10
  type: string; //"User"
};

// https://api.github.com/users/maduraaa/followers
const App: React.FC = () => {
  // 
  const [search, setSearch] = useState('');

  // searched data
  const [searchedData, setSearchedData] = useState<Users>();

  // searched data
  const [followers, setFollowers] = useState<any>();

  // search
  const EnterTrigger = (e: { charCode: any; keyCode: number }) => {
    if (e.charCode === 13) {
      fetch(`https://api.github.com/users/${search}`)
        .then((result) => result.json())
        .then((data) => {
          setSearchedData(data)
        })

      // get followers
      if (searchedData) {
        fetch(`https://api.github.com/users/${search}/followers`)
          .then((result) => result.json())
          .then((data) => {
            setFollowers(data)
          })
      }
    }
  };

  // request
  console.log(searchedData)
  console.log(followers)
  // 
  return (
    <Wrapper>
      <TextField
        id="search-input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyPress={EnterTrigger}
      />
      {searchedData ? (
        <AnswerContent>
          <a href={searchedData?.html_url} target="_blank">
            <ImgStyle src={searchedData?.avatar_url} alt={searchedData?.avatar_url} />
          </a>
          <Blocks>
            <span>Name</span>
            <span>{searchedData?.name}</span>
          </Blocks>

          <Blocks>
            <span>followers</span>
            <span>{searchedData?.followers}</span>
          </Blocks>

          <Blocks>
            <span>following</span>
            <span>{searchedData?.following}</span>
          </Blocks>
          {searchedData?.location ? (
            <Blocks>
              <span>location</span>
              <span>{searchedData?.location}</span>
            </Blocks>
          ) : null}
        </AnswerContent>
      ) : null}
    </Wrapper >
  );
}
// 
// 
// styles levan madurashvili
const Blocks = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-inline: 10px;
  width: 70%;
  margin-inline: auto;
`;
const ImgStyle = styled.img`
  border-radius: 50%;
  box-shadow: 0px 1px 12px 1px #ffffff78;
  -webkit-box-shadow: 0px 1px 12px 1px #ffffff78;
  -moz-box-shadow: 0px 1px 12px 1px #ffffff78;
  height: 70px;
  display: block;
  margin: 0 auto 20px auto;
`;
const AnswerContent = styled.div`
  margin-bottom: 20px;
  transition: all 300ms ease-in-out;
  box-shadow: 0px 1px 12px 1px #ffffff78;
  -webkit-box-shadow: 0px 1px 12px 1px #ffffff78;
  -moz-box-shadow: 0px 1px 12px 1px #ffffff78;
  color: #ffffff78;
  max-width: 500px;
  margin-inline: 20px;
  width: 100%;
  padding: 20px 10px;
  border-radius: 8px;
  font-size: 18px;
    /*  */
    &:first-of-type{
      margin-top: 30px;
    }
`;
const TextField = styled.input`
  max-width: 500px;
  margin-inline: 20px;
  width: 100%;
  height: 46px;
  border: 0px;
  outline: none;
  border-radius: 8px;
  font-size: 18px;
  padding: 5px 20px;
  background-color: transparent;
  box-shadow: 0px 1px 12px 1px #979da03a;
  -webkit-box-shadow: 0px 1px 12px 1px #979da03a;
  -moz-box-shadow: 0px 1px 12px 1px #979da03a;
  color: #ffffff39;
  text-align: center;
  transition: all 300ms ease-in-out;
    &:focus {
      transition: all 300ms ease-in-out;
      box-shadow: 0px 1px 12px 1px #ffffff78;
      -webkit-box-shadow: 0px 1px 12px 1px #ffffff78;
      -moz-box-shadow: 0px 1px 12px 1px #ffffff78;
      color: #ffffff78;
    }
`;
const Wrapper = styled.div`
  background-color: ${Colors.Primary};
  height: 100vh;
  color: ${Colors.white};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export default App;
