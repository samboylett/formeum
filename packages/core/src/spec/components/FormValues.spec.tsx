import { act, render } from "@testing-library/react";
import {
  createTestProvider,
  getInitialValues,
  TestForm,
  TestProviderHandler,
} from "../TestForm";

describe("FormValues", () => {
  describe("when rendered", () => {
    let children: jest.Mock;
    let provider: TestProviderHandler;

    beforeEach(() => {
      provider = createTestProvider();
      children = jest.fn().mockReturnValue(<>Foo</>);

      render(<TestForm.FormValues>{children}</TestForm.FormValues>, {
        wrapper: ({ children }) => (
          <provider.TestProvider>{children}</provider.TestProvider>
        ),
      });
    });

    test("calls children with all form values", () => {
      expect(children).toHaveBeenCalledWith(getInitialValues());
    });

    describe("when values changes", () => {
      beforeEach(() => {
        act(() => {
          provider.mergeValue({
            values: {
              ...getInitialValues(),
              stringField: "foo",
            },
          });
        });
      });

      test("calls children with new values", () => {
        expect(children).toHaveBeenCalledWith({
          ...getInitialValues(),
          stringField: "foo",
        });
      });
    });
  });
});
