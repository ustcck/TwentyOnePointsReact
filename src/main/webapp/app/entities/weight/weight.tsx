import * as React from 'react';
import * as InfiniteScroll from 'react-infinite-scroller';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, InputGroup, Col, Row, Table } from 'reactstrap';
import { AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudSearchAction, ICrudGetAllAction, TextFormat, getSortState, IPaginationBaseState } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import { getSearchEntities, getEntities, reset } from './weight.reducer';
import { IWeight } from 'app/shared/model/weight.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';

export interface IWeightProps {
  getEntities: ICrudGetAllAction<IWeight>;
  reset: Function;
  getSearchEntities: ICrudSearchAction<IWeight>;
  weightList: IWeight[];
  links: {
    last: 0;
  };
  totalItems: 0;
  location: any;
  match: any;
}

export interface IWeightState extends IPaginationBaseState {
  search: string;
}

export class Weight extends React.Component<IWeightProps, IWeightState> {
  state: IWeightState = {
    search: '',
    ...getSortState(this.props.location, ITEMS_PER_PAGE)
  };

  componentDidMount() {
    this.reset();
  }

  search = () => {
    if (this.state.search) {
      this.props.getSearchEntities(this.state.search);
    }
  };

  clear = () => {
    this.props.getEntities();
    this.setState({
      search: ''
    });
  };

  handleSearch = event => this.setState({ search: event.target.value });

  reset = () => {
    this.props.reset();
    this.setState({ activePage: 1 }, () => this.getEntities());
  };

  handleLoadMore = page => {
    this.setState({ activePage: this.state.activePage + 1 }, () => this.getEntities());
  };

  sort = prop => () => {
    this.setState(
      {
        order: this.state.order === 'asc' ? 'desc' : 'asc',
        sort: prop
      },
      () => this.reset()
    );
  };

  getEntities = () => {
    const { activePage, itemsPerPage, sort, order } = this.state;
    this.props.getEntities(activePage - 1, itemsPerPage, `${sort},${order}`);
  };

  render() {
    const { weightList, match } = this.props;
    return (
      <div>
        <h2 id="page-heading">
          <Translate contentKey="twentyOnePointsReactApp.weight.home.title">Weights</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />&nbsp;
            <Translate contentKey="twentyOnePointsReactApp.weight.home.createLabel">Create new Weight</Translate>
          </Link>
        </h2>
        <Row>
          <Col sm="12">
            <AvForm onSubmit={this.search}>
              <AvGroup>
                <InputGroup>
                  <AvInput
                    type="text"
                    name="search"
                    value={this.state.search}
                    onChange={this.handleSearch}
                    placeholder={translate('twentyOnePointsReactApp.weight.home.search')}
                  />
                  <Button className="input-group-addon">
                    <FontAwesomeIcon icon="search" />
                  </Button>
                  <Button type="reset" className="input-group-addon" onClick={this.clear}>
                    <FontAwesomeIcon icon="trash" />
                  </Button>
                </InputGroup>
              </AvGroup>
            </AvForm>
          </Col>
        </Row>
        <div className="table-responsive">
          <InfiniteScroll
            pageStart={this.state.activePage}
            loadMore={this.handleLoadMore}
            hasMore={this.state.activePage <= this.props.links.last}
            loader={<div className="loader">Loading ...</div>}
            threshold={0}
            initialLoad={false}
          >
            <Table responsive>
              <thead>
                <tr>
                  <th className="hand" onClick={this.sort('id')}>
                    <Translate contentKey="global.field.id">ID</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('datetime')}>
                    <Translate contentKey="twentyOnePointsReactApp.weight.datetime">Datetime</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th className="hand" onClick={this.sort('weigth')}>
                    <Translate contentKey="twentyOnePointsReactApp.weight.weigth">Weigth</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th>
                    <Translate contentKey="twentyOnePointsReactApp.weight.user">User</Translate> <FontAwesomeIcon icon="sort" />
                  </th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {weightList.map((weight, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${weight.id}`} color="link" size="sm">
                        {weight.id}
                      </Button>
                    </td>
                    <td>
                      <TextFormat type="date" value={weight.datetime} format={APP_DATE_FORMAT} />
                    </td>
                    <td>{weight.weigth}</td>
                    <td>{weight.user ? weight.user.login : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${weight.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.view">View</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${weight.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.edit">Edit</Translate>
                          </span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${weight.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" />{' '}
                          <span className="d-none d-md-inline">
                            <Translate contentKey="entity.action.delete">Delete</Translate>
                          </span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </InfiniteScroll>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ weight }) => ({
  weightList: weight.entities,
  totalItems: weight.totalItems,
  links: weight.links
});

const mapDispatchToProps = {
  getSearchEntities,
  getEntities,
  reset
};

export default connect(mapStateToProps, mapDispatchToProps)(Weight);
