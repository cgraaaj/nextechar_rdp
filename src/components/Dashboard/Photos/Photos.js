import React from 'react';
import { connect } from 'react-redux';
import { getPhotos } from '../../../actions';
import ReactPaginate from 'react-paginate';
import LazyImage from './LazyImage';

class Photos extends React.Component {
  componentDidMount() {
    this.props.getPhotos(1);
  }

  handlePageClick = (data) => {
    let currPage = data.selected + 1;
    this.props.getPhotos(currPage);
  };

  renderImage() {
    return this.props.photos.map((photo) => (
      <div className="ui segment" key={photo.id}>
        <div class="ui one column grid">
          <div class="ui card">
            <img src={`${photo.thumbnailUrl}`} />
            {/* <LazyImage thumbnailUrl={photo.thumbnailUrl} src={photo.url} /> */}
            <div class="content">{photo.title}</div>
          </div>
        </div>
      </div>
    ));
  }

  render() {
    return (
      <div>
        {this.renderImage()}
        <ReactPaginate
          previousLabel={'previous'}
          nextLabel={'next'}
          breakLabel={'...'}
          pageCount={Math.ceil(this.props.total / 10)}
          marginPagesDisplayed={3}
          onPageChange={this.handlePageClick}
          containerClassName={'pagination justify-content-center'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousClassName={'page-item'}
          previousLinkClassName={'page-link'}
          nextClassName={'page-item'}
          nextLinkClassName={'page-link'}
          breakClassName={'page-item'}
          breakLinkClassName={'page-link'}
          activeClassName={'active'}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    photos: state.dashboard.photos.data,
    total: state.dashboard.photos.total,
  };
};

export default connect(mapStateToProps, { getPhotos })(Photos);
