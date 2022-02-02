export const pagination = async (cursor = null, limit = 10, Model: any): Promise<any> => {

  const opt = {
    ...(cursor && { _id: { $lt: cursor } }) as any,
  }

  const model = await Model.find(opt).sort({ createdAt: -1 }).limit(limit).catch(() => []);

  // get length of model
  const len = model.length;

  const page = {
    hasNext: len >= limit,
    hasPrev: !!cursor,
    next: len >= limit ? model[limit - 1]._id : null,
    prev: len <= limit ? model[0]._id : null,
  }

  return [model, page];
}


export const paginationWithCount = async (page = 0, limit = 12, Model: any): Promise<any> => {
  page = page <= 0 ? 0 : (page - 1);

  const [model, count] = await Promise.all([
    Model.find().skip(page * limit).limit(limit).sort({ createdAt: -1 }),
    Model.count()
  ]);

  const len = model.length;

  const pageOptions = {
    page,
    hasNext: len === limit,
    pages: Math.ceil(count / limit),
    collections: count,
    length: len,
  }

  return [model, pageOptions];
}