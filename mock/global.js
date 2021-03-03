const { VITE_APP_APIHOST } = process.env;
const mock = {};

mock[`POST ${VITE_APP_APIHOST || ''}/uploads`] = (req, res) => {
  res.send({
    code: 0,
    data: {
      id: 1,
      url:
        'http://uploads.liqingsong.cc/20200531/583057e8-8bab-4eee-b5a0-bec915089c0c.jpg',
      name: 'xcx.jpg',
    },
    msg: '',
  })
};

mock[`GET ${VITE_APP_APIHOST || ''}/500`] = (req, res) => {
    res.send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/500',
    }, 500);
};

mock[`GET ${VITE_APP_APIHOST || ''}/404`] = (req, res) => {
    res.send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/404',
    }, 404);
};

module.exports = {
  ...mock
};