import React from "react";
import {  generateTeams, GeneratorPlayer } from "../lib/team-generator";
import generator from '../../content/generator.json';
import SoccerLineUp from 'react-soccer-lineup';
import { getMatchLineUp } from "../lib/matches";
import { Player } from "../lib/players";

export default class TeamGenerator extends React.Component {

  showResults = false;
  blueTeamLineUp = {};
  redTeamLineUp = {};

  constructor(props) {
    super(props);
    this.state = { players: [], blueTeam: [], redTeam: []};
    this.handleClick = this.handleClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(event) {
    const target = event.target;
    const selectedPlayerId = parseInt(target.value);
    const selectedPlayer: GeneratorPlayer = generator.find((player) => player.id === selectedPlayerId);
    target.checked ? this.addPlayer(selectedPlayer) : this.removePlayer(selectedPlayer);
  }

  handleClick(event) {
    const { redTeam, blueTeam } = generateTeams(this.state.players);
    this.generateLineUpTeams(redTeam, blueTeam);
    this.setState({ redTeam, blueTeam});
    this.showResults = true;
  }

  generateLineUpTeams(redTeam: GeneratorPlayer[], blueTeam: GeneratorPlayer[]){
    const redTeamPlayers = redTeam.map((player) => {
      return {
        name: player.name,
        number: 0
      } as Player
    });
    const blueTeamPlayers = blueTeam.map((player) => {
      return {
        name: player.name,
        number: 0
      } as Player
    });
    this.blueTeamLineUp = {
      color: "lightblue",
      squad: getMatchLineUp(blueTeamPlayers)
    };
    this.redTeamLineUp = {
      color: "red",
      squad: getMatchLineUp(redTeamPlayers)
    };
  }

  addPlayer(selectedPlayer: GeneratorPlayer) {
    this.setState({ players: [...this.state.players, selectedPlayer]});
  }

  removePlayer(selectedPlayer: GeneratorPlayer) {
    let players: GeneratorPlayer[] = this.state.players;
    players = players.filter((player) => player.id !== selectedPlayer.id);
    this.setState({ players });
  }

  render() {
    return (
      <div className={"container"}>
        <div className={"headerContainer"}>
         <h2> Generador de quipos </h2>
        </div>
        <div className={"players"}>
            {generator.map((it, i) => (
              <div key={i}>
              <input className={"player"} name={it.id.toString()} value={it.id} type="checkbox" onChange={this.handleInputChange} />
              <h5>{it.name}</h5>
              </div>
            ))}
        </div>
        {this.state.players?.length >= 6 ? <button className={"button"} onClick={this.handleClick}>Generar equipos! </button> : null}
        { this.showResults ?
          <div className={"result"}>
            <SoccerLineUp
            size={ "responsive" }
            color={ "lightseagreen" }
            pattern={"squares"}
            homeTeam={this.redTeamLineUp}
            awayTeam={this.blueTeamLineUp}
          />
          </div>
          : null
        }
          <style jsx>{`
          .container {
            display: flex;
            flex-direction: column;
            margin: 0 auto;
            max-width: 1200px;
            width: 100%;
            padding: 0 1.5rem;
          }
          .headerContainer{
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 1.5rem;
            padding-bottom: 2rem;
          }
          .players {
            width: 100%;
            display: flex;
            flex-flow: row wrap;
            justify-content: space-between;
            align-items: center;
            align-content: space-between;
            gap: 2rem;
          }
          .player {
            width: 1.5rem;
            height: 1.5rem;
          }
          .result{
            padding: 2rem;
          }
          .button {
            background-color: white;
            color: black;
            border: 2px solid #3346FF;
            padding: 16px 32px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            margin: 4px 2px;
            transition-duration: 0.4s;
            cursor: pointer;
            transition-duration: 0.4s;
          }
          .button:hover {
            background-color: #3346FF;
            color: white;
          }
          `}</style>
        </div>
    );
  }

}
