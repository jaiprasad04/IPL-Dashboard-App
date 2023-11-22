// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

import './index.css'

class TeamMatches extends Component {
  state = {matchesData: [], isLoading: true}

  componentDidMount() {
    this.getTeamDataInfo()
  }

  getTeamDataInfo = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()

    const updatedData = {
      teamBannerUrl: data.team_banner_url,
      latestMatchDetails: {
        id: data.latest_match_details.id,
        competingTeam: data.latest_match_details.competing_team,
        competingTeamLogo: data.latest_match_details.competing_team_logo,
        date: data.latest_match_details.date,
        firstInnings: data.latest_match_details.first_innings,
        manOfTheMatch: data.latest_match_details.man_of_the_match,
        matchStatus: data.latest_match_details.match_status,
        result: data.latest_match_details.result,
        secondInnings: data.latest_match_details.second_innings,
        umpires: data.latest_match_details.umpires,
        venue: data.latest_match_details.venue,
      },
      recentMatches: data.recent_matches.map(recentMatch => ({
        umpires: recentMatch.umpires,
        result: recentMatch.result,
        manOfTheMatch: recentMatch.man_of_the_match,
        id: recentMatch.id,
        date: recentMatch.date,
        venue: recentMatch.venue,
        competingTeam: recentMatch.competing_team,
        competingTeamLogo: recentMatch.competing_team_logo,
        firstInnings: recentMatch.first_innings,
        secondInnings: recentMatch.second_innings,
        matchStatus: recentMatch.match_status,
      })),
    }

    this.setState({matchesData: updatedData, isLoading: false})
  }

  getRouteClassName = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    switch (id) {
      case 'RCB':
        return 'rcb'
      case 'KKR':
        return 'kkr'
      case 'KXP':
        return 'kxp'
      case 'CSK':
        return 'csk'
      case 'RR':
        return 'rr'
      case 'MI':
        return 'mi'
      case 'SH':
        return 'srh'
      case 'DC':
        return 'dc'
      default:
        return ''
    }
  }

  render() {
    const {matchesData, isLoading} = this.state
    const {teamBannerUrl, latestMatchDetails, recentMatches} = matchesData

    return (
      <div className={`team-match-container ${this.getRouteClassName()}`}>
        {isLoading ? (
          <div testid="loader">
            <Loader type="Oval" color="#ffffff" height={50} width={50} />
          </div>
        ) : (
          <div className="responsive-container">
            <img
              src={teamBannerUrl}
              alt="team banner"
              className="team-banner"
            />
            <LatestMatch latestMatchDetails={latestMatchDetails} />
            <ul className="recent-matches-list">
              {recentMatches.map(recentMatch => (
                <MatchCard key={recentMatch.id} matchDetails={recentMatch} />
              ))}
            </ul>
          </div>
        )}
      </div>
    )
  }
}

export default TeamMatches
