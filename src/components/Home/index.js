// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import TeamCard from '../TeamCard'

import './index.css'

class Home extends Component {
  state = {teamCardList: [], isLoading: true}

  componentDidMount() {
    this.getTeamcardList()
  }

  getTeamcardList = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const fetchdata = await response.json()

    const updatedDataList = fetchdata.teams.map(eachTeam => ({
      id: eachTeam.id,
      name: eachTeam.name,
      teamImageUrl: eachTeam.team_image_url,
    }))

    this.setState({teamCardList: updatedDataList, isLoading: false})
  }

  render() {
    const {teamCardList, isLoading} = this.state

    return (
      <div className="app-container">
        <div className="ipl-container">
          <div className="header-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
              alt="ipl logo"
              className="ipl-logo"
            />
            <h1 className="heading">IPL Dashboard</h1>
          </div>
          {isLoading ? (
            <div className="loader-container" testid="loader">
              <Loader type="Oval" color="#ffffff" height={50} />
            </div>
          ) : (
            <ul className="team-list-container">
              {teamCardList.map(eachTeam => (
                <TeamCard key={eachTeam.id} teamDetails={eachTeam} />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default Home
