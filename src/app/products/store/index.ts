import { Product } from './../models/product';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  on,
  createReducer
} from '@ngrx/store';
import { environment } from '../../../environments/environment';
import { loadProductsSuccess, loadProductsFailure } from './product.actions';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export const productStateFeatureKey = 'productState';

export interface ProductState extends EntityState<Product> {
  error: any;
}

export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>();


export const initialState = adapter.getInitialState({
  error: undefined,
});

export const reducers = createReducer(
  initialState,
  on(loadProductsSuccess, (state, action) => {
    return adapter.addAll(action.products, state);
  }),
  on(loadProductsFailure, (action) => {
    return {
      error: action.error
    };
  })
);

// taking a slice out of our store.
export const selectProductsFeature = createFeatureSelector<ProductState>(productStateFeatureKey);
 
export const selectProducts = createSelector(
  selectProductsFeature, // pass slice into selector
  adapter.getSelectors().selectAll
);

export const selectProductError = createSelector(
  selectProductsFeature,
  (state: ProductState) => state.error
);


export const metaReducers: MetaReducer<ProductState>[] = !environment.production ? [] : [];
