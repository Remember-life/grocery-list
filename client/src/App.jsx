import React, {useState} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import '../../style.css';
import Main from './Main.jsx';
import Receipt from './Receipt.jsx';
import Results from './Results.jsx';
import Setting from './Setting.jsx';
import ManualOrReceipt from './ManualOrReceipt.jsx';

function App () {

  const [currOption, setCurrOption] = useState('manual');

  const [recomm, setRecomm] = useState('');
  const [list, setList] = useState('');

  const handleDarkMode = () => {
    document.body.classList.toggle('dark-theme');
  }

  const handleRadioOption = (input) => {
    setCurrOption(currOption => input)
  }

  const handleList = (data) => {
    setList(data);
  }

  const handleRecommended = (data) => {
    setRecomm(data);
  }


  return (
    <div id="main">
      <button type="button" className="light-or-dark" onClick={() => handleDarkMode()}>Dark Mode</button>
      <ManualOrReceipt
        current={currOption}
        handleOption={handleRadioOption}
      />
      <h1 style={header}>Grocery List</h1>
      <div style={carrot}>🥕🥬🍓</div>
      <Switch>
        <Route exact path="/"><Main handleList={handleList} handleRecommended={handleRecommended} /></Route>
        <Route path="/receipt"><Receipt /></Route>
        <Route path="/results"><Results user={recomm} cart={list}/></Route>
      </Switch>
    </div>
  )

}

const header = {
  flex: "95%",
  display: "inline-block",
  paddingLeft: "260px",
  fontSize: "180%",
}

const carrot = {
  flex: "5%",
  display: "inline-block",
}



/////
const form = {
  fontFamily: 'Comic Sans MS',
  display: 'inline-block',
  marginLeft: "50px",
  paddingTop: "70px",
}

const resultsContainer = {
  width: '70%',
  marginLeft: "260px",
  marginTop: '30px',
  paddingBottom: '30px',
}

const fragment = {
  display: 'flex',
  flexDirection: 'row',
  marginBottom: '10px',
  fontSize: '13px',
}

const buttonsContainer = {
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  marginTop: '10px',
}


export default App;