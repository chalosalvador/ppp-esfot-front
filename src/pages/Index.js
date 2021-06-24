import React from 'react'
import { Col, Row } from 'antd'
import { Carousel } from 'antd'
import ESFOT1 from '../images/ESFOT1.jpg'
import ESFOT2 from '../images/ESFOT2.jpg'
import ESFOT3 from '../images/ESFOT3.jpg'
import ESFOT4 from '../images/ESFOT4.jpg'
import ESFOTCards from '../components/ESFOTCards'
const Anuncio1 = require('../images/Anuncio1.jpg')
const Anuncio2 = require('../images/Anuncio2.jpg')
const Anuncio3 = require('../images/Anuncio3.jpg')

const HomePage = () => {
  return (
    <>
      <div>
        <Carousel effect="fade" autoplay={true}>
          <div>
            <img className="AnuncioDefault" alt="Anuncio" src={Anuncio1} />
          </div>
          <div>
            <img className="AnuncioDefault" alt="Anuncio" src={Anuncio2} />
          </div>
          <div>
            <img className="AnuncioDefault" alt="Anuncio" src={Anuncio3} />
          </div>
        </Carousel>
        <Row>
          <Col className="textDefault" span={24}>
            <h1>ESCUELA POLITECNICA NACIONAL - ESFOT</h1>
          </Col>
          <Col className="textDefault" span={9} offset={3}>
            <p className="TitleDefault">ESFOT</p>
            <p>
              Las funciones o desempeños de la profesión que se espera que los
              graduados de la carrera de Tecnología Superior en Agua y
              Saneamiento Ambiental alcancen dentro de los 3 a 5 años
              posteriores a su graduación son: Apoyar en servicios de
              consultoría para el desarrollo de proyectos de tecnologías en agua
              y saneamiento ambiental, orientados a la gestión, planeación,
              análisis, diseño, implementación, operación y mantenimiento de
              sistemas. Participar en obras de abastecimiento de agua y
              saneamiento ambiental, garantizando aspectos de seguridad, calidad
              y conservación del ambiente
            </p>
          </Col>
          <Col className="textDefault" span={9}>
            <p className="TitleDefault">EPN</p>
            <p>
              Las funciones o desempeños de la profesión que se espera que los
              graduados de la carrera de Tecnología Superior en Agua y
              Saneamiento Ambiental alcancen dentro de los 3 a 5 años
              posteriores a su graduación son: Apoyar en servicios de
              consultoría para el desarrollo de proyectos de tecnologías en agua
              y saneamiento ambiental, orientados a la gestión, planeación,
              análisis, diseño, implementación, operación y mantenimiento de
              sistemas. Participar en obras de abastecimiento de agua y
              saneamiento ambiental, garantizando aspectos de seguridad, calidad
              y conservación del ambiente
            </p>
          </Col>
        </Row>
        <Row>
          <Col className="textDefault" span={18} offset={3}>
            <p className="TitleDefault">NOSOTROS</p>
            <p>
              Las funciones o desempeños de la profesión que se espera que los
              graduados de la carrera de Tecnología Superior en Agua y
              Saneamiento Ambiental alcancen dentro de los 3 a 5 años
              posteriores a su graduación son: Apoyar en servicios de
              consultoría para el desarrollo de proyectos de tecnologías en agua
              y saneamiento ambiental, orientados a la gestión, planeación,
              análisis, diseño, implementación, operación y mantenimiento de
              sistemas. Participar en obras de abastecimiento de agua y
              saneamiento ambiental, garantizando aspectos de seguridad, calidad
              y conservación del ambiente
            </p>
          </Col>
        </Row>
        <ESFOTCards
          image={ESFOT1}
          title="Tecnología Superior en Agua y Saneamiento Ambiental - TSASA"
          description="DESCRIPCION"
        />
        <ESFOTCards
          image={ESFOT2}
          title="Tecnología Superior en Desarrollo de Software - TSDS"
          description="DESCRIPCION"
        />
        <ESFOTCards
          image={ESFOT3}
          title="Tecnología Superior en Electromecánica - TSE"
          description="DESCRIPCION"
        />
        <ESFOTCards
          image={ESFOT4}
          title="Tecnología Superior en Redes y Telecomunicaciones - TSRT"
          description="DESCRIPCION"
        />
      </div>
      <style jsx>{`
        .AnuncioDefault {
          width: 100%;
          height: 100%;
          padding: 0;
          margin: 0;
        }
      `}</style>
    </>
  )
}

export default HomePage
