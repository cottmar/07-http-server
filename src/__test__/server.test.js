'use strict';

const server = require('../lib/server');
const superagent = require('superagent');
const cowsay = require('cowsay');

beforeAll(() => server.start(5000));
afterAll(() => server.stop());

describe('VALID request to the API', () => {
  describe('GET /', () => {
    it('should respond with status 200', () => {
      return superagent.get(':5000/')
        .then((res) => {
          expect(res.status).toEqual(200);
        });
    });
  });

  describe('GET /cowsay', () => {
    const cowsayFaker = cowsay.say({ text: 'Say something funny' });
    const forHtml = `<section><main>More Cowbell</main><pre>${cowsayFaker}</pre></section>`;
    test('should respond with status 200 and return html', () => {
      return superagent.get(':5000/cowsayPage')
        .query({ text: 'Hello World' })
        .then((res) => {
          expect(res.status).toEqual(200);
          expect(res.text).toEqual(forHtml);
        });
    });
  });
});
