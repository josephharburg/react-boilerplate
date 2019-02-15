import React from 'react';
import { connect } from 'react-redux';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';
import _ from 'lodash';

class StreamEdit extends React.Component{
  componentDidMount(){
    this.props.fetchStream(this.props.match.params.id);
  }

  onSubmit = (formValues) => {
    this.props.editStream(this.props.match.params.id, formValues);
  };

  render() {
    if (!this.props.stream){
      return <div>Loading</div>
    }
// this if makes sure it doesnt cause an error.
    return(
      <div>
        <h3>Edit a Stream</h3>
        <StreamForm
        initialValues={_.pick(this.props.stream, 'title', 'description')}
        onSubmit={this.onSubmit} />
      </div>
    );
  }
}
// initalvalues is a specific param from redux form.
// the props comes with the route component we imported
//This function is a class because we needed to get data from the store rather than just do something.
const mapStateToProps = (state, ownProps) => {
  return {stream: state.streams[ownProps.match.params.id]};
};
// we got streams from our devtools.  we got the ownporps.-> match.params.id from the console log of ownProps object.


export default connect(mapStateToProps, {fetchStream, editStream}) (StreamEdit);
