import React, { Component } from 'react'
import { isNil } from 'lodash'
import InsertSyllable from '../InsertSyllable'
import AreaOfSymbols from '../AreaOfSymbols'
import PaperContext from '../../context'
import PaperStyle from '../PaperStyle'
import Header from '../../utils/Header'

import './style.css'
import '../../res/bootstrap/css/bootstrap.min.css'

import { KRUKI } from '../../res/index'

class Paper extends Component {
  constructor(props) {
    super(props)

    this.getDataForInsert = (dataForInsert) => {
      if (!isNil(dataForInsert)) {
        this.setState(prevState => ({
          dataOfArea: [...prevState.dataOfArea, dataForInsert],
        }))
      }
    }

    this.state = {
      dataOfArea: [],
      getDataForInsert: this.getDataForInsert,
    }
  }

  render() {
    return (
      <PaperContext.Provider value={this.state}>
        <React.Fragment>
          <Header />
          <div className="Paper">
            <AreaOfSymbols symbols={this.state.dataOfArea} />
            {/* <hr className="hr" /> */}
            <div className="control">
              <div className="InputSymbol">
                <InsertSyllable data={KRUKI} getDataForInsert={this.getDataForInsert} />
              </div>
              <div />
              <PaperStyle />
            </div>
          </div>
        </React.Fragment>
      </PaperContext.Provider>
    )
  }
}

export default Paper
