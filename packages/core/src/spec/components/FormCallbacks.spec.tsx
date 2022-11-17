import { render } from "@testing-library/react";
import { FORM_CALLBACK_NAMES } from "../../lib";
import { createTestProvider, TestForm, TestProviderHandler } from "../TestForm";

describe("FormCallbacks", () => {
  describe("when rendered", () => {
    let children: jest.Mock;
    let provider: TestProviderHandler;

    beforeEach(() => {
      provider = createTestProvider();
      children = jest.fn().mockReturnValue(<>Foo</>);

      render(<TestForm.FormCallbacks>{children}</TestForm.FormCallbacks>, {
        wrapper: ({ children }) => (
          <provider.TestProvider>{children}</provider.TestProvider>
        ),
      });
    });

    test.each(FORM_CALLBACK_NAMES)(
      "calls children with the %s callback",
      (callbackName) => {
        expect(children).toHaveBeenCalledWith(
          expect.objectContaining({
            [callbackName]: expect.any(Function),
          })
        );
      }
    );
  });
});
