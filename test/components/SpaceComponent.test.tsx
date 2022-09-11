/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-render-in-setup */
import React from "react";
import ReactDOM from "react-dom";
import { SpaceComponent } from "../../src/components/spaces/SpaceComponent";
import { fireEvent } from "@testing-library/react";

describe("Space component test suite", () => {
  let container: HTMLDivElement;
  const reserveSpaceMock = jest.fn();

  function cleanUpTest() {
    document.body.removeChild(container);
    container.remove();
    jest.clearAllMocks();
  }

  function setUpTests(element: React.FunctionComponentElement<any>) {
    container = document.createElement("div");
    document.body.appendChild(container);
    ReactDOM.render(element, container);
  }

  describe("tests with photo URL", () => {
    beforeEach(() => {
      setUpTests(
        <SpaceComponent
          location={"someLocation"}
          name={"someName"}
          reserveSpace={reserveSpaceMock}
          spaceId={"123"}
          photoUrl={"some.url"}
        />
      );
    });

    test("show img", () => {
      const image = container.querySelector("img");
      expect(image!).toBeInTheDocument();
      expect(image!.src).toBe("http://localhost/some.url");
    });

    test("show labels", () => {
      const labels = container.querySelectorAll("label");
      expect(labels[0]).toHaveTextContent("someName");
      expect(labels[1]).toHaveTextContent("123");
      expect(labels[2]).toHaveTextContent("someLocation");
    });

    test("reserving spaces", () => {
      const button = container.querySelector("button");
      fireEvent.click(button!);
      expect(reserveSpaceMock).toBeCalledWith("123");
    });

    afterEach(() => {
      cleanUpTest();
    });
  });

  describe("tests without photo URL", () => {
    beforeEach(() => {
      setUpTests(
        <SpaceComponent
          location={"someLocation"}
          name={"someName"}
          reserveSpace={reserveSpaceMock}
          spaceId={"123"}
        />
      );
    });

    test("show img", () => {
      const image = container.querySelector("img");
      expect(image!).toBeInTheDocument();
      expect(image!.src).toBeFalsy();
    });

    afterEach(() => {
      cleanUpTest();
    });
  });
});
