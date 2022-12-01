// modifyFind((query) => query.orderBy('createdAt'))
export const modifyFind = (modify) => {
  return context => {
    const { params, service } = context;
    const query = service.createQuery(params);

    modify(query, params)
    context.params.knex = query;
  }
}