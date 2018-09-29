import React, { Component } from 'react'
import PropTypes from 'react-proptypes'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Button } from 'reactstrap' // eslint-disable-line
import { isNil } from 'lodash'

import {
  moveSyllable,
  hideModal,
  changePage,
  removePage,
  addPage,
  removeSyllablebyIndex,
} from '../../actions'

import {
  Bucvica,
  Text,
  Syllable,
} from '../../containers'

import { Loading } from '../../utils'

import {
  EditText,
  RemovePageButton,
  EditSyllable,
} from '../'


import './style.css'

class AreaOfSymbols extends Component { // eslint-disable-line

  renderPages = () => {
    const { syllables, actions } = this.props
    let pageTemplate = null

    if (syllables) {
      pageTemplate = syllables.map((item, pageIndex) => (
        <div className="a4" key={pageIndex} onClick={() => actions.changePage(pageIndex)}>
          <RemovePageButton pageIndex={pageIndex} />
          <div className="page">
            {this.renderOnePage(item, pageIndex)}
          </div>
        </div>
      ))
    }
    return pageTemplate
  }

  renderOnePage = (item, pageIndex) => {
    console.log("page"+ pageIndex)
    const syllablesTemplate = item.map((paragraph, paragraphIndex) => (
      <div className="paragraph"key={paragraphIndex}>
        {this.renderOneParagraph(paragraph, paragraphIndex, pageIndex)}
      </div>
    ))
    return syllablesTemplate
  }

  renderOneParagraph = (paragraph, paragraphIndex, pageIndex) => {
    console.log('--paragraph'+ paragraphIndex)
    const { form, actions } = this.props
    const syllablesTemplate = paragraph.map(({ value, text, type }, index) => (
    /* eslint-disable */
      type === 'KRUK' ? <Syllable value={value} text={text} key={index} index paragraphIndex={paragraphIndex} pageIndex={pageIndex} /> : 
      type === 'BUCVICA' ? <Bucvica form={form} removeSyllablebyIndex={actions.removeSyllablebyIndex} changePage={actions.changePage} text={text} index={index} paragraphIndex={paragraphIndex} pageIndex={pageIndex}/> : 
      type === 'TEXT' ? <Text text={text} pageIndex={pageIndex} index={index} key={parseInt(`${pageIndex}${paragraphIndex}${index}`, 10)} /> : 
      type === 'BREAK' ? <hr className="break" /> : null
      /* eslint-enable */
    ))
    return syllablesTemplate
  }

  render() {
    const { form, actions } = this.props


    if (isNil(form.paperStyle)) {
      return (
        <Loading />
      )
    }

    return (
      <React.Fragment>
        <div className="paperArea">
          <div className="areaOfSymbols mx-auto">
            <div className="paperMargin" >
              {this.renderPages()}
              <Button
                color="primary"
                className="add-page"
                onClick={actions.addPage}
              >
                Добавить страницу
              </Button>
            </div>
          </div>
        </div>
        <EditSyllable />
        <EditText />
      </React.Fragment>
    )
  }
}

AreaOfSymbols.propTypes = {
  syllables: PropTypes.array,
  form: PropTypes.object,
  actions: PropTypes.object,
}

const mapDispatchToProps = dispatch => (
  { actions: bindActionCreators({
    moveSyllable,
    hideModal,
    changePage,
    removePage,
    addPage,
    removeSyllablebyIndex,
  }, dispatch) }
)

const mapStateToProps = state => ({
  syllables: state.paper.syllables,
  form: state.form,
  showModalEdit: state.paper.showModalEdit,
  showModalEditText: state.paper.showModalEditText,
})

export default connect(mapStateToProps, mapDispatchToProps)(AreaOfSymbols)
