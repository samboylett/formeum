import { CreateBaseFormReturn, FormeumPlugin } from "../lib";
import { TestForm, TestFormValues } from "./TestForm";

describe("plugins", () => {
  class TestPlugin<
    Values extends unknown,
    BaseReturn extends CreateBaseFormReturn<Values>,
  > implements FormeumPlugin<Values, BaseReturn, BaseReturn & { foo: () => "bar" }> {
    wrap(base: BaseReturn) {
      return {
        ...base,
        foo: () => "bar" as const,
      };
    }
  }

  describe("when plugin added", () => {
    let NextForm: any;

    beforeEach(() => {
      NextForm = TestForm.plugin(new TestPlugin<TestFormValues, CreateBaseFormReturn<TestFormValues>>());
    });

    test("returns add functions", () => {
      expect(NextForm.foo).toEqual(expect.any(Function));
    });
  });
});
