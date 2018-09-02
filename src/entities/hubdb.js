import createRequest from '../utilities';
import constants from '../constants';

const defaults = {};
let _baseOptions;

const createTable = async (opts = {}) => {
  try {
    const { name, useForPages, columns, publishedAt } = opts;

    const body = {
      name,
      useForPages,
      columns,
      publishedAt
    };

    const method = 'POST';
    const url = constants.api.hubdb.tables;
    const options = { method, body };

    const mergedProps = Object.assign({}, defaults, _baseOptions);
    const create = await createRequest(url, options, mergedProps);

    return Promise.resolve(create);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const getTables = async () => {
  try {
    const mergedProps = Object.assign({}, defaults, _baseOptions);

    const tables = await createRequest(
      constants.api.hubdb.tables,
      {},
      mergedProps
    );

    return Promise.resolve(tables);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const getTableRows = async (tableId, portalId, opts = {}) => {
  try {
    const additionalOpts = { portalId };
    const mergedProps = Object.assign(
      {},
      defaults,
      _baseOptions,
      opts,
      additionalOpts
    );

    const table = await createRequest(
      constants.api.hubdb.rows,
      { tableId },
      mergedProps
    );

    return Promise.resolve(table);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

const getTableById = async (tableId, portalId, options = {}) => {
  try {
    const additionalOpts = { portalId };
    const mergedProps = Object.assign(
      {},
      defaults,
      _baseOptions,
      options,
      additionalOpts
    );

    const table = await createRequest(
      constants.api.hubdb.table,
      { tableId },
      mergedProps
    );

    return Promise.resolve(table);
  } catch (e) {
    return Promise.reject(e.message);
  }
};

export default function hubdbApi(baseOptions) {
  _baseOptions = baseOptions;

  return {
    /**
     * Create a new HubDB table
     * @async
     * @memberof hs/hubdb
     * @method createTable
     * @param {object} opts
     * @example
     * const hs = new HubSpotClient(props);
     * hs.pages.createTable(opts).then(response => console.log(response));
     * @property {string} opts.name
     * @property {boolean} opts.useForPages
     * @property {array} opts.columns
     * @property {int} opts.publishedAt
     * @returns {Promise}
     */
    createTable,
    /**
     * Get a collection of HubDB tables
     * @async
     * @memberof hs/hubdb
     * @method getTables
     * @example
     * const hs = new HubSpotClient(props);
     * hs.hubdb.getTables(opts).then(response => console.log(response));
     * @returns {Promise}
     */
    getTables,
    /**
     * Get rows in a HubDB table
     * @async
     * @memberof hs/hubdb
     * @method getTableRows
     * @param {int} tableId
     * @param {int} portalId
     * @param {object} options
     * @example
     * const hs = new HubSpotClient(props);
     * hs.pages.getTableRows(tableId, portalId, options).then(response => console.log(response))
     * @returns {Promise}
     */
    getTableRows,
    /**
     * Retrieve HubDB table by ID
     * @async
     * @memberof hs/hubdb
     * @method getTableById
     * @param {int} tableId
     * @param {int} portalId
     * @param {object} options
     * @example
     * const hs = new HubSpotClient(props);
     * hs.hubdb.getTableById(tableId, portalId, options).then(response => console.log(response))
     * @returns {Promise}
     */
    getTableById
  };
}
