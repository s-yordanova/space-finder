/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-render-in-setup */
import React from "react";
import ReactDOM from "react-dom";
import { Login } from "../../src/components/Login";
import { fireEvent, waitFor } from "@testing-library/react";
import { User } from "../../src/model/Model";
import history from "../../src/utils/history"

const someUser: User = {
    userName: 'someUser',
    email: 'someEmail'
} 
const authServiceMock = {
    login: jest.fn(),
  };

  const setUserMock = jest.fn();

  const historyMock = history;
  history.push = jest.fn()

describe("Login component test suite", () => {
  let container: HTMLDivElement;
 ;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    ReactDOM.render(
      <Login authService={authServiceMock as any} setUser={setUserMock} />,
      container
    );
  });

  afterEach(() => {
    document.body.removeChild(container);
    container.remove();
    jest.clearAllMocks();
  });

  test("Renders correctly initial document", () => {
    const title = document.querySelector("h1");
    expect(title!.textContent).toBe("Please login");

    const inputs = document.querySelectorAll("input");
    expect(inputs).toHaveLength(3);
    expect(inputs[0].value).toBe("");
    expect(inputs[1].value).toBe("");
    expect(inputs[2].value).toBe("Login");

    const label = document.querySelector("label");
    expect(label).not.toBeInTheDocument();
  });

  test("Passes credentials correctly", () => {
    const inputs = document.querySelectorAll("input");
    const loginInput = inputs[0];
    const passWordInput = inputs[1];
    const loginButton = inputs[2];

    fireEvent.change(loginInput, {target:{value: 'someUser'}});
    fireEvent.change(passWordInput, {target:{value: 'somePass'}});
    fireEvent.click(loginButton);

    expect(authServiceMock.login).toBeCalledWith(
        'someUser',
        'somePass'
    );
  });

  test('Correctly handles login success', async ()=>{
    authServiceMock.login.mockResolvedValueOnce(someUser);
    
    const inputs = document.querySelectorAll("input");
    const loginInput = inputs[0];
    const passWordInput = inputs[1];
    const loginButton = inputs[2];

    fireEvent.change(loginInput, {target:{value: 'someUser'}});
    fireEvent.change(passWordInput, {target:{value: 'somePass'}});
    fireEvent.click(loginButton);

    const statusLabel = await waitFor(()=>
        container.querySelector("label")
    );
   
    expect(statusLabel).toBeInTheDocument();
    expect(statusLabel).toHaveTextContent('Login Successfull!');
    expect(setUserMock).toBeCalledWith(someUser);
    expect(historyMock.push).toBeCalledWith('/profile');
  })

  test('Correctly handles login fail', async ()=>{
    authServiceMock.login.mockResolvedValueOnce(undefined);
    
    const inputs = document.querySelectorAll("input");
    const loginInput = inputs[0];
    const passWordInput = inputs[1];
    const loginButton = inputs[2];

    fireEvent.change(loginInput, {target:{value: 'someUser'}});
    fireEvent.change(passWordInput, {target:{value: 'somePass'}});
    fireEvent.click(loginButton);

    const statusLabel = await waitFor(()=>
        container.querySelector("label")
    );
   
    expect(statusLabel).toBeInTheDocument();
    expect(statusLabel).toHaveTextContent('Login failed!');
  })
});
