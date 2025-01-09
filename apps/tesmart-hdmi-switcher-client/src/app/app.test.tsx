import { enableFetchMocks } from 'jest-fetch-mock'

import {act, render, screen} from '@testing-library/react';

import App from './app';
enableFetchMocks()

describe('App', () => {
  beforeEach(() => {
    // @ts-expect-error Problem with types from mock fetch https://www.npmjs.com/package/jest-fetch-mock#simple-mock-and-assert
    fetch.resetMocks()
  })

  it('should render successfully', async () => {
    // @ts-expect-error Problem with types from mock fetch https://www.npmjs.com/package/jest-fetch-mock#simple-mock-and-assert
    fetch.mockResponseOnce(JSON.stringify({ current: 1 }))

    await act(async () => {
      render(<App/>);
    });
    const buttonList = screen.getByTestId("buttons");
    const counter = screen.getByTestId("count");
    expect(buttonList).toBeTruthy();
    expect(buttonList.childNodes.length).toBe(8);
    expect(counter).toBeTruthy();
  });
});
