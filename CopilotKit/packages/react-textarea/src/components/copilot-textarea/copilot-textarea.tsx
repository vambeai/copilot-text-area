import React from "react";
import { useMakeStandardAutosuggestionFunction } from "../../hooks/make-autosuggestions-function/use-make-standard-autosuggestions-function";
import { HTMLCopilotTextAreaElement } from "../../types";
import { BaseCopilotTextareaProps } from "../../types/base/base-copilot-textarea-props";
import { BaseCopilotTextarea } from "../base-copilot-textarea/base-copilot-textarea";

// Like the base copilot textarea props,
// but with baseAutosuggestionsConfig replaced with autosuggestionsConfig.
export interface CopilotTextareaProps
  extends Omit<BaseCopilotTextareaProps, "baseAutosuggestionsConfig"> {
  textareaPurpose: string;
  createSuggestionFunction: (...args: any[]) => Promise<string>;
  insertionOrEditingFunction: (...args: any[]) => Promise<ReadableStream<string>>;
}

export const CopilotTextarea = React.forwardRef(
  (props: CopilotTextareaProps, ref: React.Ref<HTMLCopilotTextAreaElement>) => {
    const {
      createSuggestionFunction,
      insertionOrEditingFunction,
      textareaPurpose,
      ...forwardedProps
    } = props;

    const autosuggestionsFunction = useMakeStandardAutosuggestionFunction(createSuggestionFunction);

    return (
      <>
        <BaseCopilotTextarea
          ref={ref}
          {...forwardedProps}
          baseAutosuggestionsConfig={{
            textareaPurpose,
            apiConfig: {
              autosuggestionsFunction: autosuggestionsFunction,
              insertionOrEditingFunction: insertionOrEditingFunction,
            },
          }}
        />
      </>
    );
  },
);
