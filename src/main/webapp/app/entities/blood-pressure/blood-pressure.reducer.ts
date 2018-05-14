import { isEqual } from 'lodash';
import axios from 'axios';
import {
  ICrudSearchAction,
  parseHeaderForLinks,
  loadMoreDataWhenScrolled,
  ICrudGetAction,
  ICrudGetAllAction,
  ICrudPutAction,
  ICrudDeleteAction
} from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';
import { SERVER_API_URL } from 'app/config/constants';

import { IBloodPressure } from 'app/shared/model/blood-pressure.model';

export const ACTION_TYPES = {
  SEARCH_BLOODPRESSURES: 'bloodPressure/SEARCH_BLOODPRESSURES',
  FETCH_BLOODPRESSURE_LIST: 'bloodPressure/FETCH_BLOODPRESSURE_LIST',
  FETCH_BLOODPRESSURE: 'bloodPressure/FETCH_BLOODPRESSURE',
  CREATE_BLOODPRESSURE: 'bloodPressure/CREATE_BLOODPRESSURE',
  UPDATE_BLOODPRESSURE: 'bloodPressure/UPDATE_BLOODPRESSURE',
  DELETE_BLOODPRESSURE: 'bloodPressure/DELETE_BLOODPRESSURE',
  RESET: 'bloodPressure/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [],
  entity: {},
  links: {
    last: 0
  },
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

// Reducer

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_BLOODPRESSURES):
    case REQUEST(ACTION_TYPES.FETCH_BLOODPRESSURE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_BLOODPRESSURE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_BLOODPRESSURE):
    case REQUEST(ACTION_TYPES.UPDATE_BLOODPRESSURE):
    case REQUEST(ACTION_TYPES.DELETE_BLOODPRESSURE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.SEARCH_BLOODPRESSURES):
    case FAILURE(ACTION_TYPES.FETCH_BLOODPRESSURE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_BLOODPRESSURE):
    case FAILURE(ACTION_TYPES.CREATE_BLOODPRESSURE):
    case FAILURE(ACTION_TYPES.UPDATE_BLOODPRESSURE):
    case FAILURE(ACTION_TYPES.DELETE_BLOODPRESSURE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.SEARCH_BLOODPRESSURES):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_BLOODPRESSURE_LIST):
      const links = parseHeaderForLinks(action.payload.headers.link);
      return {
        ...state,
        links: { last: links.last },
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: loadMoreDataWhenScrolled(state.entities, action.payload.data, links)
      };
    case SUCCESS(ACTION_TYPES.FETCH_BLOODPRESSURE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_BLOODPRESSURE):
    case SUCCESS(ACTION_TYPES.UPDATE_BLOODPRESSURE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_BLOODPRESSURE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = SERVER_API_URL + '/api/blood-pressures';
const apiSearchUrl = SERVER_API_URL + '/api/_search/blood-pressures';

// Actions

export const getSearchEntities: ICrudSearchAction<IBloodPressure> = query => ({
  type: ACTION_TYPES.SEARCH_BLOODPRESSURES,
  payload: axios.get(`${apiSearchUrl}?query=` + query) as Promise<IBloodPressure>
});

export const getEntities: ICrudGetAllAction<IBloodPressure> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_BLOODPRESSURE_LIST,
    payload: axios.get(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`) as Promise<IBloodPressure>
  };
};

export const getEntity: ICrudGetAction<IBloodPressure> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_BLOODPRESSURE,
    payload: axios.get(requestUrl) as Promise<IBloodPressure>
  };
};

export const createEntity: ICrudPutAction<IBloodPressure> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_BLOODPRESSURE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IBloodPressure> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_BLOODPRESSURE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IBloodPressure> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_BLOODPRESSURE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
