import React, { PureComponent } from 'react'
import PropTypes from 'react-proptypes'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { removeParagraph } from '../../actions'

class RemoveParagraphButton extends PureComponent {
  removeParagraph = (e, paragraphIndex) => {
    const { actions } = this.props
    actions.removeParagraph(paragraphIndex)
    e.stopPropagation()
  }

  render() {
    const { paragraphIndex } = this.props
    return (
      <button
        name={paragraphIndex}
        onClick={e => this.removeParagraph(e, paragraphIndex)}
        className="paragraph-remove-button"
      >
        <i className="icon-bin" />
      </button>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ removeParagraph }, dispatch),
})

export default connect(() => ({}), mapDispatchToProps)(RemoveParagraphButton)

RemoveParagraphButton.propTypes = {
  paragraphIndex: PropTypes.number,
  actions: PropTypes.object,
}
