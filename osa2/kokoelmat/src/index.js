import React from 'react'
import ReactDOM from 'react-dom'

const Osa = (props) => <p>{props.osa} {props.tehtavia}</p>

const Otsikko = (props) => <h1>{props.kurssi.nimi}</h1>

const Sisalto = (props) => {
  const osat = props.kurssi.osat
  return(
    <div>
      {osat.map(osa => <Osa key={osa.id} osa={osa.nimi} tehtavia={osa.tehtavia} />)}
    </div>
  )
}

const Yhteensa = (props) => {
  const osat = props.kurssi.osat
  const reducer = (accumulator, currentValue) => accumulator + currentValue.tehtavia

  return(
    <p>yhteensä {osat.reduce(reducer, 0)} tehtävää</p>
  )
}

const Kurssi = ({ kurssi }) => {
    return (
      <div>
        <Otsikko kurssi={kurssi} />
        <Sisalto kurssi={kurssi} />
        <Yhteensa kurssi={kurssi} />
      </div>
    )
}

const App = () => {
  const kurssit = [
    {
      nimi: 'Half Stack -sovelluskehitys',
      id: 1,
      osat: [
        {
          nimi: 'Reactin perusteet',
          tehtavia: 10,
          id: 1
        },
        {
          nimi: 'Tiedonvälitys propseilla',
          tehtavia: 7,
          id: 2
        },
        {
          nimi: 'Komponenttien tila',
          tehtavia: 14,
          id: 3
        }
      ]
    },
    {
      nimi: 'Node.js',
      id: 2,
      osat: [
        {
          nimi: 'Routing',
          tehtavia: 3,
          id: 1
        },
        {
          nimi: 'Middlewaret',
          tehtavia: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Opetusohjelma</h1>
      {kurssit.map(kurssi => <Kurssi key={kurssi.id} kurssi={kurssi} />)}
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
