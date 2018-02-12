import React, { Component } from 'react';
import _ from 'lodash';

class Pagination extends Component {
  constructor(props) {
    super(props);

    this.state = {
      initialPage: 0,
      endPage: 0,
      currentPage: 0,
      totalPages: 0,
      pageLimit: 5,
      pageList: [],
      startIndex: 0,
      endIndex: 9
    };
  }
  componentWillMount() {
    const pageLimit = this.state.pageLimit;
    const totalPages = Math.ceil(this.props.characters.length / pageLimit);
    const pageList = _.range(this.state.initialPage, totalPages);

    this.setPage(this.state.initialPage);

    this.setState({
      totalPages: totalPages,
      endPage: totalPages - 1,
      pageList: pageList
    });
  }

  setPage(page) {
    const { pageLimit } = this.state;

    if (page < 0 || page > this.state.totalPages) {
      return;
    }

    const startIndex = page * pageLimit;
    const endIndex = page * pageLimit + pageLimit;

    this.setState({ currentPage: page });
    this.props.onPageChange(startIndex, endIndex);
  }

  render() {
    const { currentPage, pageList, endPage, totalPages } = this.state;

    return (
      <div>
        <ul className="pagination">
          <li
            className={currentPage === 0 ? 'disabled page-item' : 'page-item'}
          >
            <a
              onClick={() => this.setPage(currentPage - 1)}
              className="page-link"
              href="#"
            >
              Previous
            </a>
          </li>

          {pageList.map((page, index) => (
            <li
              key={index}
              className={
                currentPage === page ? 'active page-item' : 'page-item'
              }
            >
              <a
                className="page-link"
                href="#"
                onClick={() => this.setPage(page)}
              >
                {index}
              </a>
            </li>
          ))}
          <li
            className={
              currentPage === endPage ? 'disabled page-item' : 'page-item'
            }
          >
            <a
              onClick={() => this.setPage(currentPage + 1)}
              className="page-link"
              href="#"
            >
              Next
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default Pagination;
