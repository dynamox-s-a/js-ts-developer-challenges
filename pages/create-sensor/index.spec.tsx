/* eslint-disable no-undef */
import React from "react";
import { useRouter } from "next/router";
import {
  render,
  RenderResult,
  cleanup,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import CreateSensor from "./index.page";
import fetchMock from "jest-fetch-mock";

import { sensorPostResultMsg as postResultMsg } from "lib/utils/post/post-result";

jest.mock("next/router", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

const mockSession = { token: "token", email: "email", name: "name" };
jest.mock("redux/hooks", () => ({
  useAppSelector: () => mockSession,
}));

type SutTypes = {
  sut: RenderResult;
};

const makeSut = (): SutTypes => {
  const sut = render(<CreateSensor />);
  return { sut };
};

describe("Create Sensor Page Elements Test", () => {
  afterEach(cleanup);

  test("CreateSensor render test", () => {
    makeSut();
  });

  test("Should have name input.", () => {
    const { sut } = makeSut();
    expect(sut.queryByTestId("name-input")).toBeTruthy();
  });

  test("Should have sensor model input.", () => {
    const { sut } = makeSut();
    expect(sut.queryByTestId("model-input")).toBeTruthy();
  });

  test("Should have submit button.", () => {
    const { sut } = makeSut();
    expect(sut.queryByTestId("submit-button")).toBeTruthy();
  });

  test("Should have alert error.", () => {
    const useState = React.useState;
    React.useState = jest
      .fn()
      .mockReturnValueOnce(["error", jest.fn()])
      .mockImplementation((x) => [x, jest.fn()]);
    const { sut } = makeSut();
    expect(sut.queryByTestId("alert-error")).toBeTruthy();
    React.useState = useState;
  });
});

describe("Create Sensor Page Initial State Test", () => {
  afterEach(cleanup);

  test("Should start with submit button enable", () => {
    const { sut } = makeSut();
    const submitButton = sut.getByTestId("submit-button") as HTMLInputElement;
    expect(submitButton).not.toBeDisabled();
  });

  test("Should start without alert error", () => {
    const { sut } = makeSut();
    const submitButton = sut.queryByTestId("alert-error") as HTMLInputElement;
    expect(submitButton).toBeFalsy();
  });
});

describe("Create Sensor Page Error Test", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    fetchMock.doMock();
  });
  afterEach(cleanup);

  test("Should have alert error and disable button if name field is empty ", async () => {
    const { sut } = makeSut();

    const nameInput = sut.getByTestId("name-input") as HTMLInputElement;
    const submitButton = sut.getByTestId("submit-button") as HTMLInputElement;

    fireEvent.input(nameInput, { target: { value: "" } });
    fireEvent.click(submitButton);

    expect(
      await waitFor(() => sut.findByTestId("alert-error"))
    ).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  test("Should not have alert error and disable button when the form is filled out again", async () => {
    const { sut } = makeSut();

    const nameInput = sut.getByTestId("name-input") as HTMLInputElement;
    const submitButton = sut.getByTestId("submit-button") as HTMLInputElement;

    fireEvent.input(nameInput, { target: { value: "" } });
    fireEvent.click(submitButton);

    expect(
      await waitFor(() => sut.findByTestId("alert-error"))
    ).toBeInTheDocument();
    expect(submitButton).toBeDisabled();

    fireEvent.input(nameInput, { target: { value: "abc" } });

    expect(
      await waitFor(() => sut.queryByTestId("alert-error"))
    ).not.toBeInTheDocument();
    expect(submitButton).toBeEnabled();
  });
});

describe("Create Sensor Post Event Test", () => {
  afterEach(cleanup);
  beforeEach(() => {
    fetchMock.resetMocks();
    fetchMock.doMock();
  });

  test("Should router to main page if success", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ name: "abc", model: "HF+" }));

    const mockRouter = {
      push: jest.fn(),
    };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    const { sut } = makeSut();

    const nameInput = sut.getByTestId("name-input") as HTMLInputElement;
    const submitButton = sut.getByTestId("submit-button") as HTMLInputElement;

    fireEvent.input(nameInput, { target: { value: "abc" } });
    fireEvent.click(submitButton);

    await waitFor(() => expect(mockRouter.push).toHaveBeenCalledWith("/"));
  });

  test("Should keep in create sensor page if server response is a error", async () => {
    fetchMock.mockResponseOnce(postResultMsg.DATA_CONFLICT, {
      status: 409,
      headers: { "content-type": "application/json" },
    });

    const mockRouter = {
      push: jest.fn(),
    };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    const { sut } = makeSut();

    const nameInput = sut.getByTestId("name-input") as HTMLInputElement;
    const submitButton = sut.getByTestId("submit-button") as HTMLInputElement;

    fireEvent.input(nameInput, { target: { value: "abc" } });
    fireEvent.click(submitButton);

    expect(
      await waitFor(() => sut.findByTestId("alert-error"))
    ).toBeInTheDocument();
  });
});