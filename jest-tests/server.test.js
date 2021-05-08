const app = require('../server.js');

const supertest = require('supertest');
const request = supertest(app);

describe('Testing the received data from API requests', () => {
  it('The database is responsive', async done => {
    const res = await request.get('/products');
    expect(res.body[0].id).toEqual(1)
    done();
  })

  it('The first product id received is equal to 1', async done => {
    const res = await request.get('/products');
    expect(res.body[0].id).toEqual(1)
    done();
  })

  it('There are 5 products received with the /products API', async done => {
    const res = await request.get('/products');
    expect(res.body.length).toEqual(5)
    done();
  })

  it('Gets the requested product based on id=265 from API /products/265', async done => {
    const res = await request.get('/products/265');
    expect(res.body[0].id).toEqual(265)
    done();
  })

  it('Gets the requested product based on id=987562 from API /products/987562', async done => {
    const res = await request.get('/products/987562');
    expect(res.body[0].id).toEqual(987562)
    done();
  })

  it('Gets the requested product based on id=1000000 from API /products/1000000', async done => {
    const res = await request.get('/products/1000000');
    expect(res.body[0].id).toEqual(1000000)
    done();
  })

  it('Gets the styles from product id from API /products/666/styles', async done => {
    const res = await request.get('/products/666/styles');
    expect(typeof res.body.results[0].name).toBe('string')
    done();
  })

  it('Data from the API /products/265265/styles to contain a photos array', async done => {
    const res = await request.get('/products/265265/styles');
    expect(Array.isArray(res.body.results[0].photos)).toBe(true)
    done();
  })

  it('Data from the API /products/777/styles to contain a skus array', async done => {
    const res = await request.get('/products/777/styles');
    expect(typeof (res.body.results[0].skus)).toBe('object');
    done();
  })

  it('Returns "No Data Found" if a product doesn\'t exist API /products/314', async done => {
    const res = await request.get('/products/314');
    expect(res.text).toEqual('No Data Found');
    done();
  })
})