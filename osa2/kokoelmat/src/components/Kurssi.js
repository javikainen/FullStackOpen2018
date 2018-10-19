import React from 'react'

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

export default Kurssi
